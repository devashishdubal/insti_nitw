const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionTitle: { 
        type: String, 
        required: true 
    },
    questionBody: { 
        type: String 
    },
    questionTag: { 
        type: [String],
        required: true
    },
});

module.exports = mongoose.model("Question", questionSchema);
