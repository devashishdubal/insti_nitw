const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Club = require('./models/Clubs');

module.exports = function () {
    passport.use('club-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const club = await Club.findOne({ clubEmail: email });

            if (!club) {
                // User not found
                return done(null, false, { message: "Incorrect credentials!" });
            }

            // You should implement password hashing and verification here
            // For now, let's assume you have a simple comparison
            if (club.clubPassword !== password) {
                // Incorrect password
                return done(null, false, { message: "Incorrect credentials!" });
            }

            // Authentication successful
            return done(null, { role: false, user: club });
        } catch (err) {
            console.error("Error during authentication:", err);
            return done(err); // Pass the error to indicate authentication failure
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
