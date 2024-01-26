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

app.use(
    cors({
        origin:"http://localhost:3000",
        methods:"GET,POST,PUT,DELETE,PATCH",
        credentials: true
    }
))

app.use(session({
    secret : 'mysecret',
    resave : true,
    saveUninitialized : true,
}))

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

app.get('/login-success', (req, res) => {
    res.status(200).send("Login success");
})

app.get('/login-failure', (req, res) => {
    res.status(200).send("Login failure");
})

app.get("/auth/google", 
    passport.authenticate('google', {scope: ['profile', 'email']}),
    (req, res) => {
        res.redirect('/login-success');
    }
)

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login-failure'}),
    (req, res) => {
        res.redirect("/login-success")
    }
)

app.get('/user', (req, res) => {
    res.json(req.user)
})

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