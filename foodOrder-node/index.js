require("dotenv").config();
const express = require("express");
const { ConnectDB } = require("./config/db_connect");
const app = express();
const foodRouter = require("./routes/foodRouter");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const db_url = process.env.DB_URL;
const cores = require("cors");
const port = process.env.PORT || 400;
app.use(express.json());
app.use(cores());
ConnectDB()
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`Server started successfully ${port}`);
    });
  })
  .catch(() => {
    console.log(`Server Not started`);
  });

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/image", express.static("uploads"));
