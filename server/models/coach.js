const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  coachStatus: {
    type: Boolean,
    required: true,
    default: true,
  }
  // Thêm các trường khác nếu cần
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;
