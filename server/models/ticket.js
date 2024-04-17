const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  },
  available: { //Vé có còn khả dụng để mua hay không (ví dụ trước tg khởi hành khoảng 1 tiếng là không mua được nữa)
    type: Boolean,
    required: false,
    default: true,
  },
  isBought: {
    type: Boolean,
    required: false,
    default: false,
  },
  seatCode: {
    type: String,
    enum: ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A','1B', '2B', '3B', '4B', '5B', '6B', '7B', '8B', '9B', '10B'],
    required: true,
  }
});
ticketSchema.pre('save', function(next) {
  const ticket = this;
  const currentTime = new Date();
  const oneHourAhead = new Date(ticket.departureTime);
  oneHourAhead.setHours(oneHourAhead.getHours() - 1);

  if (currentTime >= oneHourAhead) {
    ticket.available = false;
  } else {
    ticket.available = true;
  }

  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;