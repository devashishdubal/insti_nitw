const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");
const cors = require("cors");
app.use(cors());

// const User = require("./models/User");

const authRoute = require("./routes/auth")
const clubRoute = require("./routes/clubs")
const userRoute = require("./routes/users")

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
app.use("/api/clubs", clubRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users" , userRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running!");
});