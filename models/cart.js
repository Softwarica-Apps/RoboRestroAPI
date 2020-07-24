const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    phone: {
      type: String
    },
    food_name: {
      type: String
    },
    food_price: {
      type: String
    },
    food_quantity:{
      type:String
    },
    food_imagename:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
