const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodTypeSchema = new Schema(
  {
    food_type: {
      type: String,
    },
    food_type_imagename: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Foodtype = mongoose.model("food_type", foodTypeSchema);
module.exports = Foodtype;
