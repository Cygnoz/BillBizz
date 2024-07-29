const mongoose = require("mongoose");
const { Schema } = mongoose;


const currencySchema = new Schema({
  organizationId: {type:String},
  currencyCode: { type: String },
  currencySymbol: { type: String },
  currencyName: { type: String },
  decimalPlaces: { type: String },
  format: { type: String },    
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;




