const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    phone: {
      type: String
    },
    food_name: {
      type: String
    },
    rating: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
