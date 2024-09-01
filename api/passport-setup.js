const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const session = require("express-session");
const User = require('./models/User');

module.exports = function () {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const allowedDomain = 'student.nitw.ac.in';
            const userEmail = profile.emails[0].value;

            if (userEmail.endsWith(`@${allowedDomain}`)) {
                const rollNo = userEmail.slice(2, userEmail.indexOf('@'));

                // Extract year of study, course, and branch from the rollNo
                const yearOfStudy = 24 - parseInt(rollNo.slice(0, 2)) + 1; // Assuming 24xx represents the year of admission

                const branchCode = rollNo.slice(2, 5);  // 3rd to 5th characters represent the branch
                const courseCode = rollNo.charAt(5);   // 6th character represents the course

                // Mapping branch codes to branch names
                const branchMap = {
                    "csb": "Computer Science and Engineering",
                    "ecb": "Electronics and Communication Engineering",
                    "eeb": "Electrical and Electronics Engineering",
                    // Add more mappings as needed
                };

                // Mapping course codes to course names
                const courseMap = {
                    "0": "B.Tech",
                    "1": "M.Tech",
                    // Add more mappings as needed
                };

                const branch = branchMap[branchCode] || "Unknown Branch";
                const course = courseMap[courseCode] || "Unknown Course";

                const username = userEmail.split("@")[0];
                const firstname = profile.displayName.split(" ")[0];
                const lastname = profile.displayName.split(" ")[1];
                const photoURL = (profile.photos && profile.photos[0]) ? profile.photos[0].value : null;

                let user = await User.findOne({ userId: profile.id });

                if (user) {
                    // Update existing user's fields
                    user.yearOfStudy = yearOfStudy;
                    user.branch = branch;
                    user.course = course;
                    if (photoURL) user.profilePic = photoURL;

                    await user.save();
                    return done(null, user);
                } else {
                    // Create a new user if not found
                    const newUser = new User({
                        userId: profile.id,
                        username: username,
                        firstName: firstname,
                        lastName: lastname,
                        email: userEmail,
                        rollNo: rollNo,
                        profilePic: photoURL,
                        yearOfStudy: yearOfStudy,
                        branch: branch,
                        course: course,
                    });

                    await newUser.save();
                    return done(null, newUser);
                }
            } else {
                return done(null, false, { message: "Please login with only student email" });
            }
        } catch (error) {
            console.error('Error during Google authentication:', error);
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user, done) => {
        done(null, user);
    });
};