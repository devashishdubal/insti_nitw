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


router.put("/updateProfile/:id",async (req,res)=>{
  try {
    const user = await User.findOne({ username: req.params.id });

    if (!user) {
        return res.status(404).send("The event does not exist");
    }

    user.username = req.body.username || user.username;
    user.instagramLink = req.body.instagramLink || user.instagramLink;
    user.linkedinLink = req.body.linkedinLink || user.linkedinLink;
    user.mess = req.body.mess || user.mess;
    user.twitterLink = req.body.twitterLink || user.twitterLink;
    user.githubLink = req.body.githubLink || user.githubLink;
    user.aboutMe = req.body.aboutMe || user.aboutMe;

    const updatedUser = await user.save();

    res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }

})

module.exports = router;