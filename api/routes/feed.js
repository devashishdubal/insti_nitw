const User = require('../models/User');
const Event = require('../models/Event');

// make a timeline
router.get("/getUserFeed/:userId", async (req, res) => {
    try {
        // make a timeline here
        const user = await User.findOne({userId: req.params.userId});
        const clubs = user.subscribedTo;

        let clubWithLatestEvents  = [];
        clubs.map(async (club) => {
            const individualEvent = await Event.findOne({ clubId: club.clubId })
                .sort({ 'events.timestamp': -1 }) // Sort events in descending order based on timestamp
                .slice('events', 0, 3); // Get the latest three events
        
            clubWithLatestEvents.push(individualEvent)  
        });

        res.status(200).send({message: "Success", data: clubWithLatestEvents});
    } catch (error) {
        res.status(500).send({message: "Internal server error", data: null})
    }
})

module.exports = router;