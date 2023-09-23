const _ = require('lodash');
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
  const { supplier, product, quantity, purchaseRemarks } = req.body;
  try {
  	const jsonSupplier = (typeof supplier) == 'string' ? JSON.parse(supplier) : supplier;  	
  	const jsonProduct = (typeof product) == 'string' ? JSON.parse(product) : product;
  	
  	if(_.isEmpty(jsonSupplier) || _.isEmpty(jsonProduct)){
  		return res.status(400).json({error:"All fields is required."})
  	}
  	
  	
    const purchase = await Purchase.create({
      supplier:jsonSupplier,
      product:jsonProduct,
      quantity,
      purchaseRemarks,
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
  const { supplier, product, quantity, purchaseStatus, quantityReceived,purchaseRemarks } = req.body;
  try {
  	const jsonSupplier = (typeof supplier) == 'string' ? JSON.parse(supplier) : supplier;  	
  	const jsonProduct = (typeof product) == 'string' ? JSON.parse(product) : product;
    const purchase = await Purchase.updateOne(
      { _id: id },
      { supplier:jsonSupplier, product:jsonProduct, quantity, purchaseStatus, quantityReceived,purchaseRemarks }
    );
    if (!purchase) {
      return res.status(400).json({ error: "Unable to process request." });
    }
    return res.json(purchase);
  } catch (error) {
    console.log(error);
  }
};

//delete purchase
const deletePurchase = async (req, res) => {
  const { id } = req.params;

  try {
  	
    const purchase = await Purchase.findOneAndDelete({ _id: id });
    if (!purchase) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(purchase);
  } catch (error) {
    console.log(error);
  }
};

//search purchases
const searchPurchases = async (req, res) => {
const {searchBy,query} = req.params;
const myQuery = {};

	try{
	//const orders = await Order.find({...myQuery,[searchBy]:query});
	const purchases = await Purchase.find({...myQuery,[searchBy]:{ $regex: '.*' + query + '.*',$options:'i' } });
	return res.json(purchases);
	}catch(error){console.log(error.message)}
}

module.exports = { getAllPurchases, addPurchase, viewPurchase, updatePurchase, deletePurchase,searchPurchases };
