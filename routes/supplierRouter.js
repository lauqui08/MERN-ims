const express = require("express");
const router = express.Router();
const {
  getAllSuppliers,
  addSupplier,
  viewSupplier,
  updateSupplier,
  deleteSupplier,
  searchSupplier
} = require("../controllers/supplierController");
//get all suppliers
router.get("/", getAllSuppliers);
//add supplier
router.post("/", addSupplier);
//view single supplier
router.get("/:id", viewSupplier);
//update supplier
router.patch("/:id", updateSupplier);
//delete supplier
router.delete("/:id", deleteSupplier);
//search supplier
router.get('/:searchBy/:query/search',searchSupplier);
module.exports = router;
