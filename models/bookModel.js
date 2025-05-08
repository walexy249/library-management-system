const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: ["A book must have a tile", true],
  },
  author: {
    type: String,
    required: ["A book must have an author", true],
  },
  description: {
    type: String,
    required: ["A book must have a description", true],
  },
  isBorrowed: { type: Boolean, default: false },
  borrower: { type: String, default: null },
  borrowedAt: { type: Date, default: null },
});

const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;
