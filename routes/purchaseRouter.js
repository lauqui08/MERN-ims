const express = require("express");
const router = express.Router();
const {
  getAllPurchases,
  addPurchase,
  viewPurchase,
  updatePurchase,
} = require("../controllers/purchaseController");
//get all purchases
router.get("/", getAllPurchases);
//add purchases
router.post("/", addPurchase);
//view single purchase
router.get("/:id", viewPurchase);
//update purchase
router.patch("/:id", updatePurchase);
module.exports = router;
