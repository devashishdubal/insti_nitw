const mongoose = require("mongoose");
const Answer = require('./Answer');

const forumSchema = new mongoose.Schema({
    questionTitle: { 
        type: String, 
        required: true 
    },
    questionDescription: { 
        type: String 
    },
    questionTag: { 
        type: String,
        required: true 
    },
    userId: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    answers: [Answer.schema],
    likes: { 
        type: Number, 
        default: 0 
    },
    dislikes: { 
        type: Number, 
        default: 0 
    },
});

module.exports = mongoose.model("Forum", forumSchema);
