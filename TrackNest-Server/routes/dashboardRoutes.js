// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// All dashboard routes require authentication
router.use(authMiddleware);

// Dashboard overview data
router.get('/overview', dashboardController.getDashboardOverview);

// Recent activities
router.get('/activities', dashboardController.getRecentActivities);

// Ticket trends for chart
router.get('/ticket-trends', dashboardController.getTicketTrends);

// Deliverables list for table
router.get('/deliverables', dashboardController.getDeliverablesList);

module.exports = router;
