const router = require('express').Router();
const User = require('../models/User');

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    const { password, updatedAt, ...other } = user._doc;
    console.log(other);
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;