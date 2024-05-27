// routes/billRoutes.js
const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

// Tạo mới một Bill
router.post('/', billController.addBill);

// Lấy tất cả các Bills
router.get('/', billController.getAllBills);

// Lấy Bill theo ID
router.get('/:id', billController.getBillById);

// Cập nhật Bill
router.put('/:id', billController.updateBill);

// Xóa Bill
router.delete('/:id', billController.deleteBill);

module.exports = router;
