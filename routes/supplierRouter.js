const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");
//get all products
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.json(suppliers);
  } catch (error) {
    console.log(error);
  }
});
//add supplier
router.post("/", async (req, res) => {
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
});

//view single supplier
router.get("/:id", async (req, res) => {
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
});

//update supplier
router.patch("/:id", async (req, res) => {
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
});

//delete supplier
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findOneAndDelete({ _id: id });
    res.json(supplier);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
