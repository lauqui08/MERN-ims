const Order = require("../models/Order");
const Product = require("../models/Product");
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
  const { customerName, product, quantity, orderNumber } = req.body;
  const checkItem = await Order.findOne({ product, orderNumber });
  const price = await Product.findOne({ productName: product });

  console.log(price);
  if (checkItem) {
    console.log("Order:", Number(checkItem.quantity) + Number(quantity));
    console.log("Stock:", Number(price.productQuantity));
    try {
      if (
        Number(checkItem.quantity) + Number(quantity) >
        Number(price.productQuantity)
      ) {
        return res.status(400).json({
          error:
            "Not enough stock to process this order. Only " +
            (Number(price.productQuantity) - Number(checkItem.quantity)) +
            " pieces remaining.",
        });
      }
      const newQuantity = Number(checkItem.quantity) + Number(quantity);
      const newPrice = Number(checkItem.price) + Number(price.productPrice);
      const order = await Order.findOneAndUpdate(
        { product, orderNumber },
        { quantity: newQuantity, price: newPrice }
      );
      return res.json(order);
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const totalPrice = Number(quantity) * Number(price.productPrice);
    const checkQuantity = await Product.findOne({ productName: product });
    if (checkQuantity.productQuantity < quantity) {
      return res.status(400).json({
        error:
          "Not enough stock to process this order. Only " +
          checkQuantity.productQuantity +
          " pieces remaining.",
      });
    }

    const order = await Order.create({
      customerName,
      product,
      quantity,
      price: totalPrice,
      orderNumber,
    });

    if (!order) {
      return res.status(400).json({ error: "All field is required." });
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "All field is required." });
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
  const { customerName, product, quantity, price, orderNumber, orderStatus } =
    req.body;

  try {
    const order = await Order.updateOne(
      { _id: id },
      { customerName, product, quantity, price, orderNumber, orderStatus }
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
    console.log(error.message);
  }
};

//search orders
const searchOrders = async (req, res) => {
  const { searchBy, query } = req.params;
  const myQuery = {};

  try {
    //const orders = await Order.find({...myQuery,[searchBy]:query});
    const orders = await Order.find({
      ...myQuery,
      [searchBy]: { $regex: ".*" + query + ".*", $options: "i" },
    });
    return res.json(orders);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  viewOrder,
  updateOrder,
  deleteOrder,
  searchOrders,
};
