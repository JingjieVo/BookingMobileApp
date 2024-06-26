const Trip = require('../models/trip');

const tripController = {
  // ADD TRIP
  addTrip: async (req, res) => {
    const { departure, departureTime, destination, date, driverId, coachId, tickets, estimatedTime, tripPrice } = req.body;

    try {
      const trip = new Trip({
        departure,
        departureTime,
        destination,
        date,
        driverId,
        coachId,
        tickets,
        estimatedTime,
        tripPrice,
      });

      await trip.save();
      res.status(201).json(trip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // GET ALL TRIPS
  getAllTrips: async (req, res) => {
    try {
      const trips = await Trip.find().populate('driverId').populate('coachId');
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  findTripsByDepartureAndDestination1: async (req, res) => {
    const { departure, destination, date } = req.query;

    try {
        // Tìm tất cả các chuyến xe phù hợp với điều kiện
        const trips = await Trip.find({
            departure: departure,
            destination: destination,
            date: date,
        }).populate('tickets').populate('driverId').populate('coachId'); // Populate thông tin của các vé trong chuyến xe

        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  },
  findTripsByDepartureAndDestination: async (req, res) => {
    const { departure, destination, date } = req.query;

    try {
        // Get current time plus 2 hours
        const currentTime = new Date();
        const timePlusTwoHours = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);

        // Find all trips matching the conditions
        const trips = await Trip.find({
            departure: departure,
            destination: destination,
            date: date,
        }).populate('tickets').populate('driverId').populate('coachId');

        // Filter trips to only include those departing at least 2 hours from now
        const filteredTrips = trips.filter(trip => {
            const [hours, minutes] = trip.departureTime.split(':').map(Number);
            const departureDate = new Date(date);
            departureDate.setHours(hours, minutes);

            return departureDate >= timePlusTwoHours;
        });

        res.status(200).json(filteredTrips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  },
  getTicketListOfTrip: async (req, res) => {
    const { tripId } = req.query;

    try {
        // Tìm chuyến xe dựa trên tripId và populate thông tin của các vé trong chuyến xe
        const trip = await Trip.findById(tripId).populate('tickets');
        
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Trả về danh sách các vé của chuyến xe
        res.status(200).json(trip.tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  },
  deleteTrip: async (req, res) => {
    const {
        departure, 
        departureTime,
        destination,
        date,
        driverId,
        coachId,
        estimatedTime,
        tripPrice
     } = req.query;
     try {
        const trip = await Trip.findOneAndDelete({departure : departure, departureTime : departureTime, destination : destination, date : date , driverId : driverId, coachId : coachId, estimatedTime : estimatedTime, tripPrice : tripPrice})
        res.status(200).json({ message: trip});
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
     }

  }
};
module.exports = tripController;
