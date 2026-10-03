const express = require('express');
const adminController = require('./admin.controller');
const { authenticate, requireRole } = require('../../middleware/auth');

const router = express.Router();

// All admin routes require ADMIN role
router.use(authenticate, requireRole('ADMIN'));

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getUsers);
router.patch('/users/:id/status', adminController.updateUserStatus);
router.get('/portfolios', adminController.getPortfolios);
router.patch('/portfolios/:id/publish', adminController.togglePortfolioPublish);
router.get('/reports', adminController.getReports);
router.patch('/reports/:id', adminController.updateReportStatus);
router.get('/audit-logs', adminController.getAuditLogs);

module.exports = router;
