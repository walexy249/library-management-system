const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: { books },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAvailableBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ isBorrowed: false });

    res.status(200).json({
      status: 'success',
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, description } = req.body;
    const book = await Book.create({
      description,
      author,
      title,
    });

    res.status(201).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(400).json({
        status: 'fail',
        message: 'Book not found.There is no book with that ID',
      });

    if (book.isBorrowed)
      return res.status(400).json({
        status: 'fail',
        message: 'Book is borrowed already',
      });

    if (!req.body.borrower)
      return res.status(400).json({
        status: 'fail',
        message: 'Borrower is required',
      });

    book.isBorrowed = true;
    book.borrower = req.body.borrower;
    book.borrowedAt = new Date();

    await book.save();

    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(400).json({
        status: 'fail',
        message: 'Book not found.There is no book with that ID',
      });

    if (!book.isBorrowed)
      return res.status(400).json({
        status: 'fail',
        message:
          'Book is not borrowed. You can only return borrowed borrowed books',
      });

    book.isBorrowed = false;
    book.borrower = null;
    book.borrowedAt = null;

    await book.save();

    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
