const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Customer Name is required."],
  },
  product: { type: Object, require: [true, "Product is required."] },
  quantity: { type: Number, require: [true, "Quantity is required."] },
  price: { type: Number },
  orderNumber: { type: String },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
