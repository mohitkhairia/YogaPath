const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bookingDate: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
