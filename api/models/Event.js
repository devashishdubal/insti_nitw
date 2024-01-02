const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // eventId: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventDateTime: { //under consideration
    type: Date,
    required: true,
  },
  eventOrganizer: {
    type: String,
    ref: 'Club', // Assuming Club is another mongoose model for organizers
    required: true,
  },
  registerable: {
    type: Boolean,
    default: false, // Set a default value if needed
  },
  registrationLink: {
    type: String,
  },
  eventImage: {
    type: String, // Assuming you store image URLs and not necessary cause default image will be placed
  },
  eventVenue: {
    type: String,
    required:true
  },
  targetYear: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);

