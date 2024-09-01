const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Club = require('./models/Clubs');
const User = require('./models/User')

module.exports = function () {
    passport.use('club-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const clubName = req.body.clubName;
            let club;
            let status = null;
            // console.log(clubName)
            const user1 = await User.findOne({email: email});
            club = await Club.findOne({ clubName: clubName });
            // console.log(club)
            if (!status) {
                // console.log(club.clubOwners.includes(user1._id))
                if (club.clubOwners.includes(user1._id)) {
                    status = "owner";
                }
                
            }
            if (!status) {
                // console.log(club.clubAdmins.includes(user1._id))
                if ((club.clubAdmins.includes(user1._id))){
                    status = "admin";
                }
            }
            if (!status){
                // console.log(club.clubMembers.includes(user1._id))
                if ((club.clubMembers.includes(user1._id)) ){
                    status = "member";
                }
            }
            // console.log(status);

            if (!status) {
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
