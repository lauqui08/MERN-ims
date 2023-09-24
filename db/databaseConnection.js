const mongoose = require("mongoose");
const connection = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected!");
  } catch (error) {
    console.log("Database Connection Failed:", error.message);
  }
};
module.exports = connection;
