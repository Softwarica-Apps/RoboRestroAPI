const moment = require("moment");
const express = require("express");
const router = express.Router();
const BookOrder = require("../models/bookorders");
const auth = require("../middleware/auth");

//route for adding order
router.post("/", (req, res) => {
  const order = new BookOrder({
    phone: req.body.phone,
    book_name: req.body.book_name,
    book_price: req.body.book_price,
    book_imagename: req.body.book_imagename,
    payment_type: req.body.payment_type,
    date: moment(),
    status: "InTransit"
  });
  order
    .save()
    .then(result => {
      res.status(201).json({
        message: "Order Success"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting all orders
router.get("/", function(req, res) {
  BookOrder.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(order) {
      res.send(order);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting all orders of particular user
router.get("/:phone", function(req, res) {
  BookOrder.find({ phone: req.params.phone })
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(order) {
      res.send(order);
    })
    .catch(function(e) {
      res.send(e);
    });
});

module.exports = router;
