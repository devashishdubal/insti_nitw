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
    async (accessToken, refreshToken, profile, done) => {
        const allowedDomain = 'student.nitw.ac.in'; // Replace with your desired domain
        const userEmail = profile.emails[0].value;
        // Check if user already exists in your database
        if (userEmail.endsWith(`@${allowedDomain}`)) {
            console.log(profile)
            let rollNo = userEmail.slice(2, userEmail.indexOf('@'));

            let username = userEmail.split("@")[0];
            let firstname = profile.displayName.split(" ")[0]
            let lastname = profile.displayName.split(" ")[1]
            let photoURL = profile.photos[0].value;
            const userExists = await User.findOne({ userId: profile.id });
        
            if (userExists) {
                return res.status(200).send("Welcome back");
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
    
            const user = await newUser.save();
            return res.status(200).json("Welcome");
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
