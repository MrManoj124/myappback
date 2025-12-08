const express = require('express');
const router = express.Router();
const {forgotPassword, resetPassword, changePassword} = require('../controllers/passwordController');
const {authenticate} = require('../middleware/auth');
const {emailValidation, resetPasswordValidation, changePasswordValidation, validate} = require('../middleware/validation');
const {emailLimiter} = require('../middleware/rateLimiter');


//@route POST /api/password/forgot
//@desc Request password reset
//@access Public
router.post('/forgot', emailValidation, validate, emailLimiter, forgotPassword);

//@route POST /api/password/reset
//@desc Reset password with token
//@access Public
router.post('/reset', resetPasswordValidation, validate, resetPassword);

//@route PUT/api/password/change
//@desc Change password for authenticated user
//@access Private
router.put('/change', authenticate, changePasswordValidation, validate, changePassword);    

module.exports = router;