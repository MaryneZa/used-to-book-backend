const express = require('express');
const router  = express.Router()
const booksController = require('../controllers/booksController');
const authController = require('../controllers/authController');

router.get('/books', booksController.getAllBooks);
router.post('/book',authController.requireJWTAuth, booksController.createBook);

module.exports = router;