// v1.0

const Organization = require("../database/model/organization");
const Item = require("../database/model/item");
const Customer = require("../database/model/customer");
const moment = require("moment-timezone");
const Settings = require("../database/model/settings")
const Invoice = require("../database/model/salesInvoice")
const ItemTrack = require("../database/model/itemTrack")
const Prefix = require("../database/model/prefix");
const mongoose = require('mongoose');

const DefAcc  = require("../database/model/defaultAccount");
const TrialBalance = require("../database/model/trialBalance");
const Account = require("../database/model/account");


// Fetch existing data
const dataExist = async ( organizationId, customerId, customerName ) => {
    const [organizationExists, customerExist , settings, existingPrefix, defaultAccount  ] = await Promise.all([
      Organization.findOne({ organizationId }, { organizationId: 1, organizationCountry: 1, state: 1 }),
      Customer.findOne({ organizationId , _id:customerId, customerDisplayName: customerName}, { _id: 1, customerDisplayName: 1, taxType: 1 }),
      Settings.findOne({ organizationId },{ salesOrderAddress: 1, salesOrderCustomerNote: 1, salesOrderTermsCondition: 1, salesOrderClose: 1, restrictSalesOrderClose: 1, termCondition: 1 ,customerNote: 1 }),
      Prefix.findOne({ organizationId }),
      DefAcc.findOne({ organizationId },{ salesAccount: 1, salesDiscountAccount: 1, accountReceivableAccount: 1, outputCgst: 1, outputSgst: 1, outputIgst: 1 ,outputVat: 1 }),
    ]);
    return { organizationExists, customerExist , settings, existingPrefix, defaultAccount };
};


//Fetch Item Data
const newDataExists = async (organizationId,items) => {
  // Retrieve items with specified fields
  const itemIds = items.map(item => item.itemId);

  const [newItems] = await Promise.all([
    Item.find({ organizationId, _id: { $in: itemIds } }, { _id: 1, itemName: 1, taxPreference: 1, sellingPrice: 1, taxRate: 1, cgst: 1, sgst: 1, igst: 1, vat: 1 }),
  ]);

  // Aggregate ItemTrack to get the latest entry for each itemId
  const itemTracks = await ItemTrack.aggregate([
    { $match: { itemId: { $in: itemIds } } },
    { $sort: { _id: -1 } },
    { $group: { _id: "$itemId", lastEntry: { $first: "$$ROOT" } } }
  ]);
  

  // Map itemTracks by itemId for easier lookup
  const itemTrackMap = itemTracks.reduce((acc, itemTrack) => {
    acc[itemTrack._id] = itemTrack.lastEntry;
    return acc;
  }, {});

  // Attach the last entry from ItemTrack to each item in newItems
  const itemTable = newItems.map(item => ({
    ...item._doc, // Copy item fields
    // lastEntry: itemTrackMap[item._id] || null, // Attach lastEntry if found
    currentStock: itemTrackMap[item._id.toString()] ? itemTrackMap[item._id.toString()].currentStock : null
  }));

  return { itemTable };
};


// Fetch Acc existing data
const accDataExists = async ( defaultAccount, organizationId ) => {
  const [ salesAccountName, salesDiscountAccountName , accountReceivableAccountName, outputCgstName, outputSgstName, outputIgstName, outputVatName ] = await Promise.all([
    Account.findOne({ organizationId , _id: defaultAccount.salesAccount }, { accountName: 1 }),
    Account.findOne({ organizationId , _id: defaultAccount.salesDiscountAccount}, { accountName: 1 }),
    Account.findOne({ organizationId , _id: defaultAccount.accountReceivableAccount}, { accountName: 1 }),
    Account.findOne({ organizationId , _id: defaultAccount.outputCgst}, { accountName: 1 }),
    Account.findOne({ organizationId , _id: defaultAccount.outputSgst}, { accountName: 1 }),
    Account.findOne({ organizationId , _id: defaultAccount.outputIgst}, { accountName: 1 }),
    Account.findOne({ organizationId , _id: defaultAccount.outputVat}, { accountName: 1 }),
  ]);
  return { salesAccountName, salesDiscountAccountName , accountReceivableAccountName, outputCgstName, outputSgstName, outputIgstName, outputVatName };
};

// Add Sales Order
exports.addInvoice = async (req, res) => {
    console.log("Add Sales Invoice :", req.body);
    try {
      const { organizationId, id: userId, userName } = req.user;

      //Clean Data
      const cleanedData = cleanCustomerData(req.body);

      const { items } = cleanedData;
      const { customerId, customerName } = cleanedData;
      const itemIds = items.map(item => item.itemId);

      // Check for duplicate itemIds
      const uniqueItemIds = new Set(itemIds);
      if (uniqueItemIds.size !== itemIds.length) {
        return res.status(400).json({ message: "Duplicate Item found" });
      }


      //Validate Customer
      if (!mongoose.Types.ObjectId.isValid(customerId) || customerId.length !== 24) {
        return res.status(400).json({ message: `Invalid customer ID: ${customerId}` });
      }
      // Validate ItemIds
      const invalidItemIds = itemIds.filter(itemId => !mongoose.Types.ObjectId.isValid(itemId) || itemId.length !== 24);
      if (invalidItemIds.length > 0) {
        return res.status(400).json({ message: `Invalid item IDs: ${invalidItemIds.join(', ')}` });
      }   
  
      const { organizationExists, customerExist , settings, existingPrefix, defaultAccount } = await dataExist( organizationId, customerId, customerName );
      
      const { itemTable } = await newDataExists( organizationId, items );

      //Data Exist Validation
      if (!validateOrganizationTaxCurrency( organizationExists, customerExist, existingPrefix, defaultAccount, res )) return;
      
      //Date & Time
      const openingDate = generateOpeningDate(organizationExists);

      //Validate Inputs  
      if (!validateInputs( cleanedData, customerExist, items, itemTable, organizationExists, defaultAccount, res)) return;

      //Tax Type
      taxtype(cleanedData, customerExist,organizationExists );

      //Default Account
      const defAcc = await defaultAccounting( cleanedData.taxtype, defaultAccount, organizationExists );

      // Calculate Sales 
      if (!calculateSalesOrder( cleanedData, res )) return;      

      //Prefix
      await salesPrefix(cleanedData, existingPrefix );
      
      const savedOrder = await createNewOrder(cleanedData, openingDate, organizationId, userId, userName );

      //Jornal
      await journal( savedOrder, defAcc );
        
      res.status(201).json({ message: "Sale Order created successfully" });
      console.log( "Sale Order created successfully:", savedOrder );
    } catch (error) {
      console.error("Error Creating Sales Order:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };




// Get Last Order Prefix
exports.getLastOrderPrefix = async (req, res) => {
  try {
      const organizationId = req.user.organizationId;

      // Find all accounts where organizationId matches
      const prefix = await Prefix.findOne({ organizationId:organizationId,'series.status': true });

      if (!prefix) {
          return res.status(404).json({
              message: "No Prefix found for the provided organization ID.",
          });
      }
      
      const series = prefix.series[0];     
      const lastPrefix = series.invoice + series.invoiceNum;

      res.status(200).json(lastPrefix);
  } catch (error) {
      console.error("Error fetching accounts:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};










// Utility Functions
const validDeliveryMethod = ["Road","Rail","Air","Sea"];
const validPaymentMode = [];
const validDiscountTransactionType = ["Currency", "Percentage"];
const validCountries = {
  "United Arab Emirates": [
    "Abu Dhabi",
      "Dubai",
      "Sharjah",
      "Ajman",
      "Umm Al-Quwain",
      "Fujairah",
      "Ras Al Khaimah",
    ],
    "India": [
      "Andaman and Nicobar Island",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
    "Saudi Arabia": [
      "Asir",
      "Al Bahah",
      "Al Jawf",
      "Al Madinah",
      "Al-Qassim",
      "Eastern Province",
      "Hail",
      "Jazan",
      "Makkah",
      "Medina",
      "Najran",
      "Northern Borders",
      "Riyadh",
      "Tabuk",
    ],
};

  
//Clean Data 
function cleanCustomerData(data) {
  const cleanData = (value) => (value === null || value === undefined || value === "" ? undefined : value);
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = cleanData(data[key]);
    return acc;
  }, {});
}

// Validate Organization Tax Currency
function validateOrganizationTaxCurrency( organizationExists, customerExist, existingPrefix, defaultAccount, res ) {
  if (!organizationExists) {
    res.status(404).json({ message: "Organization not found" });
    return false;
  }
  if (!customerExist) {
    res.status(404).json({ message: "Customer not found" });
    return false;
  }
  if (!existingPrefix) {
    res.status(404).json({ message: "Prefix not found" });
    return false;
  }
  if (!defaultAccount) {
    res.status(404).json({ message: "Setup Accounts in settings" });
    return false;
  }
  return true;
}
  

//Return Date and Time 
function generateOpeningDate(organizationExists) {
    const date = generateTimeAndDateForDB(
        organizationExists.timeZoneExp,
        organizationExists.dateFormatExp,
        organizationExists.dateSplit
      )
    return date.dateTime;
}
 



















//Validate inputs
function validateInputs( data, customerExist, items, itemExists, organizationExists, defaultAccount, res) {
  const validationErrors = validateQuoteData(data, customerExist, items, itemExists, organizationExists, defaultAccount );

  if (validationErrors.length > 0) {
    res.status(400).json({ message: validationErrors.join(", ") });
    return false;
  }
  return true;
}

// Create New Order
function createNewOrder( data, openingDate, organizationId, userId, userName ) {
    const newOrder = new Invoice({ ...data, organizationId, status :"Sent", createdDate: openingDate, userId, userName });
    return newOrder.save();
}
  

// Sales Prefix
function salesPrefix( cleanData, existingPrefix ) {
  const activeSeries = existingPrefix.series.find(series => series.status === true);
  if (!activeSeries) {
      return res.status(404).json({ message: "No active series found for the organization." });
  }
  cleanData.salesInvoice = `${activeSeries.invoice}${activeSeries.invoiceNum}`;

  activeSeries.invoiceNum += 1;

  existingPrefix.save()

  return 
}

  
// Tax Type
function taxtype( cleanedData, customerExist, organizationExists ) {
  if(customerExist.taxType === 'GST' ){
    if(cleanedData.placeOfSupply === organizationExists.state){
      cleanedData.taxType ='Intra';
    }
    else{
      cleanedData.taxType ='Inter';
    }
  }
  if(customerExist.taxType === 'VAT' ){
    cleanedData.taxType ='VAT';
  }
  if(customerExist.taxType === 'Non-Tax' ){
    cleanedData.taxType ='Non-Tax';
  }  
  return  
}

//Default Account
async function defaultAccounting( taxtype, defaultAccount, organizationExists ) {

  // Fetch data from accDataExists and destructure results
  const { salesAccountName, salesDiscountAccountName, accountReceivableAccountName, outputCgstName, outputSgstName, outputIgstName, outputVatName } = await accDataExists(defaultAccount, organizationExists.organizationId);
  
  // Update defaultAccount fields
  defaultAccount.salesAccountName = salesAccountName?.accountName;
  defaultAccount.salesDiscountAccountName = salesDiscountAccountName?.accountName;
  defaultAccount.accountReceivableAccountName = accountReceivableAccountName?.accountName;

  if (taxtype !== 'VAT') {
    defaultAccount.outputCgstName = outputCgstName?.accountName;
    defaultAccount.outputSgstName = outputSgstName?.accountName;
    defaultAccount.outputIgstName = outputIgstName?.accountName;
  } else {
    defaultAccount.outputVatName = outputVatName?.accountName;
  }
  
  return defaultAccount;
}
  


  


  
  




  
// Function to generate time and date for storing in the database
function generateTimeAndDateForDB(
    timeZone,
    dateFormat,
    dateSplit,
    baseTime = new Date(),
    timeFormat = "HH:mm:ss",
    timeSplit = ":"
  ) {
    // Convert the base time to the desired time zone
    const localDate = moment.tz(baseTime, timeZone);
  
    // Format date and time according to the specified formats
    let formattedDate = localDate.format(dateFormat);
  
    // Handle date split if specified
    if (dateSplit) {
      // Replace default split characters with specified split characters
      formattedDate = formattedDate.replace(/[-/]/g, dateSplit); // Adjust regex based on your date format separators
    }
  
    const formattedTime = localDate.format(timeFormat);
    const timeZoneName = localDate.format("z"); // Get time zone abbreviation
  
    // Combine the formatted date and time with the split characters and time zone
    const dateTime = `${formattedDate} ${formattedTime
      .split(":")
      .join(timeSplit)} (${timeZoneName})`;
  
    return {
      date: formattedDate,
      time: `${formattedTime} (${timeZoneName})`,
      dateTime: dateTime,
    };
}



  





  





//Validate Data
function validateQuoteData( data, customerExist, items, itemTable, organizationExists, defaultAccount ) {
  const errors = [];

  console.log("Item Request :",items);
  console.log("Item Fetched :",itemTable);
  

  //Basic Info
  validateReqFields( data, customerExist, defaultAccount, errors );
  validateItemTable(items, itemTable, errors);
  // validateDiscountType(data.discountType, errors);
  validateDiscountTransactionType(data.discountTransactionType, errors);
  //validateDiscountTax(data.discountTax, errors);
  validateShipmentPreference(data.shipmentPreference, errors);
  validatePaymentMode(data.paymentMode, errors);


  //OtherDetails
  //validateAlphanumericFields([''], data, errors);
  validateIntegerFields(['totalItem'], data, errors);
  validateFloatFields(['discountTransactionAmount', 'subTotal','cgst','sgst','igst','vat','totalTax','totalAmount','totalDiscount','otherExpenseAmount','freightAmount','roundOffAmount'], data, errors);
  //validateAlphabetsFields([''], data, errors);

  //Tax Details
  validatePlaceOfSupply(data.placeOfSupply, organizationExists, errors);

  return errors;
}

// Field validation utility
function validateField(condition, errorMsg, errors) {
  if (condition) errors.push(errorMsg);
}
//Valid Req Fields
function validateReqFields( data, customerExist, defaultAccount, errors ) {
validateField( typeof data.customerId === 'undefined' || typeof data.customerName === 'undefined', "Please select a Customer", errors  );
validateField( typeof data.placeOfSupply === 'undefined', "Place of supply required", errors  );
validateField( typeof data.items === 'undefined', "Select an item", errors  );
validateField( typeof data.otherExpenseAmount !== 'undefined' && typeof data.otherExpenseReason === 'undefined', "Please enter other expense reason", errors  );
validateField( typeof data.roundOffAmount !== 'undefined' && !(data.roundOffAmount >= 0 && data.roundOffAmount <= 1), " Round Off Amount must be between 0 and 1", errors );

validateField( typeof defaultAccount.salesAccount === 'undefined', "No Sales Account found", errors  );
validateField( typeof defaultAccount.salesDiscountAccount === 'undefined', "No Sales Discount Account found", errors  );
validateField( typeof defaultAccount.accountReceivableAccount === 'undefined', "No Account Receivable Account found", errors  );

validateField( customerExist.taxType === 'GST' && typeof defaultAccount.outputCgst === 'undefined', "No Output Cgst Account found", errors  );
validateField( customerExist.taxType === 'GST' && typeof defaultAccount.outputSgst === 'undefined', "No Output Sgst Account found", errors  );
validateField( customerExist.taxType === 'GST' && typeof defaultAccount.outputIgst === 'undefined', "No Output Igst Account found", errors  );
validateField( customerExist.taxType === 'VAT' && typeof defaultAccount.outputVat === 'undefined', "No Output Vat Account found", errors  );

}
// Function to Validate Item Table 
function validateItemTable(items, itemTable, errors) {
// Check for item count mismatch
validateField( items.length !== itemTable.length, "Mismatch in item count between request and database.", errors  );

// Iterate through each item to validate individual fields
items.forEach((item) => {
  const fetchedItem = itemTable.find(it => it._id.toString() === item.itemId);

  // Check if item exists in the item table
  validateField( !fetchedItem, `Item with ID ${item.itemId} was not found.`, errors );
  if (!fetchedItem) return; 

  // Validate item name
  validateField( item.itemName !== fetchedItem.itemName, `Item Name Mismatch : ${item.itemName}`, errors );

  // Validate selling price
  validateField( item.sellingPrice !== fetchedItem.sellingPrice, `Selling price Mismatch for ${item.itemName}:  ${item.sellingPrice}`, errors );

  // Validate CGST
  validateField( item.cgst !== fetchedItem.cgst, `CGST Mismatch for ${item.itemName}: ${item.cgst}`, errors );

  // Validate SGST
  validateField( item.sgst !== fetchedItem.sgst, `SGST Mismatch for ${item.itemName}: ${item.sgst}`, errors );

  // Validate IGST
  validateField( item.igst !== fetchedItem.igst, `IGST Mismatch for ${item.itemName}: ${item.igst}`, errors );

  // Validate tax group
  validateField( item.taxGroup !== fetchedItem.taxRate, `Tax Group mismatch for ${item.itemName}: ${item.taxGroup}`, errors );

  // Validate discount type
  validateDiscountTransactionType(item.discountType, errors);

  // Validate integer fields
  validateIntegerFields(['quantity'], item, errors);

  // Validate Stock Count 
  validateField( item.quantity > fetchedItem.currentStock, `Insufficient Stock for ${item.itemName}: Requested quantity ${item.quantity}, Available stock ${fetchedItem.currentStock}`, errors );

  // Validate float fields
  validateFloatFields(['sellingPrice', 'itemTotaltax', 'discountAmount', 'itemAmount'], item, errors);
});
}


// Validate Place Of Supply
function validatePlaceOfSupply(placeOfSupply, organization, errors) {
  validateField(
    placeOfSupply && !validCountries[organization.organizationCountry]?.includes(placeOfSupply),
    "Invalid Place of Supply: " + placeOfSupply, errors );
}


//Validate Discount Transaction Type
function validateDiscountTransactionType(discountTransactionType, errors) {
validateField(discountTransactionType && !validDiscountTransactionType.includes(discountTransactionType),
  "Invalid Discount: " + discountTransactionType, errors);
}

//Validate Shipment Preference
function validateShipmentPreference(shipmentPreference, errors) {
  validateField(shipmentPreference && !validShipmentPreference.includes(shipmentPreference),
    "Invalid Shipment Preference : " + shipmentPreference, errors);
}
//Validate Payment Mode
function validatePaymentMode(paymentMode, errors) {
  validateField(paymentMode && !validPaymentMode.includes(paymentMode),
    "Invalid Payment Mode : " + paymentMode, errors);
}
//Valid Alphanumeric Fields
function validateAlphanumericFields(fields, data, errors) {
  fields.forEach((field) => {
    validateField(data[field] && !isAlphanumeric(data[field]), "Invalid " + field + ": " + data[field], errors);
  });
}
// Validate Integer Fields
function validateIntegerFields(fields, data, errors) {
fields.forEach(field => {
  validateField(data[field] && !isInteger(data[field]), `Invalid ${field}: ${data[field]}`, errors);
});
}
//Valid Float Fields  
function validateFloatFields(fields, data, errors) {
  fields.forEach((balance) => {
    validateField(data[balance] && !isFloat(data[balance]),
      "Invalid " + balance.replace(/([A-Z])/g, " $1") + ": " + data[balance], errors);
  });
}
//Valid Alphabets Fields 
function validateAlphabetsFields(fields, data, errors) {
  fields.forEach((field) => {
    if (data[field] !== undefined) {
      validateField(!isAlphabets(data[field]),
        field.charAt(0).toUpperCase() + field.slice(1) + " should contain only alphabets.", errors);
    }
  });
}












// Helper functions to handle formatting
function capitalize(word) {
return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatCamelCase(word) {
return word.replace(/([A-Z])/g, " $1");
}

// Validation helpers
function isAlphabets(value) {
return /^[A-Za-z\s]+$/.test(value);
}

function isFloat(value) {
return /^-?\d+(\.\d+)?$/.test(value);
}

function isInteger(value) {
return /^\d+$/.test(value);
}

function isAlphanumeric(value) {
return /^[A-Za-z0-9]+$/.test(value);
}

function isValidEmail(value) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}










function calculateSalesOrder(cleanedData, res) {
  const errors = [];
  let totalAmount = 0;
  let subTotal = 0;
  let totalTax = 0;
  let saleAmount =0;
  let totalDiscount= 0;
  let totalItemCount = 0;

  // Utility function to round values to two decimal places
  const roundToTwoDecimals = (value) => Number(value.toFixed(2));


  cleanedData.items.forEach(item => {

    let calculatedCgstAmount = 0;
    let calculatedSgstAmount = 0;
    let calculatedIgstAmount = 0;
    let calculatedVatAmount = 0;
    let calculatedTaxAmount = 0;
    let taxType = cleanedData.taxType;

    // Calculate item line discount 
    const discountAmount = calculateDiscount(item);

    totalDiscount +=  parseFloat(discountAmount);
    totalItemCount +=  parseFloat(item.quantity);

    let itemTotal = (item.sellingPrice * item.quantity) - discountAmount;
    saleAmount +=(item.sellingPrice * item.quantity);
    

    // Handle tax calculation only for taxable items
    if (item.taxPreference === 'Taxable') {
      switch (taxType) {
        
        case 'Intra':
        calculatedCgstAmount = roundToTwoDecimals((item.cgst / 100) * itemTotal);
        calculatedSgstAmount = roundToTwoDecimals((item.sgst / 100) * itemTotal);
        itemTotal += calculatedCgstAmount + calculatedSgstAmount;
        break;

        case 'Inter':
        calculatedIgstAmount = roundToTwoDecimals((item.igst / 100) * itemTotal);
        itemTotal += calculatedIgstAmount;
        break;
        
        case 'VAT':
        calculatedVatAmount = roundToTwoDecimals((item.vat / 100) * itemTotal);
        itemTotal += calculatedVatAmount;
        break;

      }
      calculatedTaxAmount =  calculatedCgstAmount + calculatedSgstAmount + calculatedIgstAmount + calculatedVatAmount;
      
      
      // Check tax amounts
      checkAmount(calculatedCgstAmount, item.cgstAmount, item.itemName, 'CGST',errors);
      checkAmount(calculatedSgstAmount, item.sgstAmount, item.itemName, 'SGST',errors);
      checkAmount(calculatedIgstAmount, item.igstAmount, item.itemName, 'IGST',errors);
      checkAmount(calculatedVatAmount, item.vatAmount, item.itemName, 'VAT',errors);
      checkAmount(calculatedTaxAmount, item.itemTotaltax, item.itemName, 'Total tax',errors);

      totalTax += calculatedCgstAmount + calculatedSgstAmount + calculatedIgstAmount + calculatedVatAmount || 0 ;


    } else {
      console.log(`Skipping Tax for Non-Taxable item: ${item.itemName}`);
      console.log(`Item: ${item.itemName}, Calculated Discount: ${totalDiscount}`);

    }

    // Update total values
    subTotal += parseFloat(itemTotal);

    checkAmount(itemTotal, item.itemAmount, item.itemName, 'Item Total',errors);

    console.log(`${item.itemName} Item Total: ${itemTotal} , Provided ${item.itemAmount}`);
    console.log(`${item.itemName} Total Tax: ${calculatedTaxAmount} , Provided ${item.itemTotaltax || 0 }`);
    console.log("");
  });
  
  //Sale amount
  cleanedData.saleAmount=saleAmount;

  console.log(`SubTotal: ${subTotal} , Provided ${cleanedData.subTotal}`);
  
  //Other Expense
  totalAmount = otherExpense( subTotal, cleanedData );  
  console.log("After Other Expense: ",totalAmount);  

  // Transaction Discount
  let transactionDiscount = calculateTransactionDiscount(cleanedData, totalAmount);

  totalDiscount +=  parseFloat(transactionDiscount); 

  // Total amount calculation
  totalAmount -= transactionDiscount; 

  
  // Round the totals for comparison
  const roundedSubTotal = roundToTwoDecimals(subTotal);
  const roundedTotalTax = roundToTwoDecimals(totalTax);
  const roundedTotalAmount = roundToTwoDecimals(totalAmount);
  const roundedTotalDiscount = roundToTwoDecimals(totalDiscount);

  console.log(`Final Sub Total: ${roundedSubTotal} , Provided ${cleanedData.subTotal}` );
  console.log(`Final Total Tax: ${roundedTotalTax} , Provided ${cleanedData.totalTax}` );
  console.log(`Final Total Amount: ${roundedTotalAmount} , Provided ${cleanedData.totalAmount}` );
  console.log(`Final Total Discount Amount: ${roundedTotalDiscount} , Provided ${cleanedData.totalDiscount}` );

  validateAmount(roundedSubTotal, cleanedData.subTotal, 'SubTotal',errors);
  validateAmount(roundedTotalTax, cleanedData.totalTax, 'Total Tax',errors);
  validateAmount(roundedTotalAmount, cleanedData.totalAmount, 'Total Amount',errors);
  validateAmount(roundedTotalDiscount, cleanedData.totalDiscount, 'Total Discount Amount',errors);
  validateAmount(totalItemCount, cleanedData.totalItem, 'Total Item count',errors);

  if (errors.length > 0) {
    res.status(400).json({ message: errors.join(", ") });
    return false;
  }

  return true;
}




// Calculate item discount
function calculateDiscount(item) {
  return item.discountType === 'Currency'
    ? item.discountAmount || 0
    : (item.sellingPrice * item.quantity * (item.discountAmount || 0)) / 100;
}


//Mismatch Check
function checkAmount(calculatedAmount, providedAmount, itemName, taxType,errors) {
  const roundToTwoDecimals = (value) => Number(value.toFixed(2)); // Round to two decimal places
  const roundedAmount = roundToTwoDecimals(calculatedAmount);
  console.log(`Item: ${itemName}, Calculated ${taxType}: ${roundedAmount}, Provided data: ${providedAmount}`);

  
  if (Math.abs(roundedAmount - providedAmount) > 0.01) {
    const errorMessage = `Mismatch in ${taxType} for item ${itemName}: Calculated ${calculatedAmount}, Provided ${providedAmount}`;
    errors.push(errorMessage);
    console.log(errorMessage);
  }
}

//TransactionDiscount
function calculateTransactionDiscount(cleanedData, totalAmount) {
  const discountAmount = cleanedData.discountTransactionAmount || 0;

  return cleanedData.discountTransactionType === 'Currency'
    ? discountAmount
    : (totalAmount * discountAmount) / 100;
}

//Final Item Amount check
const validateAmount = (calculatedValue, cleanedValue, label, errors) => {
  const isCorrect = calculatedValue === parseFloat(cleanedValue);
  if (!isCorrect) {
    const errorMessage = `${label} is incorrect: ${cleanedValue}`;
    errors.push(errorMessage);
    console.log(errorMessage);
  }
};

//Other Expense
const otherExpense = ( totalAmount, cleanedData ) => {
  if (cleanedData.otherExpenseAmount) {
    const parsedAmount = parseFloat(cleanedData.otherExpenseAmount);
    totalAmount += parsedAmount;
    console.log(`Other Expense: ${cleanedData.otherExpenseAmount}`);
  }
  if (cleanedData.freightAmount) {
    const parsedAmount = parseFloat(cleanedData.freightAmount);
    totalAmount += parsedAmount;
    console.log(`Freight Amount: ${cleanedData.freightAmount}`);
  }
  if (cleanedData.roundOffAmount) {
    const parsedAmount = parseFloat(cleanedData.roundOffAmount);
    totalAmount -= parsedAmount;
    console.log(`Round Off Amount: ${cleanedData.roundOffAmount}`);
  }
  return totalAmount;  
};






































// Jornal
// async function journal ( savedOrder, defaultAccount, openingDate ) {

//   //Discount
//   if( savedOrder.totalDiscount !== 'undefined' && savedOrder.taxType == 'Non-Tax'){

//   }
//   if( savedOrder.totalDiscount !== 'undefined' && savedOrder.taxType == 'Inter'){

//   }
//   if( savedOrder.totalDiscount !== 'undefined' && savedOrder.taxType == 'Intra'){

//   }
//   if( savedOrder.totalDiscount !== 'undefined' && savedOrder.taxType == 'VAT'){

//   }



//   if( typeof savedOrder.totalDiscount === 'undefined' && savedOrder.taxType == 'Non-Tax'){

//   }
//   if( typeof savedOrder.totalDiscount === 'undefined' && savedOrder.taxType == 'Inter'){

//   }
//   if( typeof savedOrder.totalDiscount === 'undefined' && savedOrder.taxType == 'Intra'){

//   }
//   if( typeof savedOrder.totalDiscount === 'undefined' && savedOrder.taxType == 'VAT'){

//   }





//   if(cleanedData.totalDiscount !== 'undefined' ){

//     const newJournalEntry = new Journal({
//       organizationId: savedOrder.organizationId,
//       journalId,
//       date,
//       entryDate,
//       reference,
//       note,
//       cashBasedJournal,
//       currency,
//       transaction: Array.isArray(transaction)
//           ? transaction.map(trans => ({
//               accountId: trans.accountId,
//               accountName: trans.accountName,
//               debitAmount: trans.debitAmount,
//               creditAmount: trans.creditAmount,
//               description: trans.description,
//               contact: trans.contact,
//           }))
//           : [],
//       totalDebitAmount,
//       totalCreditAmount
//   });

//   await newJournalEntry.save();


//   const newTrialEntry = new TrialBalance({
//     organizationId,
//     operationId:newJournalEntry._id,
//     transactionId: journalId,
//     date:entryDate,
//     accountId: trans.accountId,
//     accountName: trans.accountName,
//     action: "Journal",
//     debitAmount: trans.debitAmount,
//     creditAmount: trans.creditAmount,
//     remark: note
// });

// await newTrialEntry.save();
    
//   return  
// }};





























async function journal(savedOrder, defAcc) {
  const discount = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.salesDiscountAccount,
    accountName: defAcc.salesDiscountAccountName,
    debitAmount: savedOrder.totalDiscount,
    creditAmount: 0,
    remark: savedOrder.note,
  };
  const sale = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.salesAccount,
    accountName: defAcc.salesAccountName,
    debitAmount: 0,
    creditAmount: savedOrder.saleAmount,
    remark: savedOrder.note,
  };
  const cgst = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.outputCgst,
    accountName: defAcc.outputCgstName,
    debitAmount: 0,
    creditAmount: savedOrder.cgst,
    remark: savedOrder.note,
  };
  const sgst = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.outputSgst,
    accountName: defAcc.outputSgstName,
    debitAmount: 0,
    creditAmount: savedOrder.sgst,
    remark: savedOrder.note,
  };
  const igst = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.outputIgst,
    accountName: defAcc.outputIgstName,
    debitAmount: 0,
    creditAmount: savedOrder.igst,
    remark: savedOrder.note,
  };
  const vat = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.outputVat,
    accountName: defAcc.outputVatName,
    debitAmount: 0,
    creditAmount: savedOrder.vat,
    remark: savedOrder.note,
  };
  const accountReceivable = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.accountReceivableAccount,
    accountName: defAcc.accountReceivableAccountName,
    debitAmount: savedOrder.totalAmount,
    creditAmount: 0,
    remark: savedOrder.note,
  };
  const otherExpense = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.accountReceivableAccount,
    accountName: defAcc.accountReceivableAccountName,
    debitAmount: savedOrder.otherExpenseAmount,
    creditAmount: 0,
    remark: savedOrder.note,
  };
  const freight = {
    organizationId: savedOrder.organizationId,
    operationId: savedOrder._id,
    transactionId: savedOrder.salesInvoice,
    date: savedOrder.createdDate,
    accountId: defAcc.accountReceivableAccount,
    accountName: defAcc.accountReceivableAccountName,
    debitAmount: savedOrder.freightAmount,
    creditAmount: 0,
    remark: savedOrder.note,
  };
  console.log("discount", discount);
  console.log("sale", sale);
  console.log("cgst", cgst);
  console.log("sgst", sgst);
  console.log("igst", igst);
  console.log("vat", vat);
  console.log("accountReceivable", accountReceivable);

  console.log("Sum : ", ( savedOrder.totalAmount ),( savedOrder.saleAmount + savedOrder.cgst + savedOrder.sgst + savedOrder.igst + savedOrder.vat + savedOrder.otherExpenseAmount + savedOrder.freightAmount));
  

  if (savedOrder.totalDiscount !== 'undefined') {
    switch (savedOrder.taxType) {
      case 'Non-Tax':
        await handleNonTaxWithDiscount(discount);
        break;
      case 'Inter':
        await handleInterWithDiscount(savedOrder, defaultAccount);
        break;
      case 'Intra':
        await handleIntraWithDiscount(savedOrder, defaultAccount);
        break;
      case 'VAT':
        await handleVATWithDiscount(savedOrder, defaultAccount);
        break;
    }
  } else {
    switch (savedOrder.taxType) {
      case 'Non-Tax':
        await handleNonTaxWithoutDiscount(savedOrder, defaultAccount);
        break;
      case 'Inter':
        await handleInterWithoutDiscount(savedOrder, defaultAccount);
        break;
      case 'Intra':
        await handleIntraWithoutDiscount(savedOrder, defaultAccount);
        break;
      case 'VAT':
        await handleVATWithoutDiscount(savedOrder, defaultAccount);
        break;
    }
  }
}




async function createTrialEntry( data ) {
  const newTrialEntry = new TrialBalance({
      organizationId:data.organizationId,
      operationId:data.operationId,
      transactionId: data.transactionId,
      date:data.date,
      accountId: data.accountId,
      accountName: data.accountName,
      action: data.action,
      debitAmount: data.debitAmount,
      creditAmount: data.creditAmount,
      remark: data.remark
});

await newTrialEntry.save();

}