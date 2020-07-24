const mongoose = require("mongoose");

const url = process.env.MONGO_URI;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
});

connect.then(
  db => {
    console.log(
      "Connected to mongodb server at port 27017 with db name foodEx"
    );
  },
  err => {
    console.log(err);
  }
);
