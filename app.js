const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require('./dbHelper/mongoose')
const userRoute = require("./routes/users");
const foodRoute = require("./routes/foods");
const foodTypeRoute = require("./routes/foodtypes");
const foodCategoryRoute = require("./routes/foodcategories");
const basketRoute = require("./routes/basket");
const orderRoute = require("./routes/orders");
const orderHistoryRoute = require("./routes/orderHistory");

app.use(morgan("dev"));
app.use("/images", express.static("images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//for handliing cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", userRoute);
app.use("/foods", foodRoute);
app.use("/foodcategories", foodCategoryRoute);
app.use("/foodtypes", foodTypeRoute);
app.use("/baskets", basketRoute);
app.use("/orders", orderRoute);
app.use("/orderHistory",orderHistoryRoute);


//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
