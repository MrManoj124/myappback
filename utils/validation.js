// ============================================
// FILE: utils/validation.js (CommonJS)
// ============================================

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Name validation
const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim();
};

module.exports = { isValidEmail, isValidPassword, isValidName, sanitizeInput };