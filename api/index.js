const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");
const passportSetup = require("./passport-setup");
const passportClubSetup = require("./passport-club-setup")

//invoking express
const app = express();

app.use(session({
    secret: 'my-secret-key',
    resave: true,
    saveUninitialized: false,
    cookie: {
        //httpOnly: true,
        //maxAge: 5 * 60 * 60 * 24 * 1000, // 5 days
        secure: false
    },
}));

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

const clubRoute = require("./routes/clubs")
const userRoute = require("./routes/users")
const eventRoute = require("./routes/events")
const forumRoute = require("./routes/forum")
const feedRoute = require("./routes/feed")
const pyqRoute = require("./routes/pyq");
//const notificationsRoute = require("./routes/notifications")
//app.use("/images", express.static(path.join(__dirname, "public/images")));
dotenv.config();

mongoose.connect(process.env.mongo_link); //, { useNewUrlParser: true } removed cuz deprecated
app.use(express.json());

app.get("/", (req, res) => {
    try {
        return res.status(200).json("JSON Server is running");
    } catch (error) {
        console.log(error)
    }
})

app.get("/login/success", (req, res) => {
    if (req.user) {
        res.redirect("http://localhost:3000/")
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

app.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

app.get("/auth/google/",
    passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'] })
)

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
    (req, res) => {
        res.redirect("/login/success")
    }
)

app.get('/user', (req, res) => {
    res.status(200).send(req.user)
})

app.get('/logout', (req, res) => {
    const role = req.user.role;
    req.logout(() => {
        if (role === true) res.redirect("http://localhost:3000/")
        else res.redirect("http://localhost:3000/clubLogin")
    });
});

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
app.post('/club/login',
    passport.authenticate('club-local', { failureRedirect: '/', failureMessage: true }),
    function (req, res) {
        res.status(200).send({ success: true, message: "Logging in!" })
    });

const Reminder = require("./models/Reminders"); 
const { createOAuth2Client, createEvent } = require("./calendar_api_setup")


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

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User not authenticated' });
}

app.post("/schedule-reminder", ensureAuthenticated, async (req, res) => {
    try {
        //create new reminder in the database
        const { userId, eventDateTime, event, email } = req.body; // get from the frontend
        const today = new Date(); // Get current date and time
        // Set the time part to midnight to compare just the dates
        today.setHours(0, 0, 0, 0); 
        date.setHours(0, 0, 0, 0);

        if (convertToString(eventDateTime) < today) {
            return res.status(409).json({ message: 'Cannot set reminder for a past date.' })
        }
        /// check if user are already set a reminder for this event, or if this event has already happened
        const alreadySent = await Reminder.find({ userId: userId, event: event });
        if (alreadySent.length > 0) {
            return res.status(200).json({ message: 'Reminder already set!' })
        }

        const iso_date = convertToISO(eventDateTime);
        const eventDetails = {
            startDateTime: iso_date,
            endDateTime: iso_date,
            email: email,
        };

        const reminder = new Reminder({
            userId: userId,
            eventDateTime: iso_date,
            event: event
        })

        const oAuth2Client = createOAuth2Client(req.user.accessToken);
        try {
            const rem = await reminder.save();
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
app.use("/api/v1/clubs", clubRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/forum", forumRoute);
app.use("/api/v1/feed/", feedRoute);
app.use("/api/v1/pyq/", pyqRoute);

passportSetup();
passportClubSetup();

app.listen(8000 || process.env.PORT, () => {
    console.log("Backend server is running!");
});