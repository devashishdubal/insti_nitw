const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    eventDateTime: {
        type: Date,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    sentCheck: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Reminder", reminderSchema);