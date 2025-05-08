const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router.route('/available').get(bookController.getAvailableBooks);
router.route('/:id/borrow').post(bookController.borrowBook);
router.route('/:id/return').post(bookController.returnBook);

module.exports = router;
