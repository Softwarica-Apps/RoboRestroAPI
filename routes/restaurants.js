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
    cb(null, "restaurant" + Date.now() + file.originalname);
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

const Restaurant = require("../models/restaurants");

//route for adding courses
router.post("/addRestaurant", upload.single("restaurant_image"), (req, res) => {
  const restaurant = new Restaurant({
    restaurant_name: req.body.restaurant_name,
    restaurant_latitude: req.body.restaurant_latitude,
    restaurant_longitude: req.body.restaurant_longitude,
    restaurant_description: req.body.restaurant_description,
    restaurant_rating: req.body.restaurant_rating,
    restaurant_imagename: req.file.path
  });
  restaurant
    .save()
    .then(result => {
      res.status(201).json({
        message: "Restaurant Added Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting all food
router.get("/restaurant", function(req, res) {
  Restaurant.find()
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(rest) {
      res.send(rest);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting course by id
router.get("/:id", function(req, res) {
  Restaurant.findById(req.params.id)

    .then(function(rest) {
      res.send(rest);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for updating course
router.put("/updateCourse/:id", auth, upload.single("course_image"), function(
  req,
  res
) {
  id = req.params.id.toString();
  if (req.file.path != null) {
    Course.findById(id).then(course => {
      let path = course.course_image;
      fs.unlink(path, err => {
        if (err) console.log(err);
      });
    });
  }

  Course.update(
    { _id: id },
    {
      $set: {
        course_name: req.body.course_name,
        course_duration: req.body.course_duration,
        course_price: req.body.course_price,
        course_modules: req.body.course_modules,
        course_desc: req.body.course_desc,
        course_image: req.file.path
      }
    }
  )
    .then(function(course) {
      res.status(201).json({
        message: "Course Updated Successfully"
      });
    })
    .catch(function(e) {
      res.send(e);
      console.log(e);
    });
});

//route for deleting course
router.delete("/deleteRestaurant/:id", auth, (req, res) => {
  Restaurant.findById(req.params.id).then(food => {
    let path = food.restaurant_imagename;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    food
      .delete()
      .then(function(result) {
        res.status(201).json({
          message: "Restaurant Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

module.exports = router;
