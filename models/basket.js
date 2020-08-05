const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const basketSchema = new Schema(
  {
    table: {
      type: String,
    },
    food_name: {
      type: String,
    },
    food_price: {
      type: Number,
    },
    food_quantity: {
      type: Number,
      default: 1,
    },
    food_imagename: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Basket = mongoose.model("basket", basketSchema);
module.exports = Basket;
