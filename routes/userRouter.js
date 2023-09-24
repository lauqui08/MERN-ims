const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  checkUserInfo,
  checkAdmin,
  changePassword,
  viewAllUsers,
  searchUsers,
} = require("../controllers/userController");

//register
router.post("/register", registerUser);
//get all users
router.post("/login", loginUser);
//get user info via email
router.get("/:email/info", checkUserInfo);
//get user info via email
router.get("/checkAdmin", checkAdmin);
//change password
router.post("/change-password", changePassword);
//view all users
router.get("/", viewAllUsers);
//search users
router.get("/:searchBy/:query/search", searchUsers);
module.exports = router;
