const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Create a new booking
router.post('/', async (req, res) => {
  const { classId, userId, bookingDate } = req.body;

  try {
    const booking = new Booking({ classId, userId, bookingDate });
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bookings by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get booking by ID
router.get('/:id', getBooking, (req, res) => {
  res.json(res.booking);
});

// Update booking
router.patch('/:id', getBooking, async (req, res) => {
  if (req.body.classId != null) {
    res.booking.classId = req.body.classId;
  }
  if (req.body.userId != null) {
    res.booking.userId = req.body.userId;
  }
  if (req.body.bookingDate != null) {
    res.booking.bookingDate = req.body.bookingDate;
  }
  try {
    const updatedBooking = await res.booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete booking
router.delete('/:id', getBooking, async (req, res) => {
  try {
    await res.booking.remove();
    res.json({ message: 'Deleted booking' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking == null) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.booking = booking;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
