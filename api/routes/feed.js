const router = require('express').Router();
const User = require('../models/User');
const Event = require('../models/Event');

// make a timeline
router.get("/getUserFeed/:userId", async (req, res) => {
    try {
        // make a timeline here
        const user = await User.findById(req.params.userId).populate('subscribedTo');
        const clubs = user.subscribedTo;

        const feed = [];
        const promises = clubs.map(async (club) => {
            const individualEvent = await Event.find({ eventOrganizer: club._id });

            individualEvent.map((event) => {
                const modifiedEvent = {
                    ...event,
                    eventOrganizer: club.clubName,
                    eventOrganizerLogo: club.clubLogo
                };
                feed.push(modifiedEvent);
            })
            return individualEvent;
        });
        
        await Promise.all(promises);

        res.status(200).send({message: "Success", data: feed});
    } catch (error) {
        res.status(500).send({message: "Internal server error", data: null})
    }
})

module.exports = router;