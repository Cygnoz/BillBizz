const mongoose = require('mongoose');
const { Schema } = mongoose;

const unpaidBillSchema = new Schema({
  billDate: { type: String },
  dueDate: { type: String },
  billId: { type: String },
  billNumber: { type: String },
  billAmount: { type: Number },
  amountDue: { type: Number },
  payment: { type: Number },
});

const paymentSchema = new Schema({
  organizationId: { type: String },
  supplierId: { type: String },
  supplierDisplayName: { type: String },
  payment:{type:String},// input field for payment
  // paymentMade :  { type: Number },
  paymentDate: { type: String },
  paymentId: { type: String }, //prefix
  paymentMode: { type: String },// cash, bank
  paidThrough: { type: String },//accounts
  reference: { type: String },
  notes: { type: String },
  attachments: { type: String },
  createdDate: { type: String },
  // updatedDate: { type: String },
  total:{ type: Number },
  // amountPaid: { type: Number },
  // amountUsedForPayments: { type: Number},
  // amountRefunded: { type: Number},
  amountInExcess: { type : Number},
  unpaidBills: [unpaidBillSchema],
  userId:{ type: String },
  userName:{ type: String }
});

const PurchasePayment = mongoose.model('Payment Made', paymentSchema);
module.exports = PurchasePayment;
