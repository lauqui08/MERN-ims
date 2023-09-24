const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: [true, "Fullname is required."] },
  email: { type: String, required: [true, "Email is required."], unique: true },
  password: { type: String, required: [true, "Password is required."] },
  userType: { type: String, required: true, default: "admin" },
  accountStatus: { type: String, default: "active" },
  token: { type: String },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
