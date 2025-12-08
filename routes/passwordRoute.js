const express = require('express');
const router = express.Router();
const {forgotPassword, resetPassword, changePassword} = require('../controllers/passwordController');
const {authenticate} = require('../middleware/auth');
const {emailValidation, resetPasswordValidation, changePasswordValidation, validate} = require('../middleware/validation');
const {emailLimiter} = require('../middleware/rateLimiter');
