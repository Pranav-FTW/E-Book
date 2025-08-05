import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getAllBooksForAdmin,
  makePublic
} from '../controllers/book.controller.js';
import { verifyJWT } from '../middleware/auth.middlewares.js';
import { verifyAdmin } from '../middleware/adminAuth.middlewares.js';

const router = express.Router();

// Create a new book (only authenticated users)
router.post('/', verifyJWT, createBook);

// Get all books (public)
router.get('/', getAllBooks);

// Get a single book by ID (public)
router.get('/:id', getBookById);

// Update a book (only authenticated users)
router.put('/:id', verifyJWT, updateBook);

// Delete a book (only authenticated users)
router.delete('/:id', verifyJWT, deleteBook);


router.post('/getbooks', verifyAdmin, getAllBooksForAdmin);
router.post('/makepublic', verifyAdmin, makePublic);

export default router;
