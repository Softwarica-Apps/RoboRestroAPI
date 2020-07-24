const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodCategorySchema = new Schema(
  {
    food_category: {
      type: String
    },
    food_category_imagename: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Foodcategory = mongoose.model("Foodcategory", foodCategorySchema);
module.exports = Foodcategory;
