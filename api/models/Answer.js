const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answerId: { 
        type: String, 
        required: true 
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
