const express = require("express");
const router = express.Router();
const {
  getAllProdusts,
  addProducts,
  viewProduct,
  updateProduct,
  deleteProduct,
  checkOutUpdate
} = require("../controllers/productController");
//get all products
router.get("/", getAllProdusts);
//add products
router.post("/", addProducts);
//gview single product
router.get("/:id", viewProduct);
//update product
router.patch("/:id", updateProduct);
//update checkout
router.patch("/:productName/updateProductQuantity",checkOutUpdate);
//delete product
router.delete("/:id", deleteProduct);
module.exports = router;
