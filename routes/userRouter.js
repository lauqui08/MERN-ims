const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  checkUserInfo,
  checkAdmin,
} = require("../controllers/userController");

//register
router.post("/register", registerUser);
//get all users
router.post("/login", loginUser);
//get user info via email
router.get("/:email/info", checkUserInfo);
//get user info via email
router.get("/checkAdmin", checkAdmin);
module.exports = router;
