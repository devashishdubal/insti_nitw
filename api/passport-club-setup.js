const passport = require("passport");
const LocalStrategy = require("passport-local")
const Club = require('./models/Clubs');

// hashing baadme dekhte hai

passport.use(new LocalStrategy(async function verify(email, password, cb) {
    const club = await Club.findOne({clubEmail: email, clubPassword: password});

    if (!club) {
        return cb(null, false, null);
    }

    return cb(null, false, {role: false, user: club});
}));