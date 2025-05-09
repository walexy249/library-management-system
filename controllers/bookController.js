const Book = require('../models/bookModel');

// Utility to send JSON responses
const sendResponse = (res, statusCode, status, data, message) => {
  const response = { status };
  if (message) response.message = message;
  if (data) response.data = data;
  res.status(statusCode).json(response);
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    sendResponse(res, 200, 'success', { books, results: books.length }, null);
  } catch (err) {
    sendResponse(res, 500, 'fail', null, err.message);
  }
};

exports.getAvailableBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ isBorrowed: false });
    sendResponse(res, 200, { books, results: books.length }, null);
  } catch (err) {
    sendResponse(res, 500, 'fail', null, err.message);
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
    sendResponse(res, 201, 'success', { book }, null);
  } catch (err) {
    sendResponse(res, 500, 'fail', null, err.message);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return sendResponse(
        res,
        400,
        'fail',
        null,
        'Book not found.There is no book with that ID'
      );

    if (book.isBorrowed)
      return sendResponse(res, 400, 'fail', null, 'Book is borrowed already');
    if (!req.body.borrower)
      return sendResponse(res, 400, 'fail', null, 'Borrower is required');

    book.isBorrowed = true;
    book.borrower = req.body.borrower;
    book.borrowedAt = new Date();

    await book.save();
    sendResponse(res, 200, 'success', { book }, null);
  } catch (err) {
    sendResponse(res, 400, 'fail', null, err.message);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return sendResponse(
        res,
        400,
        'fail',
        null,
        'Book not found.There is no book with that ID'
      );

    if (!book.isBorrowed)
      sendResponse(
        res,
        400,
        'fail',
        null,
        'Book is not borrowed. You can only return borrowed borrowed books'
      );

    book.isBorrowed = false;
    book.borrower = null;
    book.borrowedAt = null;

    await book.save();

    sendResponse(res, 200, 'success', { book }, null);
  } catch (err) {
    sendResponse(res, 400, 'fail', null, err.message);
  }
};
