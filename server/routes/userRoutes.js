const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// POST: Đăng ký người dùng mới
router.post('/register', userController.addUser);

// POST: Đăng nhập
router.post('/login', userController.checkUser);

// GET: lấy tất cả người dùng
router.get('/', userController.getAllUsers);

//GET: lấy người dùng bằng id
router.get('/:id', userController.getAnUser);

module.exports = router;