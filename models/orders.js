const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    phone: {
      type: String
    },
    food_name: {
      type: String
    },
    food_quantity: {
      type: String
    },
    food_price: {
      type: String
    },
    date: {
      type: Date
    },
    status: {
      type: String
    },
    food_imagename: {
      type: String
    },
    payment_type: {
      type:String
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
