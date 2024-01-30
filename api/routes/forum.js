const router = require('express').Router();
const Answer = require('../models/Answer');
const Forum = require('../models/Forum');
const User = require("../models/User")
const QuestionLikes = require("../models/QuestionLikes");

// make an endpoint to create a club and assign club owners (not for public)
// owner can change permission settings for admin and members
// admins can change permission settings for members only

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

router.get('/getQuestions/:filter', async (request, response) => {
  try {
    const { userId, searchData, page, loadPrev } = request.query;
    const { filter } = request.params;

    let idFromName = await User.find({
      username: { $regex: searchData, $options: 'i' }
    });

    // Calculate the skip value based on the page number
    let pageSize = 16; // Adjust this based on your desired number of questions per page
    let skip = (page - 1) * pageSize

    if (loadPrev == true) {
      pageSize = 16 * page;
      skip = 0;
    }

    let qns;
    if (filter !== '0') {
      qns = searchData.length === 0 ?
        await Forum.find({ questionTag: filter }).sort({ date: -1 }).skip(skip).limit(pageSize) :
        await Forum.find({
          questionTag: filter,
          $or: [
            { questionTitle: { $regex: searchData, $options: 'i' } },
            { questionDescription: { $regex: searchData, $options: 'i' } },
            { userId: idFromName },
          ]
        }).sort({ date: -1 }).skip(skip).limit(pageSize);

    } else {
      qns = searchData.length === 0 ?
        await Forum.find({}).sort({ date: -1 }).skip(skip).limit(pageSize) :
        await Forum.find({
          $or: [
            { questionTitle: { $regex: searchData, $options: 'i' } },
            { questionDescription: { $regex: searchData, $options: 'i' } },
            { userId: idFromName },
          ]
        }).sort({ date: -1 }).skip(skip).limit(pageSize);
    }

    const questionsWithLikes = await Promise.all(qns.map(async (question) => {
      const populatedQuestion = await question.populate('userId');

      return {
        ...populatedQuestion,
        userHasLiked: question.likes_users.includes(userId),
        userHasDisliked: question.dislikes_users.includes(userId),
      };
    }));

    return response.status(200).json({
      Data: questionsWithLikes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.get('/getQuestionById/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.query;
    let qn = await Forum.findById(id);

    if (!qn) {
      return response.status(404).send("Question not found!");
    }

    await qn.populate('userId');
    await qn.populate('answers.userId')
    const questionWithLikes = {
      ...qn.toObject(),
      userHasLiked: qn.likes_users.includes(userId),
      userHasDisliked: qn.dislikes_users.includes(userId),
      answers: await Promise.all(qn.answers.map(async (answer) => ({
        ...answer.toObject(),
        username: await User.findById(answer.userId).username,
        userHasLiked: answer.likes_users.includes(userId),
        userHasDisliked: answer.dislikes_users.includes(userId),
      }))),
    };

    return response.status(200).json(questionWithLikes);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/updateLikes/:id', async (request, response) => {
  try {
    const { userId, disliked } = request.query
    const { id } = request.params

    const question = await Forum.findById(id);
    const liked = question.likes_users.includes(userId);

    if (liked) {
      const indexOfLike = question.likes_users.indexOf(userId);
      question.likes_users.splice(indexOfLike, 1);
      await question.save();
      await Forum.findByIdAndUpdate(id, { $inc: { likes: -1 } });
      return response.status(200).json({ message: 'Like removed' });
    }

    // Add user to likes array
    await Forum.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    question.likes_users.push(userId);
    await question.save();
    return response.status(200).send({ message: 'Likes Increased' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/updateDislikes/:id', async (request, response) => {
  try {
    const { userId, liked } = request.query
    const { id } = request.params

    const question = await Forum.findById(id);
    const liked_status = question.dislikes_users.includes(userId);

    if (liked_status) {
      const indexOfLike = question.dislikes_users.indexOf(userId);
      question.dislikes_users.splice(indexOfLike, 1);
      await question.save();
      await Forum.findByIdAndUpdate(id, { $inc: { dislikes: -1 } });
      return response.status(200).json({ message: 'Like removed' });
    }

    // Add user to likes array
    await Forum.findByIdAndUpdate(id, { $inc: { dislikes: 1 } });
    question.dislikes_users.push(userId);
    await question.save();
    return response.status(200).send({ message: 'Likes Increased' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/updateLikes/comments/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { userId, questionId } = request.query;

    const question = await Forum.findById(questionId);

    if (!question) {
      return response.status(404).send("Question not found!");
    }
    const answer = question.answers.id(id);

    if (!answer) {
      return response.status(404).send("Answer not found!");
    }

    if (answer.likes_users.includes(userId)) {
      const indexOfLike = answer.likes_users.indexOf(userId);
      answer.likes_users.splice(indexOfLike, 1);
      answer.likes -= 1;  // Decrease the likes count
      await question.save(); // Save the updated question
      return response.status(200).json({ message: 'Like removed' });
    }

    answer.likes_users.push(userId);
    answer.likes += 1; // Increase the likes count
    await question.save(); // Save the updated question
    return response.status(200).send({ message: 'Likes Increased' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.put('/updateDislikes/comments/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { userId, questionId } = request.query;

    const question = await Forum.findById(questionId);

    if (!question) {
      return response.status(404).send("Question not found!");
    }

    const answer = question.answers.id(id);

    if (!answer) {
      return response.status(404).send("Answer not found!");
    }

    if (answer.dislikes_users.includes(userId)) {
      const indexOfDislike = answer.dislikes_users.indexOf(userId);
      answer.dislikes_users.splice(indexOfDislike, 1);
      answer.dislikes -= 1;  // Decrease the dislikes count
      await question.save(); // Save the updated question
      return response.status(200).json({ message: 'Dislike removed' });
    }

    answer.dislikes_users.push(userId);
    answer.dislikes += 1; // Increase the dislikes count
    await question.save(); // Save the updated question
    return response.status(200).send({ message: 'Dislikes Increased' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.put('/reply/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const newAns = new Answer({
      userId: request.body.userId,
      answerDescription: request.body.answerDescription
    });

    await Forum.findByIdAndUpdate(id, { $push: { answers: newAns } });

    return response.status(200).send({ newAnswer: newAns });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;