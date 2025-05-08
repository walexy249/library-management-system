const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
};

exports.getAvailableBooks = async (req, res, next) => {
  const books = await Book.find({ isBorrowed: false });

  res.status(200).json({
    status: 'success',
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
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    console.log(req.params.id);
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

    console.log('saving-----');

    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
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
      message: err,
    });
  }
};
