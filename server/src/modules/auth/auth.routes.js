const express = require('express');
const authController = require('./auth.controller');
const { validate } = require('../../middleware/validate');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('./auth.validator');
const { authenticate } = require('../../middleware/auth');
const { rateLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

// Sensitive auth routes are rate-limited
const authLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 20 });

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);

module.exports = router;
