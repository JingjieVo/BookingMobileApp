const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController')

// Route to get total revenue
router.get('/total', revenueController.getTotalRevenue);

// Route to get daily revenue
router.get('/daily', revenueController.getDailyRevenue);

// Route to get monthly revenue
router.get('/monthly', revenueController.getMonthlyRevenue);

// Route to get yearly revenue
router.get('/yearly', revenueController.getYearlyRevenue);


module.exports = router;