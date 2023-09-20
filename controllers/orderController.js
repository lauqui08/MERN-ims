const Order = require("../models/Order");

//get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders) {
      return res.json({ error: "No record found." });
    }
    return res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

//add order
const addOrder = async (req, res) => {
  const { customerName, product, quantity, price, orderNumber } = req.body;
  try {
    const order = await Order.create({
      customerName,
      product,
      quantity,
      price,
      orderNumber,
    });
    if (!order) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
};

//view single order
const viewOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.json({ error: "No record Found" });
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
};

//update order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customerName, product, quantity, price, orderNumber } = req.body;

  try {
    const order = await Order.updateOne(
      { _id: id },
      { customerName, product, quantity, price, orderNumber }
    );
    if (!order) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
};

//delete order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOneAndDelete({ _id: id });
    if (!order) {
      return res.json({ error: "Unabl to process request." });
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  viewOrder,
  updateOrder,
  deleteOrder,
};
