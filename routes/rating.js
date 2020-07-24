const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Rating = require("../models/rating");

//route for adding rating
router.post("/", (req, res) => {
  Rating.find({ phone: req.body.phone, food_name: req.body.food_name })
    .exec()
    .then(rating => {
      if (rating.length >= 1) {
        res.status(201).json({
          message_error: "Rate Already Exists"
        });
      } else {
        const rating = new Rating({
          phone: req.body.phone,
          food_name: req.body.food_name,
          rating: req.body.rating
        });
        rating
          .save()
          .then(result => {
            res.status(201).json({
              message_success: "Success"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              message: err
            });
          });
      }
    });
});

//route for getting inidividual rating
router.post("/myRating", function(req, res) {
  try {
    Rating.find({ phone: req.body.phone, food_name: req.body.food_name })
      .exec()
      .then(function(rating) {
        res.send(rating);
      })
      .catch(function(e) {
        res.send(e);
      });
  } catch (e) {
    res.send(e);
  }
});

//route for updating rating
router.put("/:id", function(req, res) {
  id = req.params.id.toString();
  Rating.update(
    { _id: id },
    {
      $set: {
        rating: req.body.rating
      }
    }
  )
    .then(function(rating) {
      res.status(201).json({
        message_success: "Rating Updated Successfully"
      });
    })
    .catch(function(e) {
      res.status(500).json({
        message: e
      });
    });
});

/* //route for getting total rating
router.get("/totalrating", function(req, res) {
  Rating.find({ food_name: req.body.food_name })
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(rating) {
      res.send(rating);
    })
    .catch(function(e) {
      res.send(e);
    });
});
 */

router.get("/totalrating/:food_name", (req, res) => {
  Rating.find({ food_name: req.params.food_name })
    .select("rating")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        ratings: docs.map(doc => {
          return {
            rating: doc.rating
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
