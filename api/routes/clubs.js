const router = require('express').Router();
const Club = require('../models/Clubs');
const User = require('../models/User');

// make an endpoint to create a club and assign club owners (not for public)
// owner can change permission settings for admin and members
// admins can change permission settings for members only
router.post("/createclub", async (req, res) => {
    try {
        const newClub = new Club({
            clubId: req.body.clubId,
            clubName: req.body.clubName,
            clubLogo: req.body.clubLogo,
            clubOwners: req.body.clubOwners,
            clubAdmins: req.body.clubAdmins,
            clubPosts: req.body.clubPosts,
            clubMembers: req.body.clubMembers,
            clubDescription: req.body.clubDescription,
            clubSubscribers: req.body.clubSubscribers
        });

        const club = await newClub.save();
        res.status(200).json("New club is created");
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
})

router.get("/getAllClubs", async (req, res) => {
    try {
        const { username } = req.query;
        const clubDetails = await Club.find({});
        const userDetails = await User.findById(username);
        
        const clubDetailsWithSubscriptions = clubDetails.map((club) => ({
            ...club,
            userIsSubscribed: userDetails.subscribedTo.includes(club._id)
        }));
        
        return res.status(200).send(clubDetailsWithSubscriptions);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Issue");
    }
})

router.get("/getclubdetails/:id", async (req, res) => {
    try {
        const clubId = req.params.id;

        const clubDetails = await Club.findById(clubId);

        if (!clubDetails) {
            return res.status(404).send("Club with this ID does not exist");
        }

        console.log(clubDetails);

        return res.status(200).send(clubDetails);
    } catch (error) {
        return res.status(error.status || 500).send(error.message || "Internal Server Error");
    }
});


router.put("/addAdmin", async (req, res) => {
    // only owner can add admin
    // add admin provided the person is already in the members list
    try {
        // one more stage of verification (check if user doing this is owner)
        // if not, throw an error
        const newAdminData = req.body.newClubAdmin;
        const clubIdToUpdate = req.body.clubId;
        const userId = req.body.userId // this will be stored in login session

        const adminExists = await User.findOne({
            userId: newAdminData
        });

        if (!adminExists) {
            //throw "The user you have entered does not exist"
            throw {status: 404, message: "The user you have entered does not exist"}
        }

        const isClubOwner = await Club.findOne({
            clubId: clubIdToUpdate,
            clubOwners: { $in: [userId] }
        });

        if (!isClubOwner) {
            //throw "The current user does not have permission to add an admin";
            throw {status: 403, message: "The user does not have permission to add an admin"}
        }

        if (isClubOwner.clubAdmins.length === 2) {
            throw {status: 403, message: "Cannot add more than 2 admins"}
        }

        const result = await Club.updateOne(
            { clubId: clubIdToUpdate },
            { $addToSet : {clubAdmins: newAdminData}}
        );
        
        if (result.matchedCount > 0) {
            // Check if the document was actually modified
            if (result.modifiedCount > 0) {
                //console.log('Document updated successfully');
                res.status(200).send("A new admin has been added to the club.")
            } else {
                //console.log('Document found but no changes made');
                // Handle the case where the document was found, but no changes were made
                res.status(200).send("Admin already exists in the club.")
            }
        } else {
            console.log('Document not found');
            //throw "Document was not found";
            throw {status: 404, message: "Document not found"}
        }
    } catch (error) {
        res.status(error.status || 500).send(error.message || "Internal server error");
    }
})

router.put("/addMember", async (req, res) => {
    // owner or admin can add members
    try {
        // one more stage of verification (check if user doing this is owner)
        // if not, throw an error
        const newMemberData = req.body.newClubMember;
        const clubIdToUpdate = req.body.clubId;
        const userId = req.body.userId // this will be stored in login session 

        const memberExists = await User.findOne({
            userId: newMemberData
        });


        if (!memberExists) {
            throw {status: 404, message: "The user you have entered does not exist"}
        }

        const isClubAdmin = await Club.findOne({
            clubId: clubIdToUpdate,
            clubAdmins: { $in: [userId] }
        });

        const isClubOwner = await Club.findOne({
            clubId: clubIdToUpdate,
            clubOwners: { $in: [userId] }
        });

        if (!isClubAdmin && !isClubOwner) {
            throw {status: 403, message: "The user does not have permission to add an member"}
        }

        const result = await Club.updateOne(
            { clubId: clubIdToUpdate },
            { $addToSet: {clubMembers: newMemberData}}
        );

        if (result.matchedCount > 0) {
            // Check if the document was actually modified
            if (result.modifiedCount > 0) {
                //console.log('Document updated successfully');
                res.status(200).send("A new member has been added to the club.")
            } else {
                //console.log('Document found but no changes made');
                // Handle the case where the document was found, but no changes were made
                res.status(200).send("Member already exists in the club.")
            }
        } else {
            throw {status: 404, message: "Document not found"}
        }
    } catch (error) {
        res.status(error.status || 500).send(error.message || "Internal server error");
    }
})

// remove admin
// remove member

router.put("/removeAdmin", async(req, res) => {
    try {
        const removeAdminData = req.body.removeClubAdmin;
        const clubIdToUpdate = req.body.clubId;
        const userId = req.body.userId // this will be stored in login session

        const adminExists = await User.findOne({
            userId: removeAdminData
        });

        if (!adminExists) {
            throw {status: 404, message: "The user you have entered does not exist"}
        }

        const isClubOwner = await Club.findOne({
            clubId: clubIdToUpdate,
            clubOwners: { $in: [userId] }
        });

        if (!isClubOwner) {
            throw {status: 403, message: "The user does not have permission to remove an admin"}
        }

        const result = await Club.updateOne(
            { clubId: clubIdToUpdate },
            { $pull: { clubAdmins: removeAdminData }}
        );
        

        if (result.matchedCount > 0) {
            // Check if the document was actually modified
            if (result.modifiedCount > 0) {
                //console.log('Document updated successfully');
                res.status(200).send("Removed member from the club")
            } else {
                //console.log('Document found but no changes made');
                // Handle the case where the document was found, but no changes were made
                res.status(200).send("Member is not in the club.")
            }
        } else {
            throw {status: 404, message: "Document not found"}
        }
    } catch (error) {
        res.status(error.status || 500).send(error.message || "Internal server error");
    }
})

router.put("/removeMember", async(req, res) => {
    try {
        // one more stage of verification (check if user doing this is owner)
        // if not, throw an error
        const removeMemberData = req.body.removeClubMember;
        const clubIdToUpdate = req.body.clubId;
        const userId = req.body.userId // this will be stored in login session 

        const memberExists = await User.findOne({
            userId: removeMemberData
        });

        if (!memberExists) {
            throw {status: 404, message: "The user you have entered does not exist"}
        }

        const isClubAdmin = await Club.findOne({
            clubId: clubIdToUpdate,
            clubAdmins: { $in: [userId] }
        });

        const isClubOwner = await Club.findOne({
            clubId: clubIdToUpdate,
            clubOwners: { $in: [userId] }
        });

        if (!isClubAdmin && !isClubOwner) {
            throw {status: 403, message: "The user does not have permission to remove a member"}
        }

        const result = await Club.updateOne(
            { clubId: clubIdToUpdate },
            { $pull: {clubMembers: removeMemberData}}
        );

        if (result.matchedCount > 0) {
            // Check if the document was actually modified
            if (result.modifiedCount > 0) {
                //console.log('Document updated successfully');
                res.status(200).send("Member has been removed")
            } else {
                //console.log('Document found but no changes made');
                // Handle the case where the document was found, but no changes were made
                res.status(200).send("Member is not in the club.")
            }
        } else {
            throw {status: 404, message: "Document not found"}
        }
    } catch (error) {
        res.status(error.status || 500).send(error.message || "Internal server error");
    }
})

// user subscribe to club
router.put("/handleSubscribe", async (req, res) => {
    try {
        const clubId = req.body.clubId;
        const user_to_subscribe = req.body.username;

        console.log(clubId, user_to_subscribe)

        const userExists = await User.findOne({
            _id: user_to_subscribe
        });

        if (!userExists) {
            return res.status(404).send("User does not exist");
        }

        const clubExists = await Club.findById(clubId);

        if (!clubExists) {
            return res.status(404).send("Club does not exist");
        }

        const clubResult = await Club.updateOne(
            { _id: clubId },
            { $addToSet: { clubSubscribers: user_to_subscribe } }
        );

        const userResult = await User.updateOne(
            { _id: user_to_subscribe },
            { $addToSet: { subscribedTo: clubId } }
        );

        if (clubResult.matchedCount > 0 && userResult.matchedCount > 0) {
            // Check if the document was actually modified
            if (clubResult.modifiedCount > 0 && userResult.modifiedCount > 0) {
                return res.status(200).send("Subscription has been added");
            } else {
                return res.status(200).send("User was already subscribed");
            }
        } else {
            return res.status(404).send("Club not found");
        }

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});


router.put("/handleUnsubscribe", async (req, res) => {
    try {
        const clubId = req.body.clubId;
        const user_to_unsubscribe = req.body.username;

        const userExists = await User.findById(user_to_unsubscribe);
        const clubExists = await Club.findById(clubId);

        if (!userExists) {
            return res.status(404).send("User does not exist");
        }

        if (!clubExists) {
            return res.status(404).send("Club does not exist");
        }

        const clubResult = await Club.updateOne(
            { _id: clubId },
            { $pull: { clubSubscribers: user_to_unsubscribe } }
        );

        const userResult = await User.updateOne(
            { _id: user_to_unsubscribe },
            { $pull: { subscribedTo: clubId } }
        );

        if (clubResult.matchedCount > 0 && userResult.matchedCount > 0) {
            // Check if the document was actually modified
            if (clubResult.modifiedCount > 0 && userResult.modifiedCount > 0) {
                return res.status(200).send("Subscription has been removed");
            } else {
                return res.status(200).send("User was already unsubscribed");
            }
        } else {
            return res.status(404).send("Club not found");
        }

    } catch (error) {
        return res.status(error.status || 500).send(error.message || "Internal Server Error");
    }
});

module.exports = router;