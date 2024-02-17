const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  teacher: String,
  title: String,
  description: String,
  date: Date,
  duration: Number,
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
