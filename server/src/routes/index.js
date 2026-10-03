const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const portfolioRoutes = require('../modules/portfolios/portfolio.routes');
const githubRoutes = require('../modules/github/github.routes');
const uploadRoutes = require('../modules/uploads/upload.routes');
const adminRoutes = require('../modules/admin/admin.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/github', githubRoutes);
router.use('/uploads', uploadRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
