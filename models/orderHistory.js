const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

const orderHistorySchema = new Schema({
    
    table: {
          type: String,
        },
        food_name: {
          type: String,
        },
        food_quantity: {
          type: String,
        },
        food_price: {
          type: String,
        },
        date: {
          type: Date,
        },
        status: {
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

const OrderHistory = mongoose.model("orderHistory", orderHistorySchema);
module.exports = OrderHistory;