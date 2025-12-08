const express = require('express');
const router = express.Router();
const passport = require('passport');
const {generateToken} = require('../utils/tokengenerator');

