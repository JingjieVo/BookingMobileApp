const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController')


router.post('/sendemail', emailController.sendEmail); // Tạo một địa điểm mới
module.exports = router;
