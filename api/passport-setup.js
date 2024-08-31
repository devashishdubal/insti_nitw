/* `const passport = require('passport');` is importing the Passport module in Node.js. Passport is a
popular authentication middleware for Node.js that provides a simple and modular way to authenticate
users in web applications. This line allows the code to use the functionalities provided by the
Passport module, such as defining authentication strategies and handling user authentication. */
const passport = require('passport');
/* The line `const GoogleStrategy = require('passport-google-oauth20').Strategy;` is importing the
Google OAuth 2.0 authentication strategy provided by the `passport-google-oauth20` module. This
strategy allows the application to authenticate users using their Google accounts. By importing and
configuring this strategy, the application can enable users to log in using their Google credentials
and access protected resources within the application. */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
/* The line `const User = require('./models/User');` is importing the User model from the
'./models/User' file. In a Node.js application, models are often used to represent data structures
and interact with a database. By requiring the User model, the code gains access to functionalities
related to the User entity, such as creating new user instances, querying user data from the
database, and saving user information. */
const User = require('./models/User');

module.exports = function () {
    // Configure Passport to use Google strategy
    /* This code snippet is configuring Passport to use the Google OAuth 2.0 authentication strategy.
    Here's a breakdown of what each parameter in `passport.use(new GoogleStrategy({ ... })` is
    doing: */
    passport.use(new GoogleStrategy({
        /* `clientID: process.env.GOOGLE_CLIENT_ID,` is setting the client ID for the Google OAuth 2.0
        authentication strategy. The `process.env.GOOGLE_CLIENT_ID` part is accessing the
        environment variable `GOOGLE_CLIENT_ID` which should contain the client ID provided by
        Google when setting up OAuth 2.0 authentication. This client ID is necessary for the
        application to authenticate with Google's OAuth service and establish the identity of the
        application when making requests for user authentication. */
        clientID: process.env.GOOGLE_CLIENT_ID,
        /* `clientSecret: process.env.GOOGLE_CLIENT_SECRET,` is setting the client secret for the
        Google OAuth 2.0 authentication strategy. The `process.env.GOOGLE_CLIENT_SECRET` part is
        accessing the environment variable `GOOGLE_CLIENT_SECRET` which should contain the client
        secret provided by Google when setting up OAuth 2.0 authentication. This client secret is a
        confidential piece of information that is used in conjunction with the client ID to
        authenticate the application with Google's OAuth service securely. It helps verify the
        identity of the application when making requests for user authentication. */
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        /* The `callbackURL: 'http://localhost:8000/auth/google/callback',` line is setting the
        callback URL for the Google OAuth 2.0 authentication strategy. When a user successfully
        authenticates with Google using OAuth 2.0, Google will redirect the user back to this
        callback URL along with the authentication information. This URL is where the application
        will handle the callback from Google after the user has authenticated, allowing the
        application to retrieve the necessary information to complete the authentication process and
        potentially redirect the user to the appropriate page within the application. */
        callbackURL: 'http://localhost:8000/auth/google/callback',
        /* The `scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],` line is
        setting the scope of access requested by the application when authenticating with Google
        using OAuth 2.0. */
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    },
    /* The `async (accessToken, refreshToken, profile, done) => {` function is defining an asynchronous
    callback function that is used as the callback handler when a user successfully authenticates
    with Google using OAuth 2.0. Here's a breakdown of what this function is doing: */
    async (accessToken, refreshToken, profile, done) => {
        const allowedDomain = 'student.nitw.ac.in'; // Only students of NITW are allowed to access this website
        /* `const userEmail = profile.emails[0].value;` is extracting the email address of the
        authenticated user from the `profile` object obtained during the Google OAuth 2.0
        authentication process. You can refer to the structure of the 'profile' object online.*/
        const userEmail = profile.emails[0].value;

        // Check if user already exists in your database
        if (userEmail.endsWith(`@${allowedDomain}`)) { /// Checks if the email used for login is a student email
            let rollNo = userEmail.slice(2, userEmail.indexOf('@')); /// Extracts roll number from email
            /* As we know, all NITW Emails have a certain format. The roll number of the students is typically
            written from the 2nd index all the way until the '@' character.
            */

            // These are basic JS split operations to extract information from profile. Refer
            // to profile structure online
            let username = userEmail.split("@")[0];
            let firstname = profile.displayName.split(" ")[0]
            let lastname = profile.displayName.split(" ")[1]
            let photoURL = profile.photos[0].value;

            // This is to check if the User already exists online
            const userExists = await User.findOne({ userId: profile.id });
            if (userExists) {
                /* The line `return done(null, {role: true, user: userExists, accessToken:
                accessToken})` is a part of the callback function used in the Google OAuth 2.0
                authentication strategy when a user successfully authenticates with Google. It
                signifies the end of the async function and the control is passed onto the next
                function */
                return done(null, {role: true, user: userExists, accessToken: accessToken})
            }
            
            /// Creates a new User object
            const newUser = new User({
                userId: profile.id,
                username: username,
                firstName: firstname,
                lastName: lastname,
                email: userEmail,
                rollNo: rollNo,
                profilePic: photoURL,
            });
            
            /// The new user is saved in the table
            await newUser.save();
            return done(null, {role: true, user: newUser, accessToken: accessToken})
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
        done(null, user);
    });
};
