const Organization = require("../database/model/organization");
const Account = require("../database/model/account");
const Customer = require("../database/model/customer");
const Tax = require("../database/model/tax");
const Currency = require("../database/model/currency");
const moment = require("moment-timezone");
const TrialBalance = require("../database/model/trialBalance");
const CustomerHistory = require("../database/model/customerHistory");

// Fetch existing data
const dataExist = async (organizationId) => {
    const [organizationExists, taxExists, currencyExists, allCustomer] = await Promise.all([
      Organization.findOne({ organizationId }),
      Tax.findOne({ organizationId }),
      Currency.find({ organizationId }, { currencyCode: 1, _id: 0 }),
      Customer.find({ organizationId })
    ]);
    return { organizationExists, taxExists, currencyExists, allCustomer };
  };
  




  // Add Customer
  exports.addCustomer = async (req, res) => {
    console.log("Add Customer:", req.body);
    try {
      const { organizationId, id: userId, userName } = req.user;
      // const organizationId ="INDORG0001";
      // const userId ="45454";
      // const userName ="Thaha";
      console.log("organizationId :",organizationId);

      const duplicateCustomerDisplayName = false;
      const duplicateCustomerEmail = false;
      const duplicateCustomerMobile = false;

      //Clean Data
      const cleanedData = cleanCustomerData(req.body);
      //console.log(cleanedData);            

      const { customerEmail, debitOpeningBalance, creditOpeningBalance, customerDisplayName, mobile } = cleanedData;
  
      const { organizationExists, taxExists, currencyExists } = await dataExist(organizationId);
  
      //Data Exist Validation
      if (!validateOrganizationTaxCurrency(organizationExists, taxExists, currencyExists, res)) return;     
  
      //Date & Time
      const openingDate = generateOpeningDate(organizationExists);

      //Validate Inputs  
      if (!validateInputs(cleanedData, currencyExists, taxExists, organizationExists, res)) return;

      //Duplication Check
      const errors = [];
      await checkDuplicateCustomerFields( duplicateCustomerDisplayName, duplicateCustomerEmail, duplicateCustomerMobile, customerDisplayName, customerEmail, mobile, organizationId, errors);  
      if (errors.length) {
      return res.status(200).json({ message: errors }); }

      const savedCustomer = await createNewCustomer(cleanedData, openingDate, organizationId);
      
      const savedAccount = await createNewAccount(customerDisplayName, openingDate, organizationId, savedCustomer._id);
  
      await saveTrialBalanceAndHistory(savedCustomer, savedAccount, debitOpeningBalance, creditOpeningBalance, cleanedData, openingDate, userId, userName );
  
      console.log("Customer & Account created successfully");
      res.status(201).json({ message: "Customer created successfully." });
    } catch (error) {
      console.error("Error creating customer:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

  // Edit Customer
exports.editCustomer = async (req, res) => {
    console.log("Edit Customer:", req.body);
    try {
      const { organizationId, id: userId, userName } = req.user;

      const cleanedData = cleanCustomerData(req.body);

      const { customerId } = req.params;
  
      const { customerDisplayName } = cleanedData;
  
      const { organizationExists, taxExists, currencyExists } = await dataExist(organizationId);
  
      if (!validateOrganizationTaxCurrency(organizationExists, taxExists, currencyExists, res)) return;
      
      const openingDate = generateOpeningDate(organizationExists);
  
      const existingCustomer = await Customer.findById(customerId);
      if (!existingCustomer) {
        console.log("Customer not found with ID:", customerId);
        return res.status(404).json({ message: "Customer not found" });
      }
  
      const oldCustomerDisplayName = existingCustomer.customerDisplayName;

      if (!validateInputs(cleanedData, currencyExists, taxExists, organizationExists, res)) return;

  
      // Update customer fields
      Object.assign(existingCustomer, cleanedData);
      const savedCustomer = await existingCustomer.save();
  
      if (!savedCustomer) {
        console.error("Customer could not be saved.");
        return res.status(500).json({ message: "Failed to Update Customer." });
      }
  
      // Update customerDisplayName in associated Account documents
      if (customerDisplayName && customerDisplayName !== oldCustomerDisplayName) {
        const updatedAccount = await Account.updateMany(
          {
            accountName: oldCustomerDisplayName,
            organizationId: organizationId,
          },
          { $set: { accountName: customerDisplayName } }
        );
        console.log(
          `${updatedAccount.modifiedCount} account(s) associated with the accountName have been updated with the new customerDisplayName.`
        );
      }
  
      // Add entry to Customer History
      const accountCustomerHistoryEntry = new CustomerHistory({
        organizationId,
        operationId: savedCustomer._id,
        customerId,
        customerDisplayName: savedCustomer.customerDisplayName,
        date: openingDate,
        title: "Customer Data Modified",
        description: `${savedCustomer.customerDisplayName} Account Modified by ${userName}`,

        userId: userId,
        userName: userName,
      });
  
      await accountCustomerHistoryEntry.save();
  
      res.status(200).json({
        message: "Customer updated successfully.",
      });
      console.log("Customer updated successfully:", savedCustomer);
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

  // Get All Customer for a given organizationId
exports.getAllCustomer = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const { organizationExists, allCustomer } = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    if (!allCustomer.length) {
      return res.status(404).json({
        message: "No Customer found",
      });
    }

    res.status(200).json(allCustomer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Get one Customer for a given organizationId
exports.getOneCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const organizationId = req.user.organizationId;

    const {organizationExists} = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Find the Customer by CustomerId and organizationId
    const customers = await Customer.findOne({
      _id: customerId,
      organizationId: organizationId,
    });

    if (!customers) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update the status of a Customer based on the provided status value
exports.updateCustomerStatus = async (req, res) => {
  console.log("Update Customer Status:", req.body);
  try {
    const { customerId } = req.params;
    const organizationId = req.user.organizationId;
    const { status } = req.body; // Status is now taken from the request body

    // Validate organizationId
    const organizationExists = await Organization.findOne({
      organizationId: organizationId,
    });
    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Check if the customer exists
    const customer = await Customer.findOne({
      _id: customerId,
      organizationId: organizationId,
    });
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Update the customer status with the value provided by the frontend
    customer.status = status;

    // Save the updated customer
    await customer.save();

    res.status(200).json({
      message: "Customer status updated successfully.",
      status: customer.status,
    });
    console.log("Customer status updated successfully.");
  } catch (error) {
    console.error("Error updating customer status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Customer Additional data
exports.getCustomerAdditionalData = async (req, res) => {
  const organizationId = req.user.organizationId;
  try {
    // Check if an Organization already exists
    const organization = await Organization.findOne({ organizationId });
    if (!organization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }

    // Fetch tax data to check tax type
    const taxData = await Tax.findOne({ organizationId });
    if (!taxData) {
      return res.status(404).json({
        message: "No tax data found for the organization.",
      });
    }

    // Prepare the response object
    const response = {
      taxType: taxData.taxType,
      gstTreatment: [
        "Registered Business - Regular",
        "Registered Business - Composition",
        "Unregistered Business",
        "Consumer",
        "Overseas",
        "Special Economic Zone",
        "Deemed Export",
        "Tax Deductor",
        "SEZ Developer",
      ],
    };

    // Return the combined response data
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching customer additional data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Get One Customer History for a given organizationId
exports.getOneCustomerHistory = async (req, res) => {
  try {
    const { customerId } = req.params;
    const organizationId = req.user.organizationId;
    const {organizationExists} = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Find the Customer History by CustomerId and organizationId
    const customersHistory = await CustomerHistory.find({
      customerId,
      organizationId,
    });

    if (!customersHistory) {
      return res.status(404).json({
        message: "Customer History not found",
      });
    }

    res.status(200).json(customersHistory);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};









  // Utility Functions
  const validSalutations = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
  const validCustomerTypes = ["Individual", "Business"];
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
  const validGSTTreatments = [
    "Registered Business - Regular",
    "Registered Business - Composition",
    "Unregistered Business",
    "Consumer",
    "Overseas",
    "Special Economic Zone",
    "Deemed Export",
    "Tax Deductor",
    "SEZ Developer",
  ];
  
  
  //Clean Data 
  function cleanCustomerData(data) {
    const cleanData = (value) => (value === null || value === undefined || value === "" || value === 0 ? undefined : value);
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = cleanData(data[key]);
      return acc;
    }, {});
  }
  
  // Validate Organization Tax Currency
  function validateOrganizationTaxCurrency(organizationExists, taxExists, currencyExists, res) {
    if (!organizationExists) {
      res.status(404).json({ message: "Organization not found" });
      return false;
    }
    if (!taxExists) {
      res.status(404).json({ message: "Tax not found" });
      return false;
    }
    if (!currencyExists.length) {
      res.status(404).json({ message: "Currency not found" });
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
 

//Duplication check
async function checkDuplicateCustomerFields( duplicateCustomerDisplayName, duplicateCustomerEmail, duplicateCustomerPhoneNumber, customerDisplayName, customerEmail, mobile, organizationId, errors ) {
          const checks = [
            {
              condition: duplicateCustomerDisplayName && customerDisplayName !== undefined,
              field: 'customerDisplayName',
              value: customerDisplayName,
              errorMessage: `Customer with the provided display name already exists: ${customerDisplayName}`,
            },
            {
              condition: duplicateCustomerEmail && customerEmail !== undefined,
              field: 'customerEmail',
              value: customerEmail,
              errorMessage: `Customer with the provided email already exists: ${customerEmail}`,
            },
            {
              condition: duplicateCustomerPhoneNumber && mobile !== undefined,
              field: 'mobile',
              value: mobile,
              errorMessage: `Customer with the provided phone number already exists: ${mobile}`,
            },
          ];

          for (const { condition, field, value, errorMessage } of checks) {
            if (condition) {
              const existingRecord = await Customer.findOne({ [field]: value, organizationId });
              if (existingRecord) {
                errors.push(errorMessage);
              }
            }
          }

          
        }


//Validate inputs
  function validateInputs(data, currencyExists, taxExists, organizationExists, res) {
    const validCurrencies = currencyExists.map((currency) => currency.currencyCode);
    const validTaxTypes = ["None", taxExists.taxType];
    const validationErrors = validateCustomerData(data, validCurrencies, validTaxTypes, organizationExists);
  
    if (validationErrors.length > 0) {
      res.status(400).json({ message: validationErrors.join(", ") });
      return false;
    }
    return true;
  }

// Create New Customer
  function createNewCustomer(data, openingDate,organizationId) {
    const newCustomer = new Customer({ ...data, organizationId, status: "Active", createdDate: openingDate, lastModifiedDate: openingDate });
    return newCustomer.save();
  }
  
// Create New Account
  function createNewAccount(customerDisplayName, openingDate, organizationId, customerId) {
    const newAccount = new Account({
      organizationId,
      accountName: customerDisplayName,
      accountCode: customerId,
      accountSubhead: "Sundry Debtors",
      accountHead: "Asset",
      accountGroup: "Asset",
      openingDate,
      description: "Customer",
    });
    return newAccount.save();
  }
  
// TrialBalance And History
async function saveTrialBalanceAndHistory(savedCustomer, savedAccount, debitOpeningBalance, creditOpeningBalance, data, openingDate, userId, userName) {
    const trialEntry = new TrialBalance({
      organizationId: savedCustomer.organizationId,
      operationId: savedCustomer._id,
      date: openingDate,
      accountId: savedAccount._id,
      accountName: savedAccount.accountName,
      action: "Opening Balance",
      debitAmount: debitOpeningBalance,
      creditAmount: creditOpeningBalance,
      remark: data.remark,
    });
    await trialEntry.save();
  
    const customerHistory = createCustomerHistory(savedCustomer, savedAccount, data, openingDate,userId,userName);
    await CustomerHistory.insertMany(customerHistory);
  }
  
  
// Create Customer History
function createCustomerHistory(savedCustomer, savedAccount, data, openingDate,userId,userName) {
    const description = getTaxDescription(data, userName);
    const description1 = getOpeningBalanceDescription( data, userName);
  
    return [
      {
        organizationId: savedCustomer.organizationId,
        operationId: savedCustomer._id,
        customerId: savedCustomer._id,
        customerDisplayName: data.customerDisplayName,
        date: openingDate,
        title: "Customer Added",
        description,
        userId: userId,
        userName: userName,
      },
      {
        organizationId: savedCustomer.organizationId,
        operationId: savedAccount._id,
        customerId: savedCustomer._id,
        customerDisplayName: data.customerDisplayName,
        date: openingDate,
        title: "Customer Account Created",
        description: description1,
        userId: userId,
        userName: userName,
      },
    ];
  }
  

// Tax Description
function getTaxDescription(data, userName) {
    const descriptionBase = `${data.customerDisplayName} Contact created with `;
    const taxDescriptionGenerators = {
      GST: () => createGSTDescription(data),
      VAT: () => createVATDescription(data),
      None: () => createTaxExemptionDescription(),
    };
  
    return taxDescriptionGenerators[data.taxType]?.() 
      ? descriptionBase + taxDescriptionGenerators[data.taxType]() + `
Created by ${userName}` 
      : "";
  }
  //GST Description
  function createGSTDescription({ gstTreatment, gstin_uin, placeOfSupply }) {
    return gstTreatment && gstin_uin && placeOfSupply
      ? `
GST Treatment '${gstTreatment}' & GSTIN '${gstin_uin}'. State updated to ${placeOfSupply}. `
      : "";
  }
  //VAT Description
  function createVATDescription({ vatNumber, placeOfSupply }) {
    return vatNumber && placeOfSupply
      ? `VAT Number '${vatNumber}'. State updated to ${placeOfSupply}. `
      : "";
  }
  //Tax empt Description
  function createTaxExemptionDescription() {
    return "Tax Exemption. ";
  }
  

// Opening Balance Description
function getOpeningBalanceDescription( data, userName) {
    const { customerDisplayName } = data;
    const balanceDescription = data.debitOpeningBalance 
      ? `Opening Balance (Debit): '${data.debitOpeningBalance}'. `
      : data.creditOpeningBalance 
        ? `Opening Balance (Credit): '${data.creditOpeningBalance}'. `
        : "";
  
    return balanceDescription 
      ? `${customerDisplayName} Account created with ${balanceDescription}Created by ${userName}` 
      : "";
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
  function validateCustomerData(data, validCurrencies, validTaxTypes, organization) {
    const errors = [];

    //Basic Info
    validateCustomerType(data.customerType, errors);
    validateSalutation(data.salutation, errors);
    validateNames(['firstName', 'lastName'], data, errors);
    validateEmail(data.customerEmail, errors);
    validatePhones(['workPhone', 'mobile', 'cardNumber'], data, errors);

    //OtherDetails
    validateAlphanumericFields(['pan'], data, errors);
    validateIntegerFields(['creditDays', 'creditLimits', 'interestPercentage'], data, errors);
    validateFloatFields(['debitOpeningBalance', 'creditOpeningBalance'], data, errors);
    validateAlphabetsFields(['department', 'designation'], data, errors);

    //Tax Details
    validateTaxType(data.taxType, validTaxTypes, errors);
    validatePlaceOfSupply(data.placeOfSupply, organization, errors);
    validateGSTorVAT(data, errors);

    //Currency
    validateCurrency(data.currency, validCurrencies, errors);

    //Address
    validateBillingAddress(data, errors);
    validateShippingAddress(data, errors);  
    return errors;
  }
  
  // Field validation utility
  function validateField(condition, errorMsg, errors) {
    if (condition) errors.push(errorMsg);
  }

//Valid Customer Type
  function validateCustomerType(customerType, errors) {
    validateField(customerType && !validCustomerTypes.includes(customerType),
      "Invalid Customer type: " + customerType, errors);
  }
//Validate Salutation
  function validateSalutation(salutation, errors) {
    validateField(salutation && !validSalutations.includes(salutation),
      "Invalid Salutation: " + salutation, errors);
  }
//Validate Names 
  function validateNames(fields, data, errors) {
    fields.forEach((name) => {
      validateField(data[name] && !isAlphabets(data[name]),
        name.charAt(0).toUpperCase() + name.slice(1) + " should contain only alphabets.", errors);
    });
  }
//Validate Email
  function validateEmail(email, errors) {
    validateField(email && !isValidEmail(email), "Invalid email: " + email, errors);
  }
//Validate Phones
  function validatePhones(fields, data, errors) {
    fields.forEach((phone) => {
      validateField(data[phone] && !isInteger(data[phone]),
        phone.charAt(0).toUpperCase() + phone.slice(1) + " should contain only digits: " + data[phone], errors);
    });
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

//Validate Tax Type
  function validateTaxType(taxType, validTaxTypes, errors) {
    validateField(taxType && !validTaxTypes.includes(taxType),
      "Invalid Tax Type: " + taxType, errors);
  }
// Validate Place Of Supply
  function validatePlaceOfSupply(placeOfSupply, organization, errors) {
    if (placeOfSupply && !validCountries[organization.organizationCountry]?.includes(placeOfSupply)) {
      errors.push("Invalid Place of Supply: " + placeOfSupply);
    }
  }
// Validate GST or VAT details
function validateGSTorVAT(data, errors) {
  switch (data.taxType) {
    case "GST":
      validateGSTDetails(data, errors);
      break;
    case "VAT":
      validateVATDetails(data, errors);
      break;
    case "None":
      clearTaxFields(data);
      break;
  }
}

// Validate GST details
function validateGSTDetails(data, errors) {
  validateField(
    data.gstTreatment && !validGSTTreatments.includes(data.gstTreatment),
    `Invalid GST treatment: ${data.gstTreatment}`, 
    errors
  );
  validateField(
    data.gstin_uin && !isAlphanumeric(data.gstin_uin),
    `Invalid GSTIN/UIN: ${data.gstin_uin}`, 
    errors
  );
}

// Validate VAT details
function validateVATDetails(data, errors) {
  validateField(
    data.vatNumber && !isAlphanumeric(data.vatNumber),
    `Invalid VAT number: ${data.vatNumber}`, 
    errors
  );
}

// Clear tax fields when no tax is applied
function clearTaxFields(data) {
  ['gstTreatment', 'gstin_uin', 'vatNumber', 'placeOfSupply'].forEach(field => {
    data[field] = undefined;
  });
}
//Validate Currency
function validateCurrency(currency, validCurrencies, errors) {
  validateField(currency && !validCurrencies.includes(currency), "Invalid Currency: " + currency, errors);
}
// Validate billing address
function validateBillingAddress(data, errors) {
  const country = data.billingCountry, state = data.billingState;

  validateField(country && state && !validCountries[country]?.includes(state),
    `Invalid Billing Country or State: ${country}, ${state}`, errors);

  validateAddressFields('billing', data, errors);
}

// Validate shipping address
function validateShippingAddress(data, errors) {
  const country = data.shippingCountry, state = data.shippingState;

  validateField(country && state && !validCountries[country]?.includes(state),
    `Invalid Shipping Country or State: ${country}, ${state}`, errors);

  validateAddressFields('shipping', data, errors);
}

// Validate common address fields
function validateAddressFields(type, data, errors) {
  ['PinCode', 'Phone', 'FaxNumber'].forEach(field => {
    const value = data[`${type}${field}`];
    validateField(value && !isInteger(value),
      `Invalid ${capitalize(type)} ${formatCamelCase(field)}: ${value}`, errors);
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