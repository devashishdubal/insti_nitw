const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        default: "dummyUserId",
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    answerDescription: { 
        type: String 
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    dislikes: { 
        type: Number, 
        default: 0 
    },
});

module.exports = mongoose.model("Answer", answerSchema);
