const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const fs = require("fs");
const User = require("../models/users");

//route for registering users
router.post("/register", (req, res) => {
  User.find({ phone: req.body.phone })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(201).json({
          message_error: "Phone Number already exists"
        });
      } else {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          usertype: "user"
        });
        user
          .save()
          .then(result => {
            res.status(201).json({
              message_success: "Register Successful"
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
      res.status(500).json({
        message: err
      });
    });
});

//route for getting users details after login
router.get("/me", auth, function(req, res) {
  res.send(req.user);
});

//route for user login
router.post("/login", async function(req, res) {
  try {
    const user = await User.checkCrediantialsDb(
      req.body.phone,
      req.body.password
    );
    //const message = await user.message;
    if (user) {
      const token = await user.generateAuthToken();
      res.status(201).json({
        token: token,
        user: user,
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        usertype: user.usertype
      });
    } else {
      res.json({
        message: "Invalid"
      });
    }
  } catch (e) {
    console.log(e);
  }
});

//route for user logout
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status("201").json({
      message: "Success"
    });
  } catch (e) {
    res.status(500).send();
  }
});

//route for updatinng user in Android
router.put("/updateUser/:id", function(req, res) {
  uid = req.params.id;
  User.update(
    { _id: uid },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
      }
    }
  )
    .then(function(user) {
      res.status(201).json({
        message: "User Details Updated Successfully"
      });
    })
    .catch(function(e) {
      res.status(422).json({
        message: "Unable to Update:" + e
      });
    });
});

module.exports = router;
