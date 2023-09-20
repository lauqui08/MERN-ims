const express = require("express");
const router = express.Router();
const {
  getAllProdusts,
  addProducts,
  viewProduct,
  updateProduct,
} = require("../controllers/productController");
//get all products
router.get("/", getAllProdusts);
//add products
router.post("/", addProducts);
//gview single product
router.get("/:id", viewProduct);
//update product
router.patch("/:id", updateProduct);
module.exports = router;
