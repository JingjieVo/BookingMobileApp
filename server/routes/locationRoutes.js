const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Định nghĩa các routes cho địa điểm
router.get('/', locationController.getAllLocations); // Lấy tất cả các địa điểm
router.post('/', locationController.createLocation); // Tạo một địa điểm mới
router.get('/search/:keyword', locationController.getLocationByName); // Route để tìm địa điểm theo tên
module.exports = router;
