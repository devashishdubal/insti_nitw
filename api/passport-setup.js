const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = require('./models/User');


module.exports = function () {
    // Configure Passport to use Google strategy
    passport.use(new GoogleStrategy({
        clientID: '805111513571-ip1f800ie9lpt4gtnnghe8nnropk6qcr.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
        const allowedDomain = 'student.nitw.ac.in'; // Replace with your desired domain
        const userEmail = profile.emails[0].value;
        console.log(userEmail)
        // Check if user already exists in your database
        if (userEmail.endsWith(`@${allowedDomain}`)) {
            /*
            User.findOne({ userId: profile.id }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // Create new user in database
                    user = new User({
                        userId: profile.id,
                        // Add other user properties as needed
                    });
                    user.save((err) => {
                        if (err) console.error(err);
                        return done(err, user);
                    });
                } else {
                    // User already exists
                    return done(err, user);
                }
            });
            */
           console.log("Hellooooo")
           return done(null, profile)
        } else {
            return done(null, false, {message: "Please login with only student email"})
        }
    }));

    // Serialize user to store in session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session
    passport.deserializeUser((id, done) => {
        User.findOne({userId : id})
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
    });
};
