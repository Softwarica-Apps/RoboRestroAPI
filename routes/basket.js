const express = require("express");
const router = express.Router();
const Basket = require("../models/basket");

//route for adding to basket
router.post("/", (req, res) => {
  Basket.find({ table: req.body.table, food_name: req.body.food_name })
    .exec()
    .then((basket) => {
      if (basket.length >= 1) {
        res.status(201).json({
          message: "Item already in basket",
        });
      } else {
        const basket = new Basket({
          table: req.body.table,
          food_name: req.body.food_name,
          food_price: req.body.food_price,
          food_imagename: req.body.food_imagename,
        });
        basket
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Food added to basket",
            });
          })
          .catch((err) => {
            console.log(err);
            // res.status(500).json({
            //   message: err,
            // });
          });
      }
    });
});

//route for getting all basket
router.get("/:table", function (req, res) {
  Basket.find({ table: req.params.table.toString() })
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function (basket) {
      res.send(basket);
    })
    .catch(function (e) {
      res.send(e);
    });
});

//route for deleting item from basket
router.delete("/removefrombasket/:id", (req, res) => {
  Basket.findByIdAndDelete(req.params.id)
    .then(function () {
      res.send("Item removed!");
    })
    .catch(function (e) {
      res.send(e);
    });
});

module.exports = router;
