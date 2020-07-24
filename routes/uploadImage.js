//for android only

var express = require("express");
var multer = require("multer");
var path = require("path");

var ImagefileName;
var storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    ImagefileName = "food" + file.originalname;
    callback(null, ImagefileName);
  }
});

var imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1024 * 1024 * 50 }
});

var router = express.Router();

//route for uploading image to folder
router.route("/").post(upload.single("food_image"), (req, res) => {
  //console.log(ImagefileName);
  var resPonseFilename = JSON.stringify({
    food_image: ImagefileName
  });
  //console.log(resPonseFilename);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(
      {
        food_image: ImagefileName
      },
      null,
      3
    )
  );
});

module.exports = router;
