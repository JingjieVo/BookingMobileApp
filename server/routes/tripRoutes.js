const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Route để tạo một chuyến xe mới
router.post('/', tripController.addTrip);

// Route để lấy danh sách tất cả chuyến xe
router.get('/', tripController.getAllTrips);

// Route để tìm chuyến xe
router.get('/search', tripController.findTripsByDepartureAndDestination)

router.get('/tickets', tripController.getTicketListOfTrip)

router.delete('/', tripController.deleteTrip);

module.exports = router;
