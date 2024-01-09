const mongoose = require("mongoose");

const questionLikesSchema = new mongoose.Schema({
    likeId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    liked: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model("QuestionLikes", questionLikesSchema);
