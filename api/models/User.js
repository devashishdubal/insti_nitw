const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rollNo: {
        type: String,
        unique: true,
    },
    privateProfile: {
        type: Boolean,
        default: true
    },
    profilePic: {
        type: String,
        default: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704153600&semt=ais"
    },
    instagramLink: {
        type: String,
    },
    linkedinLink: {
        type: String,
    },
    twitterLink: {
        type: String,
    },
    githubLink: {
        type: String,
    },
    aboutMe: {
        type: String,
    },
    branch: {
        type: String
    },
    mess: {
        type: Number,
        default: 1
    },
    // changed to object Id reference
    subscribedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
    likedQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum'
    }],
    dislikedQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum'
    }],
    ownerOf: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
    adminOf: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
    // ownerOf, adminOf arrays (so extra button is visible)
});

module.exports = mongoose.model("User", userSchema);