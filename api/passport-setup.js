const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const session = require("express-session");
const User = require('./models/User');

module.exports = function () {
    // Configure Passport to use Google strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        const allowedDomain = 'student.nitw.ac.in'; // Replace with your desired domain
        const userEmail = profile.emails[0].value;

        // Check if user already exists in your database
        if (userEmail.endsWith(`@${allowedDomain}`)) {
            let rollNo = userEmail.slice(2, userEmail.indexOf('@'));

            let username = userEmail.split("@")[0];
            let firstname = profile.displayName.split(" ")[0]
            let lastname = profile.displayName.split(" ")[1]
            let photoURL = profile.photos[0].value;
            const userExists = await User.findOne({ userId: profile.id });
        
            if (userExists) {
                return done(null, userExists)
            }
    
            const newUser = new User({
                userId: profile.id,
                username: username,
                firstName: firstname,
                lastName: lastname,
                email: userEmail,
                rollNo: rollNo,
                profilePic: photoURL,
            });
    
            await newUser.save();
            return done(null, newUser)
        } else {
            return done(null, false, {message: "Please login with only student email"})
        }
    }));

    // Serialize user to store in session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Deserialize user from session
    passport.deserializeUser(async (user, done) => {
        //const userBlob = await User.findOne({userId : id})
        //console.log(userBlob)
        done(null, user);
    });
};
