const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");

// const User = require("./models/User");

const authRoute = require("./routes/auth")

//app.use("/images", express.static(path.join(__dirname, "public/images")));

dotenv.config();

mongoose.connect(process.env.mongo_link,{useNewUrlParser: true});
app.use(express.json());



app.get("/", (req, res) => {
    try {
        return res.status(200).json("JSON Server is running");
    } catch (error) {
        console.log(error)
    }
})

//routes
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running!");
});