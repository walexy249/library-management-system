const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
};

exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create({
      description: req.body.description,
      author: req.body.author,
      title: req.body.title,
    });

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
