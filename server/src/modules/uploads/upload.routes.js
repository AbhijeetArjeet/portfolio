const express = require('express');
const uploadController = require('./upload.controller');
const { authenticate } = require('../../middleware/auth');
const { rateLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

const uploadLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 30 });

router.post('/', authenticate, uploadLimiter, uploadController.uploadMiddleware, uploadController.handleUpload);

module.exports = router;
