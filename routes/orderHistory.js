
const express = require("express");
const router = express.Router();
const OrderHistory = require("../models/orderHistory");
//route for getting all orders of particular user
router.get("/:orderHistory", function (req, res) {
    OrderHistory.find({ table: req.params.table })
      .sort({ createdAt: -1 }) //sort in descending order
      //.populate("u_id")
      .exec()
      .then( function (order) {
        res.send(order);
      })
      .catch( function(e) {
        res.send(e);
      });
  });



  router.delete("/:orderHistoryDelete", function(req, res){
      OrderHistory.findOneAndDelete({table: req.params.table})
      .exec()
      .then(function(order){
          res.send(order);
      })
      .catch(function(e){
          res.send(e);
      })
  })

  module.exports = router;