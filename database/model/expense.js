const mongoose = require("mongoose");
const { Schema } = mongoose;
 

const expenseTableSchema = new Schema({
    expenseAccountId: { type: String },
    expenseAccount: { type: String },

    note: { type: String },

    taxGroup: { type: String }, // GST5,GST12...
    taxExemption: { type: String },

    sgst: { type: Number },
    cgst: { type: Number },
    igst: { type: Number },
    vat: { type: Number },

    sgstAmount: { type: Number },
    cgstAmount: { type: Number },
    igstAmount: { type: Number },
    vatAmount: { type: Number },

    amount: { type: Number }
});

const expenseSchema = new Schema({
    organizationId:{ type : String },
    expenseDate: { type: String },
    expenseNumber: { type: String },   //Prefix

    // employee: { type: String },

    paidThrough: {type:String},
    paidThroughId: {type:String},

    expenseCategory: {type:String},
    expenseType: {type:String},
    hsnCode: {type:String},
    sac: {type:String},

    taxMode: { type: String },  // Inter / Intra / None 

    distance: {type:Number},
    ratePerKm: {type:Number},

    supplierId: {type:String},
    supplierDisplayName: {type:String},
    gstTreatment: {type:String},
    gstin: {type:String},
    sourceOfSupply: {type:String},
    destinationOfSupply: {type:String},

    amountIs: {type:String},    // Tax Inclusive / Tax Exclusive
    invoice: {type:String},
    uploadFiles: {type:String},

    subTotal: {type:Number},
    sgst: { type: Number },
    cgst: { type: Number },
    igst: { type: Number },
    vat: { type: Number },
    grandTotal: { type: Number },

    createdDate: { type: String },

    expense: [expenseTableSchema]

});
 
const Expense = mongoose.model("Expense", expenseSchema);
 
module.exports = Expense;