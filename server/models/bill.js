// models/bill.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tripId: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
