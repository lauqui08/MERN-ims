const mongoose = require("mongoose");
const connection = async (uri, database) => {
  try {
    await mongoose.connect(uri + database);
    console.log("Database connected!");
  } catch (error) {
    console.log("Database Connection Failed:", error.message);
  }
};
module.exports = connection;
