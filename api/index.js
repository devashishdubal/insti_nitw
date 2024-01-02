const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");

app.use(cors())

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
app.use("/api/auth", authRoute); //this is not needed (because line 35 refers to the same thing) and if you are seeing this just leave it alone with the comment i will correct it when this branch is merged but you should use the other authroute v1 one in the axios command
app.use("/api/clubs", clubRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users" , userRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running!");
});