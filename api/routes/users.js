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

router.put("/updateVisibility/:id", async (req, res) => {
  try {
    const username = req.params.id;
    const { privateProfile } = req.body; 

    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { privateProfile: privateProfile },
      { new: true } // returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'Private profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;