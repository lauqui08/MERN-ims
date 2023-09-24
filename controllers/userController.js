const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const registerUser = async (req, res) => {
  const { fullname, email, password, userType } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const jwToken = jwt.sign({ email }, SECRET);
    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
      token: jwToken,
      userType,
    });
    res.json({ message: "Successfully registered user." });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already taken." });
    }
    return res.status(400).json({ error: "All field is required." });
  }
};

const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const validateEmail = await User.findOne({ email });
    if (!validateEmail) {
      return res
        .status(400)
        .json({ error: "Failed to login. Please check your credentials." });
    }
    const hashPassword = validateEmail.password;

    await bcrypt.compare(password, hashPassword, (error, result) => {
      if (!result) {
        return res
          .status(400)
          .json({ error: "Failed to login. Please check your credentials." });
      } else {
        jwt.verify(validateEmail.token, SECRET, (error, decoded) => {
          if (!decoded) {
            return res.status(400).json({
              error: "Failed to login. Please check your credentials.",
            });
          } else {
            return res.json({ ...decoded, token: validateEmail.token });
          }
        });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to login. Please check your credentials." });
  }
};

//view user info via email
const checkUserInfo = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
};

//check admin
const checkAdmin = async (req, res) => {
  try {
    const checkAdm = await User.findOne({ userType: "admin" });
    res.json(checkAdm);
  } catch (error) {
    console.log(error.message);
  }
};

const changePassword = async (req, res) => {
  const { email, password, newPassword, confirmPassword } = req.body;

  if (newPassword != confirmPassword) {
    return res.status(400).json({ error: "Password not match." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Unable to change password. Please try again." });
    }
    await bcrypt.compare(password, user.password, async (error, result) => {
      if (!result) {
        return res
          .status(400)
          .json({ error: "Unable to change password. Please try again." });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await User.findOneAndUpdate({ email }, { password: hashedNewPassword });
      return res.json({ message: "Successfully updated password." });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Unable to change password. Please try again." });
  }
};
module.exports = {
  registerUser,
  loginUser,
  checkUserInfo,
  checkAdmin,
  changePassword,
};
