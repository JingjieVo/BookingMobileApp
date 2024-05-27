const Ticket = require('../models/ticket');
const Trip = require('../models/trip');

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
    },
    findTripByTicketId : async (req, res) => {
        const ticketId = req.params.ticketId;
        try {
          const trip = await Trip.findOne({ tickets: ticketId }).populate('coachId').populate('driverId');
          if (!trip) {
            res.status(404).json({ message: 'Trip not found' });
          }
          res.status(200).json(trip);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateTicketAvailability: async (req, res) => {
        const { tripId, ticketId, available } = req.body;

        try {
            const ticket = await Ticket.findOne({ _id: ticketId, tripId: tripId });
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }

            ticket.available = available;
            await ticket.save();

            res.status(200).json({ message: 'Ticket availability updated', ticket });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ticketController;