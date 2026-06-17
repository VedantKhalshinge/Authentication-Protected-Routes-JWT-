const express = require('express');
const { signup, login, logout, getProfile, getDashboard } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/dashboard', protect, getDashboard);

module.exports = router;
