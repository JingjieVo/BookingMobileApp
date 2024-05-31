const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

// Route để tạo một xe khách mới
router.post('/', coachController.addCoach);

// Route để lấy danh sách tất cả các xe khách
router.get('/', coachController.getAllCoaches);

router.delete('/delete',coachController.deleteCoach);

module.exports = router;
