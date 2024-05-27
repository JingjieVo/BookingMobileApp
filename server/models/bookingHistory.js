const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingList: [{
    guestName: {
      type: String,
      required: true,
    },
    identifyNumber: {
      type: String,
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    },
    dateBooking: {
      type: Date,
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip'
    },
    departureTime: String,
    date: String,
    departure: String,
    departureDescriptions: String,
    destination: String,
    destinationDescriptions: String,
    estimatedTime: String,
    arrivalTime: String,
    arrivalDate: String,
    driverName: String, 
    coachLicensePlate: String,
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill'
    }
  }],
});

const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

module.exports = BookingHistory;