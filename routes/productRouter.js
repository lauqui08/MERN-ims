const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
//get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});
//add products
router.post("/", async (req, res) => {
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
});

//gview single product
router.get("/:id", async (req, res) => {
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
});

//update product
router.patch("/:id", async (req, res) => {
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
});

module.exports = router;
