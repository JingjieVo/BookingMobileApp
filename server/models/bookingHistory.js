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
    }
  }],
});

const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

module.exports = BookingHistory;