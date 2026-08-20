const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const enquiryRoutes = require('./routes/enquiryRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// ===============================
// Middleware
// ===============================

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan('dev'));

// CORS configuration - allows any localhost port dynamically and the configured CLIENT_URL(s)
const clientUrl = process.env.CLIENT_URL;
const allowedOrigins = clientUrl 
  ? clientUrl.split(',').map(url => url.trim().replace(/\/$/, '')) 
  : [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isLocal = origin.startsWith('http://localhost:') || 
                    origin.startsWith('https://localhost:') || 
                    origin.startsWith('http://127.0.0.1:') ||
                    origin === 'http://localhost' || 
                    origin === 'http://127.0.0.1' ||
                    origin === 'http://[::1]';
    if (isLocal || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all routes
app.use(limiter);

// ===============================
// Routes
// ===============================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'IFTECLABS API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to IFTECLABS API',
    version: '1.0.0',
    documentation: 'https://github.com/ifteclabs/api-docs',
  });
});

// API Routes
app.use('/api/enquiries', enquiryRoutes);

// ===============================
// Error Handling Middleware
// ===============================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global error handler (must be last)
app.use(errorMiddleware);

module.exports = app;
