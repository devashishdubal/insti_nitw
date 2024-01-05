const router = require('express').Router();
const User = require('../models/User');

//check if a user exists
router.get("/exist/:id",async (req,res) => {
    try{
        const user = await User.findOne({username: req.params.id});
        if(user){
            return res.status(201).json("username already exists");
        }
        else{
            return res.status(200).json("username is available");
        }
    }catch (err){
        res.status(500).json(err);
    }
})

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

module.exports = router;