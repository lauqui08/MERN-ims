const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  addOrder,
  viewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
//get all orders
router.get("/", getAllOrders);
//add order
router.post("/", addOrder);
//view single order
router.get("/:id", viewOrder);
//update order
router.patch("/:id", updateOrder);
//delete order
router.delete("/:id", deleteOrder);

module.exports = router;
