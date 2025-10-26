const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });


const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const otpRoutes = require('./routes/otpRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const surveyVerificationRoutes = require('./routes/surveyVerificationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Vercel deployment
app.set('trust proxy', 1);

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3000',
      'https://real-estate-management-sand.vercel.app',
      'https://realestatemanagementserver.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // Preflight results will be cached for 24 hours
}));

// Handle OPTIONS requests for CORS preflight
app.options('*', cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for development - limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB Atlas using the dedicated connection function
connectDB();

// API Routes with and without /api prefix
const mountRoute = (path, router) => {
  app.use(`/api${path}`, router); // With /api prefix
  app.use(path, router); // Without /api prefix
};

mountRoute('/auth', authRoutes);
mountRoute('/properties', propertyRoutes);
mountRoute('/otp', otpRoutes);
mountRoute('/admin', adminRoutes);
mountRoute('/users', userRoutes);
mountRoute('/survey-verification', surveyVerificationRoutes);
mountRoute('/notifications', notificationRoutes);
mountRoute('/upload', uploadRoutes);

// Serve uploaded files statically
const uploadsPath = path.join(__dirname, process.env.UPLOAD_PATH || 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Real Estate Management System API',
    version: '1.0.0',
    status: 'Running'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

const server = app.listen(PORT, () => {
  console.log(`🌟 Real Estate Backend running on port ${PORT}`);
  console.log('WhatsApp OTP functionality will be disabled');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    const newPort = PORT + 1;
    app.listen(newPort, () => {
      console.log(`🌟 Real Estate Backend running on port ${newPort}`);
      console.log('WhatsApp OTP functionality will be disabled');
    });
  } else {
    console.error('Server error:', err);
  }
});