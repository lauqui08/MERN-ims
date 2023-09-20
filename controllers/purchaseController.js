const Purchase = require("../models/Purchase");

//get all purchases
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({});
    if (!purchases) {
      return res.json({ error: "No records to display" });
    }
    return res.json(purchases);
  } catch (error) {
    console.log(error);
  }
};

//add purchases
const addPurchase = async (req, res) => {
  const { supplier, product, quantity, remarks } = req.body;
  try {
    const purchase = await Purchase.create({
      supplier,
      product,
      quantity,
      remarks,
    });
    if (!purchase) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(purchase);
  } catch (error) {
    console.log(error);
  }
};

//view single purchase
const viewPurchase = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchase.findOne({ _id: id });
    if (!purchase) {
      return res.json({ error: "No record found." });
    }
    return res.json(purchase);
  } catch (error) {
    console.log(error);
  }
};

//update purchase
const updatePurchase = async (req, res) => {
  const { id } = req.params;
  const { supplier, product, quantity, remarks, quantityReceived } = req.body;
  try {
    const purchase = await Purchase.updateOne(
      { _id: id },
      { supplier, product, quantity, remarks, quantityReceived }
    );
    if (!purchase) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(purchase);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllPurchases, addPurchase, viewPurchase, updatePurchase };
