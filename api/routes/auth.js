const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register
router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ userId: req.body.userId });

        if (userExists) {
            /*
            if (!userExists.firstName || !userExists.lastName || !userExists.branch) {
                return res.status(200).send({detailsPresent: false});
            }
            */

            return res.status(200).send("Welcome back");
        }

        const newUser = new User({
            userId: req.body.userId,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            rollNo: req.body.rollNo,
            profilePic: req.body.photoURL,
        });

        const user = await newUser.save();
        return res.status(200).json("Welcome");
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})

module.exports = router;