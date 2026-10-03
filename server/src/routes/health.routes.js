const express = require('express');
const prisma = require('../config/prisma');

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Lightweight liveness check for Render and external uptime monitors (UptimeRobot, etc.)
 * @access  Public
 * @perf    Zero database queries, sub-millisecond response time
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'portfolio-api',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

/**
 * @route   GET /api/health/ready
 * @desc    Readiness check verifying database connectivity
 * @access  Public
 */
router.get('/ready', async (req, res) => {
  try {
    // Quick test query to ensure database connection pool is active
    await prisma.$queryRawUnsafe('SELECT 1');
    res.status(200).json({
      status: 'ready',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: 'Database connection failed'
    });
  }
});

module.exports = router;
