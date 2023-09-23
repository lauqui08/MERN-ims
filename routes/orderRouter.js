const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  addOrder,
  viewOrder,
  updateOrder,
  deleteOrder,
  searchOrders
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
//search
router.get("/:searchBy/:query/search",searchOrders);

module.exports = router;
