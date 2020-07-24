const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./images");
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "food" + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    //accept
    cb(null, true);
  } else {
    //reject a file
    cb(new Error("File format not supported"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});

const Foodcategory = require("../models/foodcategories");

//route for adding foodcategory
router.post(
  "/addFoodCategory",
  auth,
  upload.single("food_category_image"),
  (req, res) => {
    Foodcategory.find({ food_category: req.body.food_category })
      .exec()
      .then(food => {
        if (food.length >= 1) {
          res.status(201).json({
            message_error: "Food Category already exists"
          });
        } else {
          const foodcategory = new Foodcategory({
            food_category: req.body.food_category,
            food_category_imagename: req.file.path
          });
          foodcategory
            .save()
            .then(result => {
              res.status(201).json({
                message: "Food Category Added Successfully"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: err
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: err
        });
      });
  }
);

//route for getting all food category
router.get("/", function(req, res) {
  Foodcategory.find()
    .sort({ createdAt: 1 }) //sort in ascending order
    .exec()
    .then(function(food) {
      res.send(food);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for deleting category
router.delete("/deleteFoodCategory/:id", auth, (req, res) => {
  Foodcategory.findById(req.params.id).then(food => {
    let path = food.food_category_imagename;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    food
      .delete()
      .then(function(result) {
        res.status(201).json({
          message: "Food Category Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

module.exports = router;
