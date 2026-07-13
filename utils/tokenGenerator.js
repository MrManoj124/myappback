// ============================================
// FILE: utils/tokenGenerator.js
// ============================================
const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT token for a user
 * @param {string} userId - MongoDB user _id
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your_jwt_secret_key_change_me',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

module.exports = { generateToken };
