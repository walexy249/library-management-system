const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router.get('/available', bookController.getAvailableBooks);
router.post('/:id/borrow', bookController.borrowBook);
router.post('/:id/return', bookController.returnBook);

module.exports = router;
