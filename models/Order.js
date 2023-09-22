const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Customer Name is required."],
  },
  product: { type: Object, required: [true, "Product is required."] },
  quantity: { type: Number, required: [true, "Quantity is required."] },
  price: { type: Number },
  orderNumber: { type: String },
  orderStatus:{type:String,default:'pending'}
},{timestamps:true});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
