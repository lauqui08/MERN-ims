const express = require("express");
const router = express.Router();
const {
  getAllSuppliers,
  addSupplier,
  viewSupplier,
  updateSupplier,
  deleteSupplier,
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
module.exports = router;
