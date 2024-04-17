const Ticket = require('../models/ticket');

const ticketController = {
    // ADD TICKET
    addTicket: async (req, res) => {
        const {tripId, seatCode} = req.body;

        try {
            const ticket = new Ticket({
                tripId,
                seatCode
            });

            await ticket.save();
            res.status(201).json(ticket);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    // GET ALL TICKETS
    getAllTickets: async (req, res) => {
        try {
            const tickets = await Ticket.find();
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    findAvailableTickets: async (req, res) => {
        try {
            // Tìm tất cả các vé khả dụng và chưa được mua
            const availableTickets = await Ticket.find({ available: true, isBought: false });
            res.status(200).json(availableTickets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = ticketController;