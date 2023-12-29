const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
         type: String, 
         unique: true, 
         required: true 
    },
    firstName: {
         type: String, 
         required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: {
         type: String, 
         required: true,
         unique:true
        },
    rollNo: { 
        type: String ,
        unique: true,
        required : true
    },
    subscribedTo: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Club' }],
    likedQuestions: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Forum' }],
    dislikedQuestions: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Forum' }],
});

module.exports = mongoose.model("User", userSchema);