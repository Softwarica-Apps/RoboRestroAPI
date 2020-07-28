const moment = require("moment");
const express = require("express");
const router = express.Router();
const Order = require("../models/order");

//route for adding order
router.post("/", (req, res) => {
  const order = new Order({
    table: req.body.table,
    food_name: req.body.food_name,
    food_quantity: req.body.food_quantity,
    food_price: req.body.food_price,
    food_imagename: req.body.food_imagename,
    date: moment(),
    status: "InTransit",
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order placed successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
});

//route for adding order
router.post("/multiple", (req, res) => {
  const order = new Order({
    table: req.body.table,
    food_name: req.body.food_name,
    food_quantity: req.body.food_quantity,
    food_price: req.body.food_price,
    food_imagename: req.body.food_imagename,
    date: moment(),
    status: "InTransit",
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order placed successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
});
//route for getting all orders
router.get("/", function (req, res) {
  Order.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    //.populate("u_id")
    .exec()
    .then(function (order) {
      res.send(order);
    })
    .catch(function (e) {
      res.send(e);
    });
});

//route for getting all orders of particular user
router.get("/:table", function (req, res) {
  Order.find({ table: req.params.table })
    .sort({ createdAt: -1 }) //sort in descending order
    //.populate("u_id")
    .exec()
    .then(function (order) {
      res.send(order);
    })
    .catch(function (e) {
      res.send(e);
    });
});

module.exports = router;
