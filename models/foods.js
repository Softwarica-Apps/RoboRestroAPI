const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    food_name: {
      type: String
      //required: true
    },
    food_category: {
      type: String
      //required: true
    },
    food_type: {
      type: String
    },
    food_price: {
      type: String
    },
    food_description: {
      type: String
    },
    food_imagename: {
      type: String
    },
    food_rating: {
      type: Number
    },
    food_review: {
      type: String
    },
    food_offer: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
