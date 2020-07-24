const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    book_name: {
      type: String
      //required: true
    },
    book_author: {
      type: String
    },
    book_price: {
      type: String
    },
    book_description: {
      type: String
    },
    book_imagename: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
