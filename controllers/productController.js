const Product = require("../models/Product");
//get all products
const getAllProdusts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
//add products
const addProducts = async (req, res) => {
  const { productName, productPrice, productQuantity } = req.body;
  try {
    const product = await Product.create({
      productName,
      productPrice,
      productQuantity,
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "All field is required" });
  }
};

//gview single product
const viewProduct = async (req, res) => {
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
};

//update product
const updateProduct = async (req, res) => {
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
};

//checkout product to update quantity on stock
const checkOutUpdate = async(req, res) => {
	const {productName} = req.params;
	const {quantitySold} = req.body;
		const quantityStock = await Product.findOne({productName});
		const newQuantity = (Number(quantityStock.productQuantity) - Number(quantitySold));
		const updatedStock = await Product.findOneAndUpdate({productName},{productQuantity:(Number(quantityStock.productQuantity) - 		Number(quantitySold)),productStatus:newQuantity ? 'available' : 'no stock'});
		
		console.log('sheeesh=',newQuantity);
	}
	
//search products
const searchProducts = async (req, res) => {
const {searchBy,query} = req.params;
const myQuery = {};

	try{
	//const orders = await Order.find({...myQuery,[searchBy]:query});
	const products = await Product.find({...myQuery,[searchBy]:{ $regex: '.*' + query + '.*',$options:'i' } });
	return res.json(products);
	}catch(error){console.log(error.message)}
}

//delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProdusts,
  addProducts,
  viewProduct,
  updateProduct,
  deleteProduct,
  checkOutUpdate,
  searchProducts
};
