const express = require('express');
const router = express.Router();
const bookingHistoryController = require('../controllers/bookingHistoryController');

// Route để thêm một lịch sử đặt vé mới
router.post('/', bookingHistoryController.addBookingHistory);

// Route để lấy danh sách tất cả lịch sử đặt vé
router.get('/', bookingHistoryController.getAllBookingHistory);



module.exports = router;
