const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");
const passportSetup = require("./passport-setup");

//invoking express
const app = express();

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 5 * 60 * 60 * 24 * 1000, // 5 days
    },
}));

app.use(
    cors({
        origin:"http://localhost:3000",
        methods:"GET,POST,PUT,DELETE,PATCH",
        credentials: true
    }
))

app.use(passport.initialize());
app.use(passport.session());
// const User = require("./models/User");

const authRoute = require("./routes/auth")
const clubRoute = require("./routes/clubs")
const userRoute = require("./routes/users")
const eventRoute = require("./routes/events")
const forumRoute = require("./routes/forum")
const feedRoute = require("./routes/feed")

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
        /*
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
        */
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

app.get("/auth/google", 
    passport.authenticate('google', {scope: ['profile', 'email']})
)

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: 'http://localhost:3000/'}),
    (req, res) => {
        res.redirect("/login/success")
    }
)

app.get('/user', (req, res) => {
    res.status(200).send(req.user)
})

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:3000/")
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

//routes
app.use("/api/v1/clubs", clubRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/forum", forumRoute);
app.use("/api/v1/feed/", feedRoute);

passportSetup();

app.listen(8000 || process.env.PORT, () => {
    console.log("Backend server is running!");
});