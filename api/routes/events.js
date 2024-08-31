/* `const router = require('express').Router();` is creating a new instance of an Express router. This
allows you to define routes for your application using this router object. You can then use this
router to handle different HTTP methods like GET, POST, PUT, DELETE, etc., for specific endpoints in
your application. */
const router = require('express').Router();
/* These lines are importing the models for `Event`, `Club`, `User`, 'CustomEvent' from their respective files.
This allows the router to interact with the database using these models. The models define
the schema and methods for interacting with the data related to events, clubs, and users in the
application. */
const Event = require('../models/Event');
const Club = require('../models/Clubs');
const User = require('../models/User');
const CustomEvent = require("../models/CustomEvent")

/* 
----------------------------------------
Status codes returned in the responses of various API endpoints are mostly in line with
RESTFul API Practices
----------------------------------------
*/

/* The `router.post("/create-event", async (req, res) => { ... })` function is handling a POST request
to create a new event. Here's a breakdown of what the function is doing: */
router.post("/create-event", async (req, res) => {
    try {
        /* `const club = await Club.findById(req.body.eventOrganizer);` is querying the database to
        find a club document based on the `eventOrganizer` field provided in the request body. It is
        using the `Club` model to perform this database operation. */
        const club = await Club.findById(req.body.eventOrganizer);

        /* The `if(!club)` statement is checking if the variable `club` is falsy, meaning it does not
        exist or is null. If `club` does not exist (i.e., it is false), the code inside the if block
        will be executed. In this case, it returns a response with a status code of 404 and a
        message saying "Club doesn't exist". This is a way to handle the scenario where the club
        being searched for in the database is not found, and it allows the server to respond
        appropriately to the client making the request. */
        if(!club){
            return res.status(404).send("Club doesn't exist");
        }

        /* `const eventDateTime = new Date(req.body.eventDateTime)` is creating a new Date object by
        parsing the value of `req.body.eventDateTime`. This line of code is converting the event
        date and time provided in the request body into a JavaScript Date object, which can then be
        used to store and manipulate date and time information related to the event being created. */
        const eventDateTime = new Date(req.body.eventDateTime)

        /* This creates a new Event object which the details we have received from the frontend
         */
        const newEvent = new Event({
            // EventId: req.body.userId,
            eventName: req.body.eventName,
            eventDescription: req.body.eventDescription,
            eventDateTime: eventDateTime,
            eventOrganizer: req.body.eventOrganizer,
            registerable: req.body.registerable,
            registrationLink: req.body.registrationLink,
            eventImage: req.body.eventImage,
            eventVenue: req.body.eventVenue,
            targetYear: req.body.targetYear
        });

        /// The object will be saved to the database
        const event = await newEvent.save();
        res.status(200).json(event);
    } catch (error) {
        /// Catch an error here and return as an internal server error
       res.status(500).json(error);
    }
})

/* The `router.delete("/deleteEvent/:id", async (req, res) => { ... })` function is handling a DELETE request
to delete a specific event with id which is passed in the parameters. 
Here's a breakdown of what the function is doing: */
router.delete("/deleteEvent/:id", async (req, res) => {
    try {
        const { id } = req.params; /// getting the id which was passed in the DELETE request paramets
        const deletedRecord = await Event.findByIdAndDelete(id); /// Find the record with objectId as ID and delete it
        if (!deletedRecord) {
            /// if there is no such record, we display a 404 error message "Record not found"
            return res.status(404).json({ message: 'Record not found' });
        }

        /// Delete successfully
    return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (e) {
        res.status(500).json(e);
    }
})
/**
 * @route GET /getEventDetails/:id
 * @group Events - Operations related to events
 * @param {string} id.path.required - The unique identifier of the event to be retrieved
 * @returns {object} 200 - The event details as a JSON object
 * @returns {string} 404 - The event does not exist
 * @returns {object} 500 - Internal server error
 * @description This endpoint retrieves the details of a specific event by its unique ID.
 */
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

/**
 * @route GET /getEventDetails/club/:club
 * @group Events - Operations related to events
 * @param {string} club.path.required - The name or identifier of the club that organized the event(s)
 * @returns {object[]} 200 - An array of events organized by the specified club
 * @returns {string} 404 - No events found for the specified club
 * @returns {object} 500 - Internal server error
 * @description This endpoint retrieves all events organized by a specific club.
 */
router.get("/getEventDetails/club/:club", async (req,res) => {
    try{
        const event = await Event.find({eventOrganizer: req.params.club})
        //
        if(!event){
            return res.status(404).send("The event does not exist")
        }

        res.status(200).send(event);
    }
    catch(e) {
        res.status(500).json(e);
    }
})

/**
 * @route PUT /updateEventDetails/:id
 * @group Events - Operations related to events
 * @param {string} id.path.required - The unique identifier of the event to be updated
 * @param {string} eventName.body - The updated name of the event
 * @param {string} eventDescription.body - The updated description of the event
 * @param {string} eventDateTime.body - The updated date and time of the event
 * @param {string} eventOrganizer.body - The updated organizer of the event
 * @param {boolean} registerable.body - Whether the event is registerable
 * @param {string} registrationLink.body - The updated registration link for the event
 * @param {string} eventImage.body - The updated image for the event
 * @param {string} eventVenue.body - The updated venue for the event
 * @param {string} targetYear.body - The updated target year for the event
 * @returns {object} 200 - The updated event details as a JSON object
 * @returns {string} 404 - The event does not exist
 * @returns {object} 500 - Internal server error
 * @description This endpoint updates the details of a specific event based on the provided event ID.
 */
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
    } catch(error) {
        res.status(500).send(error);
    }
})

/**
 * @route GET /recentEvents
 * @group Events - Operations related to events
 * @returns {object[]} 200 - An array of recent events that have already occurred, with populated event organizer details
 * @returns {string} 500 - Internal server error
 * @description This endpoint retrieves all recent events that have already occurred (events with a date and time earlier than the current date and time).
*/
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

/**
 * @route GET /upcomingEvents
 * @group Events - Operations related to events
 * @returns {object[]} 200 - An array of upcoming events that are scheduled to occur in the future, with populated event organizer details
 * @returns {string} 500 - Internal server error
 * @description This endpoint retrieves all upcoming events that are scheduled to occur in the future (events with a date and time later than the current date and time).
 */
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

/**
 * @route GET /collegeEvents/:date
 * @group Events - Operations related to events
 * @param {string} date.path.required - The date to filter events by, in YYYY-MM-DD format
 * @returns {object[]} 200 - An array of events happening on the specified date, with populated event organizer details
 * @returns {string} 400 - Invalid date format
 * @returns {string} 500 - Internal server error
 * @description This endpoint retrieves all college events scheduled to occur on the specified date. The date should be provided in YYYY-MM-DD format. If the date format is invalid, a 400 error is returned.
 */
router.get("/collegeEvents/:date", async (req, res) => {
    try {  
        const dateString = req.params.date;
        const dateObject = new Date(dateString);

        if (isNaN(dateObject)) {
            return res.status(400).send("Invalid date format");
        }

        const events = await Event.find({ eventDateTime: { $gte: dateObject, $lt: new Date(dateObject.getTime() + 24 * 60 * 60 * 1000) } }).populate('eventOrganizer');;
        return res.status(200).send(events);
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

/**
 * @route POST /createCustomEvent
 * @group CustomEvents - Operations related to custom user-created events
 * @param {string} eventTitle.body.required - The title of the custom event
 * @param {string} userId.body.required - The ID of the user creating the event
 * @param {string} eventDateTime.body.required - The date and time of the custom event
 * @returns {string} 200 - Success message indicating that the event was created
 * @returns {string} 500 - Internal server error
 * @description This endpoint allows a user to create a custom event by providing the event title, user ID, and event date and time.
 */
router.post("/createCustomEvent", async(req, res) => {
    try {
        const eventTitle = req.body.eventTitle;
        const userId = req.body.userId;
        const eventDateTime = req.body.eventDateTime;
        const newEvent = new CustomEvent({
            eventTitle: eventTitle,
            userId: userId,
            eventDateTime: eventDateTime
        })

        await newEvent.save();
        return res.status(200).send("Done!");
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

/**
 * @route GET /getCustomEvents/:userId/:date
 * @group CustomEvents - Operations related to custom user-created events
 * @param {string} userId.path.required - The ID of the user whose events are being retrieved
 * @param {string} date.path.required - The date to filter events by, in YYYY-MM-DD format
 * @returns {object[]} 200 - An array of custom events for the specified user on the given date
 * @returns {string} 500 - Internal server error
 * @description This endpoint retrieves all custom events created by a specific user on a given date. The date should be provided in YYYY-MM-DD format.
 */
router.get("/getCustomEvents/:userId/:date", async(req, res) => {
    try {
        const userId = req.params.userId;
        const date = new Date(req.params.date);
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);  
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const userEvents = await CustomEvent.find({
            userId: userId,
            eventDateTime: { $gte: startDate, $lte: endDate }
        })

        return res.status(200).send(userEvents);
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

module.exports = router;