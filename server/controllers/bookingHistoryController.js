const BookingHistory = require('../models/bookingHistory');

const bookingHistoryController = {
    // ADD BOOKING HISTORY
    addBookingHistory: async (req, res) => {
        const { ticketId, userId, date } = req.body;

        try {
            const bookingHistory = new BookingHistory({
                ticketId,
                userId,
                dateBooking
            });

            await bookingHistory.save();
            res.status(201).json(bookingHistory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    // GET ALL BOOKING HISTORY
    getAllBookingHistory: async (req, res) => {
        try {
            const bookingHistories = await BookingHistory.find();
            res.status(200).json(bookingHistories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = bookingHistoryController;