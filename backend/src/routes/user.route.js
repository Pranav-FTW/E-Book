import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  getCurrentUser,
  getAllBooksByUser,
  adminLogin,
  getUserById,
} from '../controllers/user.controller.js';

import { verifyJWT } from '../middleware/auth.middlewares.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

router.post('/admin', adminLogin);

router.post('/logout', verifyJWT, logoutUser);

router.get('/current-user', verifyJWT, getCurrentUser);

// Get user profile (protected route)
router.get('/profile', verifyJWT, getUserProfile);

router.get('/book', verifyJWT, getAllBooksByUser);

router.get('/:id', getUserById)

export default router;
