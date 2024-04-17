const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');


// Route để tạo một tài xế mới
router.post('/', driverController.addDriver);

// Route để lấy danh sách tất cả tài xế
router.get('/', driverController.getAllDrivers);

module.exports = router;

