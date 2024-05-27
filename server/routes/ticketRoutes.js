const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// POST: Tạo danh mục mới
router.post('/', ticketController.addTicket);

// GET: Lấy danh sách tất cả danh mục
router.get('/', ticketController.getAllTickets);

router.get('/available-tickets', ticketController.findAvailableTickets);

router.get('/findtrip/:ticketId', ticketController.findTripByTicketId);

router.put('/update-tripavailability', ticketController.findTripByTicketId);





module.exports = router;