const router = require('express').Router();
const User = require('../models/User');
const Event = require('../models/Event');

/**
 * @route GET /getUserFeed/:userId
 * @group Feeds - Operations related to user feeds
 * @param {string} userId.path.required - The ID of the user whose feed is being retrieved
 * @returns {object} 200 - An array of events from the clubs the user is subscribed to, along with the organizer's name and logo
 * @returns {object} 500 - Internal server error
 * @description This endpoint retrieves a feed of events organized by the clubs a specific user is subscribed to. The feed includes details about each event and the name and logo of the organizing club.
 */
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