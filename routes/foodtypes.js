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
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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

const Foodtype = require("../models/foodtypes");

//route for adding courses
router.post(
  "/addFoodType",
  auth,
  upload.single("food_type_image"),
  (req, res) => {
    const foodtype = new Foodtype({
      food_type: req.body.food_type,
      food_type_imagename: req.file.path
    });
    foodtype
      .save()
      .then(result => {
        res.status(201).json({
          message: "Food Type Added Successfully"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: err
        });
      });
  }
);

//route for getting all courses
router.get("/", function(req, res) {
  Foodtype.find()
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(food) {
      res.send(food);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for deleting category
router.delete("/deleteFoodType/:id", auth, (req, res) => {
  Foodtype.findById(req.params.id).then(food => {
    let path = food.food_type_imagename;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    food
      .delete()
      .then(function(result) {
        res.status(201).json({
          message: "Food Type Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

module.exports = router;
