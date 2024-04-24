const mongoose = require('mongoose');
const Ticket = require('./ticket');
const tripSchema = new mongoose.Schema({
  departure: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }],
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach'
  },
  estimatedTime: { // Ước lượng thời gian cho chuyến xe
    type: Number,
    required: true
  },
  tripPrice: {
    type: Number,
    required: true
  }
  
  
});

tripSchema.pre('save', async function(next) {
  const trip = this;
  if (!trip.isNew) { // Chỉ thực hiện nếu đây là một chuyến xe mới
    return next();
  }
  
  try {
    const createdTickets = await Ticket.create([
      { tripId : trip._id ,seatCode: '1A' }, { tripId : trip._id , seatCode: '2A' }, { tripId : trip._id , seatCode: '3A' }, { tripId : trip._id , seatCode: '4A' }, { tripId : trip._id , seatCode: '5A' },
      { tripId : trip._id , seatCode: '6A' }, { tripId : trip._id , seatCode: '7A' }, { tripId : trip._id , seatCode: '8A' }, { tripId : trip._id , seatCode: '9A' }, { tripId : trip._id , seatCode: '10A' },
      { tripId : trip._id , seatCode: '1B' }, { tripId : trip._id , seatCode: '2B' }, { tripId : trip._id , seatCode: '3B' }, { tripId : trip._id , seatCode: '4B' }, { tripId : trip._id , seatCode: '5B' },
      { tripId : trip._id , seatCode: '6B' }, { tripId : trip._id , seatCode: '7B' }, { tripId : trip._id , seatCode: '8B' }, { tripId : trip._id , seatCode: '9B' }, { tripId : trip._id , seatCode: '10B' }
    ]);

    trip.tickets = createdTickets.map(ticket => ticket._id);
    next();
  } catch (error) {
    next(error);
  }
});
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
