/* `const router = require('express').Router();` is creating a new instance of an Express router. This
allows you to define routes for your application using this router object. You can then use this
router to handle different HTTP methods like GET, POST, PUT, DELETE, etc., for specific endpoints in
your application. */
const router = require('express').Router();
/* This line is importing the model for 'User' from its respective files.
This allows the router to interact with the database using the model. The models define
the schema and methods for interacting with the data related to events, clubs, and users in the
application. */
const User = require('../models/User');

/* 
----------------------------------------
Status codes returned in the responses of various API endpoints are mostly in line with
RESTFul API Practices
----------------------------------------
*/

/**
 * @route GET /exist/:id
 * @group Users - Operations related to user accounts
 * @param {string} id.path.required - The username to check for existence
 * @returns {string} 201 - Message indicating that the username already exists
 * @returns {string} 200 - Message indicating that the username is available
 * @returns {object} 500 - Internal server error
 * @description This endpoint checks if a username already exists in the system. If the username is found, a message indicating that it already exists is returned. If not, a message indicating that the username is available is returned.
 */
router.get("/exist/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    if (user) {
      return res.status(201).json("username already exists");
    }
    else {
      return res.status(200).json("username is available");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

/**
 * @route GET /:id
 * @group Users - Operations related to user accounts
 * @param {string} id.path.required - The username of the user whose details are being retrieved
 * @returns {object} 200 - The user details excluding sensitive information (password, updatedAt)
 * @returns {object} 500 - Internal server error
 * @description This endpoint retrieves the details of a user based on their username. Sensitive information such as the password and the last update timestamp are excluded from the response.
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @route GET /getSession/:email
 * @group Sessions - Operations related to user sessions
 * @param {string} email.path.required - The email of the user whose session information is being retrieved
 * @returns {object} 200 - The user details associated with the provided email
 * @returns {object} 500 - Internal server error
 * @description This endpoint retrieves session information for a user based on their email address. It returns the full user document associated with the provided email.
 */
router.get("/getSession/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    //const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @route PUT /updateVisibility/:id
 * @group Users - Operations related to user accounts
 * @param {string} id.path.required - The username of the user whose profile visibility is being updated
 * @param {boolean} privateProfile.body.required - The new visibility status for the user’s profile (true for private, false for public)
 * @returns {object} 200 - Success message and updated user document
 * @returns {object} 404 - User not found
 * @returns {object} 500 - Internal server error
 * @description This endpoint updates the visibility of a user's profile based on the provided username. The `privateProfile` field in the user's document is updated to reflect the new visibility status.
 */
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

/**
 * @route PUT /updateProfile/:id
 * @group Users - Operations related to user accounts
 * @param {string} id.path.required - The username of the user whose profile is being updated
 * @param {string} username.body - The updated username for the user
 * @param {string} instagramLink.body - The updated Instagram link for the user
 * @param {string} linkedinLink.body - The updated LinkedIn link for the user
 * @param {string} mess.body - The updated "mess" field for the user (assumed to be a custom field)
 * @param {string} twitterLink.body - The updated Twitter link for the user
 * @param {string} githubLink.body - The updated GitHub link for the user
 * @param {string} aboutMe.body - The updated "about me" section for the user
 * @returns {object} 200 - The updated user document
 * @returns {string} 404 - The user does not exist
 * @returns {object} 500 - Internal server error
 * @description This endpoint updates various profile details of a user based on the provided username. Only the fields included in the request body will be updated.
*/
router.put("/updateProfile/:id", async (req, res) => {
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