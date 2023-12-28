const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");

//app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());

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