const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config/env');
const healthRoutes = require('./routes/health.routes');
const apiRoutes = require('./routes/index');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow client to load uploaded images
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }
  })
);

// CORS configuration supporting credentials (cookies)
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

if (config.renderExternalUrl) {
  allowedOrigins.push(config.renderExternalUrl);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // In development/staging, accept origin; in production enforce allowlist
        if (!config.isProduction) {
          callback(null, true);
        } else {
          callback(new Error('Blocked by CORS policy'));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// 1. Health Monitoring Endpoints (Liveness & Readiness)
// Dedicated /api/health and alias /health for maximum Render compatibility
app.use('/api/health', healthRoutes);
app.use('/health', healthRoutes);

// 2. Versioned REST API
app.use('/api/v1', apiRoutes);

// Fallback 404 handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;
