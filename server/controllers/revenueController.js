const Bill = require('../models/bill');

const revenueController = {
    getTotalRevenue: async (req, res) => {
        try {
            const totalRevenue = await Bill.aggregate([
                { $match: { billStatus: 'FINISHED' } },
                { $group: { _id: null, total: { $sum: "$price" } } }
            ]);
            res.status(200).json({ totalRevenue: totalRevenue[0]?.total || 0 });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    },

    getDailyRevenue: async (req, res) => {
        try {
            const { date } = req.query; // Expected format: 'YYYY-MM-DD'
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate() + 1);

            const dailyRevenue = await Bill.aggregate([
                { 
                    $match: { 
                        billStatus: 'FINISHED', 
                        createdAt: { $gte: start, $lt: end } 
                    } 
                },
                { $group: { _id: null, total: { $sum: "$price" } } }
            ]);
            res.status(200).json({ dailyRevenue: dailyRevenue[0]?.total || 0 });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    },

    getMonthlyRevenue: async (req, res) => {
        try {
            const { year, month } = req.query; // Expected format: 'YYYY', 'MM'
            const start = new Date(year, month - 1, 1);
            const end = new Date(year, month, 1);

            const monthlyRevenue = await Bill.aggregate([
                { 
                    $match: { 
                        billStatus: 'FINISHED', 
                        createdAt: { $gte: start, $lt: end } 
                    } 
                },
                { $group: { _id: null, total: { $sum: "$price" } } }
            ]);
            res.status(200).json({ monthlyRevenue: monthlyRevenue[0]?.total || 0 });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    },

    getYearlyRevenue: async (req, res) => {
        try {
            const { year } = req.query; // Expected format: 'YYYY'
            const start = new Date(year, 0, 1);
            const end = new Date(year, 12, 1);

            const yearlyRevenue = await Bill.aggregate([
                { 
                    $match: { 
                        billStatus: 'FINISHED', 
                        createdAt: { $gte: start, $lt: end } 
                    } 
                },
                { $group: { _id: null, total: { $sum: "$price" } } }
            ]);
            res.status(200).json({ yearlyRevenue: yearlyRevenue[0]?.total || 0 });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
};

module.exports = revenueController;
