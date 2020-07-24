const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("./dbHelper/mongoose");

const userRoute = require("./routes/users");
const feedbackRoute = require("./routes/feedbacks");
const foodRoute = require("./routes/foods");
const foodTypeRoute = require("./routes/foodtypes");
const foodCategoryRoute = require("./routes/foodcategories");
const cartRoute = require("./routes/cart");
const ratingRoute = require("./routes/rating");
const orderRoute = require("./routes/orders");
const bookRoute = require("./routes/books");
const restaurantRoute = require("./routes/restaurants");
const bookOrderRoute = require("./routes/bookorders");

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
app.use("/feedbacks", feedbackRoute);
app.use("/foods", foodRoute);
app.use("/foodcategories", foodCategoryRoute);
app.use("/foodtypes", foodTypeRoute);
app.use("/carts", cartRoute);
app.use("/ratings", ratingRoute);
app.use("/orders", orderRoute);
app.use("/books", bookRoute);
app.use("/restaurants", restaurantRoute);
app.use("/bookorders", bookOrderRoute);

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
      message: error.message
    }
  });
});

module.exports = app;
