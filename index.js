require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const supplierRouter = require("./routes/supplierRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const orderRouter = require("./routes/orderRouter");
const userRouter = require("./routes/userRouter");
//database connection
const dbcon = require("./db/databaseConnection");
const app = express();

//valriables
const PORT = process.env.PORT || 8000;
const URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE;

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/suppliers", supplierRouter);
app.use("/api/v1/purchases", purchaseRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);

//start server
const start = async () => {
  await dbcon(URI, DATABASE);
  app.listen(PORT, (error) => {
    if (error) {
      console.log("Unable to run server.");
      return;
    }
    console.log(`Server is running on port ${PORT}`);
  });
  try {
  } catch (error) {
    console.log(error.message);
  }
};
start();
