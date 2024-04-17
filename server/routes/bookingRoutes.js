const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route để đặt vé
router.post('/book-ticket', bookingController.bookTicket);

// Route để đặt vé cụ thể cho một chuyến xe
router.post('/book-ticket-w-seat', bookingController.bookSpecificTicket);

// Route để lấy danh sách các vé đã đặt của một người dùng
router.get('/user/:userId/booking-list', bookingController.getUserBookingList);

module.exports = router;
