const moment = require("moment");
const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Basket = require("../models/basket");

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
router.post("/place-orders", (req, res) => {
  let table = "";
  const orders = req.body;
  let error = 0;
  orders.forEach((order) => {
    table = order.table;
    const ord = new Order({
      table: order.table,
      food_name: order.food_name,
      food_quantity: order.food_quantity,
      food_price: order.food_price,
      food_imagename: order.food_imagename,
      date: moment(),
      status: "InTransit",
    });
    ord
      .save()
      .then((result) => {})
      .catch((err) => {
        error += 1;
        console.log(err);
        res.status(500).json({
          message: err,
        });
      });
  });
  if (error > 0) {
    res.status(201).json({
      message: "Could not place order",
    });
  } else {
    Basket.deleteMany({ table: table })
      .then((result) => {
        res.status(201).json({
          message: "Order(s) placed successfully",
        });
      })
      .catch((err) => {
        console.log("Basket delete error: ", err);
      });
  }
});

//route for getting all orders
router.get("/", function (req, res) {
  Order.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    //.populate("u_id")
    .exec()
    .then(function (order) {
      console.log(order);

      var tableArrKeyHolder = [];
      var tableArr = [];
      order.forEach(function (item) {
        tableArrKeyHolder[item.table] = tableArrKeyHolder[item.table] || {};
        var obj = tableArrKeyHolder[item.table];
        if (Object.keys(obj).length == 0) tableArr.push(obj);

        obj.table = item.table;
        obj.items = obj.items || [];

        obj.items.push({
          food_name: item.food_name,
          food_quantity: item.food_quantity,
          food_price: item.food_price,
          date: item.date,
          status: item.status,
          food_imagename: item.food_imagename,
        });
      });

      console.log(tableArr);
      res.send(tableArr);
    })
    .catch(function (e) {
      res.send(e);
    });
});

// var orderArray = Object.values(list.reduce((result, {
//   table,
//   food_name,
//   food_quantity,
//   food_price,
//   date,
//   status,
//   food_imagename
// }) => {
//   // Create new group
//   if (!result[table]) result[table] = {
//       table,
//       items: []
//   };
//   // Append to group
//   result[table].items.push({
//     food_name,
//     food_quantity,
//     food_price,
//     date,
//     status,
//     food_imagename
//   });
//   return result;
// }, {}));

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
