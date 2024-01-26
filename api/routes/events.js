const router = require('express').Router();
const Event = require('../models/Event');
const Club = require('../models/Clubs');
const User = require('../models/User');

//register
router.post("/create-event", async (req, res) => {
    try {
        const club = await Club.findById(req.body.eventOrganizer);

        if(!club){
            return res.status(404).send("Club doesn't exist");
        }

        const newEvent = new Event({
            // EventId: req.body.userId,
            eventName: req.body.eventName,
            eventDescription: req.body.eventDescription,
            eventDateTime: req.body.eventDateTime,
            eventOrganizer: req.body.eventOrganizer,
            registerable: req.body.registerable,
            registrationLink: req.body.registrationLink,
            eventImage: req.body.eventImage,
            eventVenue: req.body.eventVenue,
            targetYear: req.body.targetYear
        });

        const event = await newEvent.save();
        res.status(200).json(event);
    } catch (error) {
       res.status(500).json(error);
    }
})

router.get("/getEventDetails/:id", async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id });
        if(!event){
            return res.status(404).send("The event does not exist")
        }

        res.status(200).send(event);

    } catch (error) {
       res.status(500).json(error);
    }
})

router.get("/getEventDetails/club/:club", async (req,res) => {
    try{
        const event = await Event.find({eventOrganizer: req.params.club})
        if(!event){
            return res.status(404).send("The event does not exist")
        }

        res.status(200).send(event);
    }
    catch(e) {
        res.status(500).json(e);
    }
})

router.put("/updateEventDetails/:id",async (req,res)=>{
    try{
        const event = await Event.findOne({ _id: req.params.id });

        if(!event){
            return res.status(404).send("The event does not exist")
        }

        event.eventName = req.body.eventName || event.eventName;
        event.eventDescription = req.body.eventDescription || event.eventDescription;
        event.eventDateTime = req.body.eventDateTime || event.eventDateTime;
        event.eventOrganizer = req.body.eventOrganizer || event.eventOrganizer;
        event.registerable = req.body.registerable || event.registerable;
        event.registrationLink = req.body.registrationLink || event.registrationLink;
        event.eventImage = req.body.eventImage || event.eventImage;
        event.eventVenue = req.body.eventVenue || event.eventVenue;
        event.targetYear = req.body.targetYear || event.targetYear;

        const updatedEvent = await event.save();

        res.status(200).send(updatedEvent)
    }catch(error){
        res.status(500).send(error);
    }
})

router.get("/recentEvents", async (req, res) => {
    try {
        const currentDate = new Date();
        const recentEvents = await Event.find({
            eventDateTime: { $lt: currentDate },
        }).populate('eventOrganizer');

        return res.status(200).send(recentEvents);
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

router.get("/upcomingEvents", async (req, res) => {
    try {
        const currentDate = new Date();
        const upcomingEvents = await Event.find({
            eventDateTime: { $gt: currentDate },
        }).populate('eventOrganizer');;

        return res.status(200).send(upcomingEvents);
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}) 

module.exports = router;