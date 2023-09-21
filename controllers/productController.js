const Product = require("../models/Product");
//get all products
const getAllProdusts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
//add products
const addProducts = async (req, res) => {
  const { productName, productPrice, productQuantity } = req.body;
  try {
    const product = await Product.create({
      productName,
      productPrice,
      productQuantity,
    });
    if (!product) {
      return res.json({ error: "Failed to add product." });
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

//gview single product
const viewProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.json({ error: "No record found." });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

//update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, productPrice, productQuantity, productStatus } =
    req.body;
  try {
    const product = await Product.updateOne(
      { _id: id },
      { productName, productPrice, productQuantity, productStatus }
    );
    if (!product) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

//delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProdusts,
  addProducts,
  viewProduct,
  updateProduct,
  deleteProduct,
};
