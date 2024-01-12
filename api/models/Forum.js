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
    likes_users:  [{ type: String, ref: 'User' }],
    dislikes_users:  [{ type: String, ref: 'User' }]
});

forumSchema.index({questionTitle: 'text'})
forumSchema.index({questionDescription: 'text'})

module.exports = mongoose.model("Forum", forumSchema);
