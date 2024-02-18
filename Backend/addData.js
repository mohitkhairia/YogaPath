const axios = require('axios');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/yoga_booking_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the schema for the Yoga Class model
const yogaClassSchema = new mongoose.Schema({
  title: String,
  description: String,
  teacher: String,
  date: Date
});

// Create a model based on the schema
const YogaClass = mongoose.model('YogaClass', yogaClassSchema);

// Function to fetch data from https://do.yoga and add it to the database
async function addData() {
  try {
    // Fetch data from https://do.yoga
    const response = await axios.get('https://do.yoga');
    const classes = response.data;

    // Iterate over fetched data and add it to the database
    for (const classData of classes) {
      const yogaClass = new YogaClass({
        title: classData.title,
        description: classData.description,
        teacher: classData.teacher,
        date: new Date(classData.date)
      });
      await yogaClass.save();
    }

    console.log('Data added to the database successfully.');
  } catch (error) {
    console.error('Error adding data to the database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
  }
}

// Call the addData function to start adding data to the database
addData();
