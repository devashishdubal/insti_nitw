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

router.put("/updateProfile/:id",async (req,res)=>{
    // try{

    //     const user = await User.findOne({ username: req.params.id });

    //     if(!user){
    //         return res.status(404).send("The event does not exist")
    //     }

    //     event.eventName = req.body.eventName || event.eventName;
    //     event.eventDescription = req.body.eventDescription || event.eventDescription;
    //     event.eventDateTime = req.body.eventDateTime || event.eventDateTime;
    //     event.eventOrganizer = req.body.eventOrganizer || event.eventOrganizer;
    //     event.registerable = req.body.registerable || event.registerable;
    //     event.registrationLink = req.body.registrationLink || event.registrationLink;
    //     event.eventImage = req.body.eventImage || event.eventImage;
    //     event.eventVenue = req.body.eventVenue || event.eventVenue;
    //     event.targetYear = req.body.targetYear || event.targetYear;

    //     const updatedEvent = await event.save();

    //     res.status(200).send(updatedEvent)
    // }catch(error){
    //     res.status(500).send(error);
    // }
})

module.exports = router;