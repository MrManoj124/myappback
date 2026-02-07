const express = require('express');
const router = express.Router();
const {register, login, logout} = require('../controllers/authController');
const {registerValidation, loginValidation, validate} = require('../middleware/validationMiddleware'); 
const {authLimiter} = require('../middleware/rateLimitMiddleware');

//Apply rate limiting to auth routes
router.use(authLimiter);


//@route POST /api/auth/register
//@desc Register a new user
//@access Public
router.post('/register', registerValidation, validate, register);

//@route POST /api/auth/login
//@desc Login user
//@access Public
router.post('/login', loginValidation, validate, login);

module.exports = router;

