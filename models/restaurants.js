const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    restaurant_name: {
      type: String
      //required: true
    },
    restaurant_latitude: {
      type: String
    },
    restaurant_longitude: {
      type: String
    },
    restaurant_description: {
      type: String
    },
    restaurant_rating: {
      type: String
    },
    restaurant_imagename: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
