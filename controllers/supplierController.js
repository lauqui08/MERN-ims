const Supplier = require("../models/Supplier");
//get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.json(suppliers);
  } catch (error) {
    console.log(error);
  }
};
//add supplier
const addSupplier = async (req, res) => {
  const { supplierName, supplierAddress, supplierEmail, supplierContact } =
    req.body;
  try {
    const supplier = await Supplier.create({
      supplierName,
      supplierAddress,
      supplierEmail,
      supplierContact,
    });
    res.json(supplier);
  } catch (error) {
    console.log(error);
  }
};

//view single supplier
const viewSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findOne({ _id: id });
    if (!supplier) {
      return res.json({ error: "No record found." });
    }
    return res.json(supplier);
  } catch (error) {
    console.log(error);
  }
};

//update supplier
const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { supplierName, supplierAddress, supplierEmail, supplierContact } =
    req.body;
  try {
    const supplier = await Supplier.updateOne(
      { _id: id },
      { supplierName, supplierAddress, supplierEmail, supplierContact }
    );
    if (!supplier) {
      return res.json({ error: "Unable to process request." });
    }
    return res.json(supplier);
  } catch (error) {
    console.log(error);
  }
};

//delete supplier
const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findOneAndDelete({ _id: id });
    res.json(supplier);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllSuppliers,
  addSupplier,
  viewSupplier,
  updateSupplier,
  deleteSupplier,
};
