const express = require('express');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticate, getAllBooks);
router.get('/:id', authenticate, getBookById);
router.post('/', authenticate, authorize('admin'), createBook);
router.put('/:id', authenticate, authorize('admin'), updateBook);
router.delete('/:id', authenticate, authorize('admin'), deleteBook);

module.exports = router;
