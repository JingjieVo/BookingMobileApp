// controllers/billController.js
const Bill = require('../models/bill');

const billController = {
    // Tạo mới một Bill
    addBill: async (req, res) => {
        const { userId, tripId, price } = req.body;
        try {
            const newBill = new Bill({ userId, tripId, price });
            await newBill.save();
            res.status(201).json(newBill);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    // Lấy tất cả các Bills
    getAllBills: async (req, res) => {
        try {
            const bills = await Bill.find();
            res.status(200).json(bills);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy Bill theo ID
    getBillById: async (req, res) => {
        const { id } = req.params;
        try {
            const bill = await Bill.findById(id).populate('userId').populate('tripId');
            if (!bill) {
                return res.status(404).json({ message: 'Bill not found' });
            }
            res.status(200).json(bill);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Cập nhật Bill
    updateBill: async (req, res) => {
        const { id } = req.params;
        const { userId, tripId, price } = req.body;
        try {
            const updatedBill = await Bill.findByIdAndUpdate(id, { userId, tripId, price }, { new: true });
            if (!updatedBill) {
                return res.status(404).json({ message: 'Bill not found' });
            }
            res.status(200).json(updatedBill);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xóa Bill
    deleteBill: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedBill = await Bill.findByIdAndDelete(id);
            if (!deletedBill) {
                return res.status(404).json({ message: 'Bill not found' });
            }
            res.status(200).json({ message: 'Bill deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = billController;
