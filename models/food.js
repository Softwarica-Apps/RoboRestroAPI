const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    food_name: {
      type: String,
      //required: true
    },
    food_category: {
      type: String,
      //required: true
    },
    food_type: {
      type: String,
    },
    food_price: {
      type: Number,
    },
    food_description: {
      type: String,
    },
    food_imagename: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("food", foodSchema);
module.exports = Food;
