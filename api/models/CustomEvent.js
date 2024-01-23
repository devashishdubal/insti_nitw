const mongoose = require("mongoose")

const customEventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    eventDateTime: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('CustomEvent', customEventSchema)