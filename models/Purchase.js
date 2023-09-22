const mongoose = require("mongoose");
const PurchaseSchema = new mongoose.Schema(
  {
    supplier: { type: Object, required: [true, "Please select supplier."] },
    product: { type: Object, required: [true, "Please select product."] },
    quantity: { type: Number, required: [true, "Quantity is required."] },
    purchaseStatus: { type: String, default: "pending" },
    purchaseRemarks: { type: String, default: "" },
    quantityReceived: { type: Number },
    remarks: { type: String },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;
