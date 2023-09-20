const mongoose = require("mongoose");
const PurchaseSchema = new mongoose.Schema(
  {
    supplier: { type: Object, required: [true, "Please select supplier."] },
    product: { type: Object, required: [true, "Please select product."] },
    quantity: { type: Number, require: [true, "Quantity is required."] },
    purchaseStatus: { type: String, default: "pending" },
    quantityReceived: { type: Number },
    remarks: { type: String },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;
