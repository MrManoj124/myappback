// ============================================
// FILE: server.js (fixed route import paths)
// ============================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
require('dotenv').config();

// Import configurations
const connectDB = require('./config/db');
require('./config/passport');

// Import routes (fixed: userRoute.js & passwordRoute.js actual filenames)
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoute');
const emailRoutes = require('./routes/emailRoutes');
const passwordRoutes = require('./routes/passwordRoute');
const oauthRoutes = require('./routes/oauthRoutes');

// Import middleware
const { rateLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Passport middleware
app.use(passport.initialize());

// Apply rate limiter to API routes
app.use('/api/', rateLimiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/oauth', oauthRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'TruosTek Authentication API',
    version: '1.0.0',
    health: '/health'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

module.exports = app;