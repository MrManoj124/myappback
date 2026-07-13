// ============================================
// FILE: routes/authRoutes.js (fixed import paths)
// ============================================
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');
const { authLimiter } = require('../middleware/rateLimiter');

// Apply rate limiting to auth routes
router.use(authLimiter);

//@route POST /api/auth/register
//@desc  Register a new user
//@access Public
router.post('/register', registerValidation, validate, register);

//@route POST /api/auth/login
//@desc  Login user
//@access Public
router.post('/login', loginValidation, validate, login);

//@route POST /api/auth/logout
//@desc  Logout user
//@access Private
router.post('/logout', logout);

module.exports = router;
