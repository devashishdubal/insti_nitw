const mongoose = require("mongoose");
const Answer = require('./answerModel');

const forumSchema = new mongoose.Schema({
    questionId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    questionTitle: { 
        type: String, 
        required: true 
    },
    questionDescription: { 
        type: String 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
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
