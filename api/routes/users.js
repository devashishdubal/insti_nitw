const router = require('express').Router();
const User = require('../models/User');

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getSession/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    //const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;