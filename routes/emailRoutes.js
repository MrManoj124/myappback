const express = require('express');
const router = express.Router();
const {verifyEmail, resendVerification} = require('../controllers/emailController');
const {emailValidation, validate} = require('../middleware/validation');
const {emailLimiter} = require('../middleware/rateLimiter');


// //@route POST /api/email/verify
// //@desc Verify user email
// //@access Public
// router.post('/verify',verifyEmail);

// //@route POST /api/email/resend
// //@desc Resend verification email
// //@access Public
// router.post('/resend',emailValidation, validate, emailLimiter, resendVerification);

// module.exports = router;