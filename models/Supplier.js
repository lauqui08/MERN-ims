const mongoose = require("mongoose");
const SupplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: [true, "Supplier name is required."],
  },
  supplierAddress: {
    type: String,
    required: [true, "Supplier address is required."],
  },
  supplierEmail: {
    type: String,
    required: [true, "Supplier email is required."],
  },
  supplierContact: {
    type: Number,
    required: [true, "Supplier contact is required."],
  },
});

const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = Supplier;
