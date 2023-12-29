const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            rollNo: req.body.rollNo
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;