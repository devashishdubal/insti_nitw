/* `const router = require('express').Router();` is creating a new instance of an Express router. This
allows you to define routes for your application using this router object. You can then use this
router to handle different HTTP methods like GET, POST, PUT, DELETE, etc., for specific endpoints in
your application. */
const router = require('express').Router();
/* These lines are importing the models for `Event`, `Club`, `User` from their respective files.
This allows the router to interact with the database using these models. The models define
the schema and methods for interacting with the data related to events, clubs, and users in the
application. */
const Answer = require('../models/Answer');
const Forum = require('../models/Forum');
const User = require("../models/User")

/* 
----------------------------------------
Status codes returned in the responses of various API endpoints are mostly in line with
RESTFul API Practices
----------------------------------------
*/

/**
 * @route POST /postQuestion
 * @group Forum - Operations related to forum questions
 * @param {string} questionTitle.body.required - The title of the question being posted
 * @param {string} questionDescription.body.required - The description of the question being posted
 * @param {string} questionTag.body.required - The tag associated with the question
 * @param {string} userId.body.required - The ID of the user posting the question
 * @returns {object} 200 - The newly created question document
 * @returns {object} 500 - Internal server error
 * @description This endpoint allows users to post a new question to the forum. The question must include a title, description, tag, and the user ID of the person posting it.
 */
router.post("/postQuestion", async (req, res) => {
  try {
    const newQn = new Forum({
      questionTitle: req.body.questionTitle,
      questionDescription: req.body.questionDescription,
      questionTag: req.body.questionTag,
      userId: req.body.userId
    });

    const qn = await newQn.save();
    res.status(200).json(qn);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
})

/**
 * @route GET /getQuestions/:filter
 * @group Forum - Operations related to forum questions
 * @param {string} filter.path.required - The filter to apply to the questions (e.g., tag or '0' for no filter)
 * @param {string} userId.query - The ID of the user for checking likes and dislikes
 * @param {string} searchData.query - The search term to filter questions by title or description
 * @param {number} page.query - The page number for pagination
 * @param {boolean} loadPrev.query - Whether to load previous pages (if true, it loads all previous pages)
 * @returns {object} 200 - An object containing an array of questions with user like/dislike status
 * @returns {object} 500 - Internal server error
 * @description This endpoint retrieves questions from the forum based on various filters and pagination parameters. 
 * It supports filtering by question tag, searching by title or description, and checking if a user has liked or disliked a question.
 * Pagination is managed through the `page` and `loadPrev` parameters. If `loadPrev` is true, it loads all previous pages up to the specified page.
 */
router.get('/getQuestions/:filter', async (request, response) => {
  try {
    // Extracting query parameters and route parameters
    const { userId, searchData, page, loadPrev } = request.query;
    const { filter } = request.params;

    // Find users by username matching the searchData
    let idFromName = await User.find({
      username: { $regex: searchData, $options: 'i' }
    });

    // Calculate pagination values
    let pageSize = 16; // Number of questions per page
    let skip = (page - 1) * pageSize; // Number of questions to skip

    // Adjust pagination if loading previous pages
    if (loadPrev == 'true') {
      pageSize = 16 * page; // Increase page size if loading previous pages
      skip = 0; // Reset skip value
    }

    let qns;
    if (filter !== '0') {
      // Find questions based on filter and searchData
      qns = searchData.length === 0 ?
        await Forum.find({ questionTag: filter }).sort({ date: -1 }).skip(skip).limit(pageSize) :
        await Forum.find({
          questionTag: filter,
          $or: [
            { questionTitle: { $regex: searchData, $options: 'i' } },
            { questionDescription: { $regex: searchData, $options: 'i' } },
            { userId: { $in: idFromName.map(user => user._id) } }, // Match user IDs
          ]
        }).sort({ date: -1 }).skip(skip).limit(pageSize);
    } else {
      // Find questions without filter, only based on searchData
      qns = searchData.length === 0 ?
        await Forum.find({}).sort({ date: -1 }).skip(skip).limit(pageSize) :
        await Forum.find({
          $or: [
            { questionTitle: { $regex: searchData, $options: 'i' } },
            { questionDescription: { $regex: searchData, $options: 'i' } },
            { userId: { $in: idFromName.map(user => user._id) } }, // Match user IDs
          ]
        }).sort({ date: -1 }).skip(skip).limit(pageSize);
    }

    // Populate user data and determine if the user has liked or disliked each question
    const questionsWithLikes = await Promise.all(qns.map(async (question) => {
      await question.populate('userId'); // Populate user details for the question

      return {
        ...question.toObject(),
        userHasLiked: question.likes_users.includes(userId), // Check if the user liked the question
        userHasDisliked: question.dislikes_users.includes(userId), // Check if the user disliked the question
      };
    }));
    console.log(questionsWithLikes)
    // Send the response with the populated questions
    return response.status(200).json({
      Data: questionsWithLikes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


/**
 * @route GET /getQuestionById/:id
 * @group Forum - Operations related to forum questions
 * @param {string} id.path.required - The ID of the question to retrieve
 * @param {string} userId.query - The ID of the user to check for likes and dislikes
 * @returns {object} 200 - The question details including answers and user like/dislike status
 * @returns {object} 404 - Question not found
 * @returns {object} 500 - Internal server error
 * @description This endpoint retrieves a specific question by its ID, including details of the question's answers and the user's like/dislike status. It populates user details for both the question and the answers and provides a comprehensive view of the question and its interactions.
 */
router.get('/getQuestionById/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.query;
    
    // Find the question by ID
    let qn = await Forum.findById(id);

    if (!qn) {
      return response.status(404).send("Question not found!");
    }

    // Populate user details for the question and answers
    await qn.populate('userId');
    await qn.populate('answers.userId');
    
    // Construct the question object with user interaction details
    const questionWithLikes = {
      ...qn.toObject(),
      userHasLiked: qn.likes_users.includes(userId),
      userHasDisliked: qn.dislikes_users.includes(userId),
      answers: await Promise.all(qn.answers.map(async (answer) => {
        // Populate user details for each answer
        const answerUser = await User.findById(answer.userId);
        return {
          ...answer.toObject(),
          username: answerUser ? answerUser.username : 'Unknown',
          userHasLiked: answer.likes_users.includes(userId),
          userHasDisliked: answer.dislikes_users.includes(userId),
        };
      })),
    };

    return response.status(200).json(questionWithLikes);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * @route PUT /updateLikes/:id
 * @group Forum - Operations related to forum questions
 * @param {string} id.path.required - The ID of the question to update likes for
 * @param {string} userId.query.required - The ID of the user whose like status is being updated
 * @param {boolean} disliked.query - Indicates if the user disliked the question (used to toggle like status)
 * @returns {object} 200 - Success message indicating the like status was updated
 * @returns {object} 500 - Internal server error
 * @description This endpoint updates the like status of a question. It toggles the like status based on whether the user has already liked the question or not. If the user has liked the question, it removes the like and decrements the like count. If the user has not liked the question, it adds the like and increments the like count.
 */
router.put('/updateLikes/:id', async (request, response) => {
  try {
    const { userId, disliked } = request.query;
    const { id } = request.params;

    // Find the question by ID
    const question = await Forum.findById(id);
    
    // Check if the user has already liked the question
    const liked = question.likes_users.includes(userId);

    if (liked) {
      // User has already liked the question, so remove the like
      const indexOfLike = question.likes_users.indexOf(userId);
      question.likes_users.splice(indexOfLike, 1); // Remove the user from likes array
      await question.save(); // Save changes to the question document
      await Forum.findByIdAndUpdate(id, { $inc: { likes: -1 } }); // Decrement the like count
      return response.status(200).json({ message: 'Like removed' });
    }

    // User has not liked the question, so add the like
    await Forum.findByIdAndUpdate(id, { $inc: { likes: 1 } }); // Increment the like count
    question.likes_users.push(userId); // Add user to likes array
    await question.save(); // Save changes to the question document
    return response.status(200).send({ message: 'Like added' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * @route PUT /updateDislikes/:id
 * @group Forum - Operations related to forum questions
 * @param {string} id.path.required - The ID of the question to update dislikes for
 * @param {string} userId.query.required - The ID of the user whose dislike status is being updated
 * @param {boolean} liked.query - Indicates if the user liked the question (used to toggle dislike status)
 * @returns {object} 200 - Success message indicating the dislike status was updated
 * @returns {object} 500 - Internal server error
 * @description This endpoint updates the dislike status of a question. It toggles the dislike status based on whether the user has already disliked the question or not. If the user has disliked the question, it removes the dislike and decrements the dislike count. If the user has not disliked the question, it adds the dislike and increments the dislike count.
 */
router.put('/updateDislikes/:id', async (request, response) => {
  try {
    const { userId, liked } = request.query;
    const { id } = request.params;

    // Find the question by ID
    const question = await Forum.findById(id);

    // Check if the user has already disliked the question
    const disliked = question.dislikes_users.includes(userId);

    if (disliked) {
      // User has already disliked the question, so remove the dislike
      const indexOfDislike = question.dislikes_users.indexOf(userId);
      question.dislikes_users.splice(indexOfDislike, 1); // Remove the user from dislikes array
      await question.save(); // Save changes to the question document
      await Forum.findByIdAndUpdate(id, { $inc: { dislikes: -1 } }); // Decrement the dislike count
      return response.status(200).json({ message: 'Dislike removed' });
    }

    // User has not disliked the question, so add the dislike
    await Forum.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }); // Increment the dislike count
    question.dislikes_users.push(userId); // Add user to dislikes array
    await question.save(); // Save changes to the question document
    return response.status(200).send({ message: 'Dislike added' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * @route PUT /updateLikes/comments/:id
 * @group Forum - Operations related to forum questions and answers
 * @param {string} id.path.required - The ID of the answer to update likes for
 * @param {string} userId.query.required - The ID of the user whose like status is being updated
 * @param {string} questionId.query.required - The ID of the question to which the answer belongs
 * @returns {object} 200 - Success message indicating the like status was updated
 * @returns {object} 404 - Question or answer not found
 * @returns {object} 500 - Internal server error
 * @description This endpoint updates the like status of a specific answer within a question. It toggles the like status based on whether the user has already liked the answer or not. If the user has liked the answer, it removes the like and decrements the like count. If the user has not liked the answer, it adds the like and increments the like count.
 */
router.put('/updateLikes/comments/:id', async (request, response) => {
  try {
    const { id } = request.params; // ID of the answer to update
    const { userId, questionId } = request.query; // User ID and question ID

    // Find the question that contains the answer
    const question = await Forum.findById(questionId);

    if (!question) {
      return response.status(404).send("Question not found!");
    }

    // Find the specific answer within the question
    const answer = question.answers.id(id);

    if (!answer) {
      return response.status(404).send("Answer not found!");
    }

    // Check if the user has already liked the answer
    if (answer.likes_users.includes(userId)) {
      // User has already liked the answer, so remove the like
      const indexOfLike = answer.likes_users.indexOf(userId);
      answer.likes_users.splice(indexOfLike, 1); // Remove the user from likes array
      answer.likes -= 1; // Decrease the likes count
      await question.save(); // Save changes to the question document
      return response.status(200).json({ message: 'Like removed' });
    }

    // User has not liked the answer, so add the like
    answer.likes_users.push(userId); // Add user to likes array
    answer.likes += 1; // Increase the likes count
    await question.save(); // Save changes to the question document
    return response.status(200).send({ message: 'Like added' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * @route PUT /updateDislikes/comments/:id
 * @group Forum - Operations related to forum questions and answers
 * @param {string} id.path.required - The ID of the answer to update dislikes for
 * @param {string} userId.query.required - The ID of the user whose dislike status is being updated
 * @param {string} questionId.query.required - The ID of the question to which the answer belongs
 * @returns {object} 200 - Success message indicating the dislike status was updated
 * @returns {object} 404 - Question or answer not found
 * @returns {object} 500 - Internal server error
 * @description This endpoint updates the dislike status of a specific answer within a question. It toggles the dislike status based on whether the user has already disliked the answer or not. If the user has disliked the answer, it removes the dislike and decrements the dislike count. If the user has not disliked the answer, it adds the dislike and increments the dislike count.
 */
router.put('/updateDislikes/comments/:id', async (request, response) => {
  try {
    const { id } = request.params; // ID of the answer to update
    const { userId, questionId } = request.query; // User ID and question ID

    // Find the question that contains the answer
    const question = await Forum.findById(questionId);

    if (!question) {
      return response.status(404).send("Question not found!");
    }

    // Find the specific answer within the question
    const answer = question.answers.id(id);

    if (!answer) {
      return response.status(404).send("Answer not found!");
    }

    // Check if the user has already disliked the answer
    if (answer.dislikes_users.includes(userId)) {
      // User has already disliked the answer, so remove the dislike
      const indexOfDislike = answer.dislikes_users.indexOf(userId);
      answer.dislikes_users.splice(indexOfDislike, 1); // Remove the user from dislikes array
      answer.dislikes -= 1; // Decrease the dislikes count
      await question.save(); // Save changes to the question document
      return response.status(200).json({ message: 'Dislike removed' });
    }

    // User has not disliked the answer, so add the dislike
    answer.dislikes_users.push(userId); // Add user to dislikes array
    answer.dislikes += 1; // Increase the dislikes count
    await question.save(); // Save changes to the question document
    return response.status(200).send({ message: 'Dislike added' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/**
 * @route PUT /reply/:id
 * @group Forum - Operations related to forum questions and answers
 * @param {string} id.path.required - The ID of the question to which the answer is being added
 * @param {object} request.body.required - The new answer details
 * @param {string} request.body.userId.required - The ID of the user providing the answer
 * @param {string} request.body.answerDescription.required - The content of the answer
 * @returns {object} 200 - Success message with the newly added answer
 * @returns {object} 500 - Internal server error
 * @description This endpoint adds a new answer to a specific question. It creates a new answer object using the provided user ID and answer description, then updates the question document to include this new answer in its list of answers.
 */
router.put('/reply/:id', async (request, response) => {
  try {
    const { id } = request.params; // ID of the question to which the answer is being added
    const newAns = new Answer({
      userId: request.body.userId, // ID of the user providing the answer
      answerDescription: request.body.answerDescription // Content of the answer
    });

    // Add the new answer to the question's answers array
    await Forum.findByIdAndUpdate(id, { $push: { answers: newAns } });

    return response.status(200).send({ newAnswer: newAns });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


module.exports = router;