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
      const trips = await Trip.find().populate('tickets').populate('driverId');
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  findTripsByDepartureAndDestination: async (req, res) => {
    const { departure, destination, date } = req.query;

    try {
        // Tìm tất cả các chuyến xe phù hợp với điều kiện
        const trips = await Trip.find({
            departure: departure,
            destination: destination,
            date: date
        }).populate('tickets'); // Populate thông tin của các vé trong chuyến xe

        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
};

module.exports = tripController;
