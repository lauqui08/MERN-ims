const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required."],
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required."],
  },
  productQuantity: {
    type: Number,
    required: [true, "Product quantity is required."],
  },
  productStatus: {
    type: String,
    default: "available",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
