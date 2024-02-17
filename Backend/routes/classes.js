const express = require('express');
const router = express.Router();
const Class = require('../models/class');

// Get all classes
router.get('/', async (req, res) => {
  try {
    
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single class
router.get('/:id', getClass, (req, res) => {
  res.json(res.yogaClass);
});

// Create a new class
router.post('/', async (req, res) => {
  const yogaClass = new Class({
    teacher: req.body.teacher,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    duration: req.body.duration,
  });

  try {
    const newClass = await yogaClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a class
router.patch('/:id', getClass, async (req, res) => {
  if (req.body.teacher != null) {
    res.yogaClass.teacher = req.body.teacher;
  }
  if (req.body.title != null) {
    res.yogaClass.title = req.body.title;
  }
  if (req.body.description != null) {
    res.yogaClass.description = req.body.description;
  }
  if (req.body.date != null) {
    res.yogaClass.date = req.body.date;
  }
  if (req.body.duration != null) {
    res.yogaClass.duration = req.body.duration;
  }
  try {
    const updatedClass = await res.yogaClass.save();
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a class
router.delete('/:id', getClass, async (req, res) => {
  try {
    await res.yogaClass.remove();
    res.json({ message: 'Deleted class' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClass(req, res, next) {
  let yogaClass;
  try {
    yogaClass = await Class.findById(req.params.id);
    if (yogaClass == null) {
      return res.status(404).json({ message: 'Cannot find class' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.yogaClass = yogaClass;
  next();
}

module.exports = router;
