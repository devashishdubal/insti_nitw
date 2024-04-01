const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Club = require('./models/Clubs');
const User = require('./models/User')

module.exports = function () {
    passport.use('club-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            let club;
            let status = "owner";
            const user1 = await User.findOne({email: email});
            club = await Club.findOne({ clubEmail: email });
            if (!club) {
                club = await Club.findOne({clubAdmins:{$in:[user1._id]}});
                status = "admin";
            }
            if (!club){
                club = await Club.findOne({clubMembers:{$in:[user1._id]}});
                status = "member";
            }

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
            return done(null, { role: false, user: {club:club, status:status} });
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
