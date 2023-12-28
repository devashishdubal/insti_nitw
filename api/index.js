const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");

const User = require("./models/User");

//app.use("/images", express.static(path.join(__dirname, "public/images")));

dotenv.config();

mongoose.connect(process.env.mongo_link,{useNewUrlParser: true});
app.use(express.json());

app.post("/",async(req,res) => {
    try{
        console.log(req.body);
        const newUser = new User({
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
})


app.get("/", (req, res) => {
    try {
        return res.status(200).json("JSON Server is running");
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 8000, () => {
    console.log("Backend server is running!");
});