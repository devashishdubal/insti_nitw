/* This code snippet is setting up a Node.js server using Express framework along with various
middleware and dependencies. Here's a breakdown of what each part is doing: */
const express = require("express"); // express backend framework
const passport = require("passport"); /// Node.js Authentication middleware library (for sign in with google)
const session = require("express-session"); //This module is commonly used for managing user sessions in Express.js 
//applications.

const cors = require('cors');/// The `cors` module is commonly used to enable Cross-Origin Resource Sharing (CORS) in web
// applications to allow requests from different origins.

const mongoose = require("mongoose"); ///This library is commonly used for interacting with MongoDB databases in JavaScript
//applications.

const dotenv = require("dotenv");  /// This library is commonly used for setting up environment variables for 
/// our application. This allows you to keep sensitive data like API keys, 
//database credentials, and other configuration variables out of your source code for security purposes

const passportSetup = require("./passport-setup"); /// importing our student authentication middleware written in another file
const passportClubSetup = require("./passport-club-setup") /// importing our club authentication middleware written in another file 

/* 
Status codes returned in the responses of various API endpoints are mostly in line with
RESTFul API Practices
*/


// Creating our express application
const app = express();

/* The `app.use(session({ ... }))` middleware in the provided code snippet is setting up session
management for the Express application. Here's a breakdown of the options being passed to the
`session` middleware: */
app.use(session({
    /* The `secret: 'my-secret-key'` in the `session` middleware configuration is setting a secret key
    used to sign the session ID cookie. This secret key is used to encrypt the session data stored
    on the client-side and prevent tampering or unauthorized access to the session data. */
    secret: 'my-secret-key',
    /* The `resave: true` option in the `session` middleware configuration indicates that the session
    data should be saved back to the session store even if the session was never modified during the
    request. */
    resave: true,
    /* The `saveUninitialized: false` option in the `session` middleware configuration indicates that
    the session will not be saved for a session that is uninitialized. In other words, if a session
    is new and has not been modified during the request, it will not be saved to the session store. */
    saveUninitialized: false,
    /* The `cookie` object within the `session` middleware configuration is used to define settings
    related to the session cookie that is stored on the client-side. Here's a breakdown of the
    properties being set: */
    cookie: {
        //httpOnly: true,
        //maxAge: 5 * 60 * 60 * 24 * 1000, // 5 days
        /* The `secure: false` option within the `session` middleware configuration is used to specify
        whether the session cookie should be set with the `Secure` attribute or not. */
        secure: false
    },
}));

/* The `app.use(cors(...))` middleware in the provided code snippet is configuring Cross-Origin
Resource Sharing (CORS) for the Express application.  */
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true
    }
))

app.use(passport.initialize());
app.use(passport.session());
// const User = require("./models/User");

/* Here we our importing all of our routes. We have separated routes pertaining to
clubs, users, events, forums and posts into different modules for better code readability */
const clubRoute = require("./routes/clubs")
const userRoute = require("./routes/users")
const eventRoute = require("./routes/events")
const forumRoute = require("./routes/forum")
const feedRoute = require("./routes/feed")
dotenv.config();

mongoose.connect(process.env.mongo_link); // connects to our mongodb database
app.use(express.json()); /* The above code is configuring an Express application to use the built-in middleware express.json().
This middleware is used to parse incoming requests with JSON payloads. */


/// Basic endpoint to see if our backend server is running without any complications
app.get("/", (req, res) => {
    try {
        return res.status(200).json("JSON Server is running");
    } catch (error) {
        console.log(error)
    }
})

/* The following endpoints are written and used by the passport.js authentication code
for verifying and signing in users with google authentication. For a better understanding, please
read passport-setup.js file in /api folder.
*/

/* This is the route which we redirect to incase of a login success*/
app.get("/login/success", (req, res) => {
    if (req.user) {
        res.redirect("http://localhost:3000/")
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

/* This is the route which we redirect to incase of a login failure */
app.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

/* When a user accesses
the "/auth/google/" endpoint, the code initiates the authentication process with Google using the
Passport.js library. It specifies that the authentication strategy to be used is 'google' and
requests access to the user's profile, email, and Google Calendar. */
app.get("/auth/google/",
    passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'] })
)

/* The below code is setting up a route for handling the callback after a user authenticates with
Google. When a user is redirected to the '/auth/google/callback' endpoint, the code uses Passport.js
to authenticate the user using the 'google' strategy. If the authentication fails, the user is
redirected to 'http://localhost:3000/'. If the authentication is successful, the user is redirected
to '/login/success'. */
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
    (req, res) => {
        res.redirect("/login/success")
    }
)

/* When a GET request is
made to the '/user' endpoint, the server will respond with a status code of 200 and send the data
stored in the `req.user` object back to the client. */
app.get('/user', (req, res) => {
    res.status(200).send(req.user)
})

/* The below code is a route handler for the "/logout" endpoint in a Node.js application using Express
framework. When a user accesses this endpoint, it logs out the current user session. */
app.get('/logout', (req, res) => {
    const role = req.user.role;
    req.logout(() => {
        if (role === true) res.redirect("http://localhost:3000/")
        else res.redirect("http://localhost:3000/clubLogin")
    });
});

/* The below code is a route handler in a Node.js application using Express framework. It is handling a
GET request to the '/auth/check-session' endpoint. */
app.get('/auth/check-session', (req, res) => {
    if (req.isAuthenticated()) {
        // If the user is authenticated, return user details
        return res.json(req.user);
    } else {
        // If the user is not authenticated, return an empty object
        return res.json({});
    }
});



// club login backend left

// club login developed by Deva, should ideally be documented by him
app.post('/club/login',
    passport.authenticate('club-local', { failureRedirect: '/', failureMessage: true }),
    function (req, res) {
        res.status(200).send({ success: true, message: "Logging in!" })
    });

const Reminder = require("./models/Reminders"); 
const { createOAuth2Client, createEvent } = require("./calendar_api_setup")


/**
 * The function `convertToISO` takes a date string in the format "dd/mm/yyyy" and converts it to an ISO
 * string format.
 * @param dateString - The `dateString` parameter should be a string representing a date in the format
 * "DD/MM/YYYY", where DD is the day, MM is the month, and YYYY is the year. For example, "25/12/2022"
 * represents December 25, 2022.
 * @returns The function `convertToISO` takes a date string in the format "dd/mm/yyyy", splits it into
 * day, month, and year, creates a new Date object using the year, month, and day, and then converts
 * the Date object to an ISO string. The function returns the ISO string representation of the input
 * date.
 */
function convertToISO(dateString) {
    // Split the input date string into day, month, and year
    const [day, month, year] = dateString.split('/');
    // Create a new Date object using the year, month, and day
    const isoDate = new Date(`${year}-${month}-${day}`);
    // Convert the Date object to an ISO string
    return isoDate.toISOString();
}

function convertToString(dateString) {
    const [day, month, year] = dateString.split('/');
    // Create a new Date object using the year, month, and day
    const dateStr = new Date(`${year}-${month}-${day}`);
    return dateStr;
}

/**
 * The function `ensureAuthenticated` checks if a user is authenticated and returns an error message if
 * not.
 * @param req - The `req` parameter represents the request object in Express.js. It contains
 * information about the HTTP request that comes from the client, such as headers, parameters, body,
 * and more. In this context, `req.isAuthenticated()` is likely a method provided by a middleware like
 * Passport.js to check if a
 * @param res - The `res` parameter in the `ensureAuthenticated` function stands for the response
 * object in Express.js. It is used to send a response back to the client making the request. In this
 * function, if the user is not authenticated, a 401 status code along with a JSON response containing
 * the appropriate message
 * @param next - The `next` parameter in the `ensureAuthenticated` function is a callback function that
 * is used to pass control to the next middleware function in the stack. When `next()` is called, it
 * tells Express to move to the next middleware in the chain.
 * @returns The `next()` function is being returned if the user is authenticated.
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User not authenticated' });
}

/* The `app.post("/schedule-reminder", ensureAuthenticated, async (req, res) => { ... })` route in the
provided code snippet is responsible for handling the creation of reminders for events. Here's a
breakdown of what this route is doing: */
app.post("/schedule-reminder", ensureAuthenticated, async (req, res) => {
    try {
        //create new reminder in the database
        const { userId, eventDateTime, event, email } = req.body; // get from the frontend
        const today = new Date(); // Get current date and time
        // Set the time part to midnight to compare just the dates
        today.setHours(0, 0, 0, 0); 
        today.setHours(0, 0, 0, 0);

        /* The code snippet `if (convertToString(eventDateTime) < today) { ... }` is checking if the
        event date and time provided in the `eventDateTime` variable is in the past compared to the
        current date and time represented by the `today` variable. */
        if (convertToString(eventDateTime) < today) {
            return res.status(409).json({ message: 'Cannot set reminder for a past date.' })
        }
        /* The code snippet you provided is checking whether a user has already set a reminder for a
        specific event or if the event has already happened before attempting to schedule a new
        reminder.  */
        const alreadySent = await Reminder.find({ userId: userId, event: event });
        if (alreadySent.length > 0) {
            return res.status(200).json({ message: 'Reminder already set!' })
        }

        /* The code snippet `const iso_date = convertToISO(eventDateTime);` is converting the
        `eventDateTime` string, which represents a date in the format "dd/mm/yyyy", into an ISO
        string format using the `convertToISO` function defined earlier in the code. This conversion
        involves splitting the input date string into day, month, and year components, creating a
        new Date object using these components, and then converting the Date object to an ISO string
        format. */
        const iso_date = convertToISO(eventDateTime);
        /* The `eventDetails` constant is creating an object that holds details related to an event
        reminder. */
        const eventDetails = {
            startDateTime: iso_date,
            endDateTime: iso_date,
            email: email,
        };

        /* The code snippet `const reminder = new Reminder({ userId: userId, eventDateTime: iso_date,
        event: event })` is creating a new instance of a `Reminder` model or schema with specific
        properties set.*/
        const reminder = new Reminder({
            userId: userId,
            eventDateTime: iso_date,
            event: event
        })

        /* This code snippet is related to setting up a reminder on a Google Calendar for a specific
        event. Here's a breakdown of what each part is doing: */
        /* The line `const oAuth2Client = createOAuth2Client(req.user.accessToken);` is creating an
        OAuth2 client using the access token obtained from the `req.user` object.  */

        /// The functions createOAuth2Client and createEvent are defined in ./calender_api_setup.js. 
        /// Please refer there

        const oAuth2Client = createOAuth2Client(req.user.accessToken);
        try {
            /* The line `const rem = await reminder.save();` is saving a new reminder object to the
            database using Mongoose. */
            const rem = await reminder.save();
            /* The line `const calendar_event = await createEvent(oAuth2Client, eventDetails);` is
            invoking a function `createEvent` asynchronously and passing two arguments to it:
            `oAuth2Client` and `eventDetails`. */
            const calendar_event = await createEvent(oAuth2Client, eventDetails);
            return res.status(200).json({ message: 'Reminder set on Google Calendar.' })
        } catch (error) {
            return res.status(500).json({ message: 'Some error has occurred!' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Some error has occurred!' })
    }
})

//routes
/* The above code is setting up routes for different API endpoints in a Node.js application using
Express framework. Each `app.use` statement specifies a base URL path followed by a specific route
handler for that path. */
app.use("/api/v1/clubs", clubRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/forum", forumRoute);
app.use("/api/v1/feed/", feedRoute);

passportSetup();
passportClubSetup();

app.listen(8000 || process.env.PORT, () => {
    console.log("Backend server is running!");
});