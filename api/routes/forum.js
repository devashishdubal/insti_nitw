const router = require('express').Router();
const Answer = require('../models/Answer');
const Forum = require('../models/Forum');
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
    const { userId } = request.query;
    const { filter } = request.params;
    let qns = await Forum.find({}).sort({ date: -1 });;
    if (filter != 0) qns = await Forum.find({ questionTag: filter }).sort({ date: -1 });

    const questionsWithLikes = qns.map((question) => ({
      ...question,
      userHasLiked: question.likes_users.includes(userId),
      userHasDisliked: question.dislikes_users.includes(userId)
    }));

    return response.status(200).json({
      Data: questionsWithLikes
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/getQuestionById/:id', async (request, response) => {
  try {
    const { id } = request.params;
    let qn = await Forum.find({_id: id});
    return response.status(200).json(qn[0]);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/updateLikes/:id', async (request, response) => {
  try {
    const {userId, disliked} = request.query
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
    const {userId, liked} = request.query
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
    const filter = { 'answers._id': id };
    await Forum.findOneAndUpdate(filter, { $inc: { 'answers.$.likes': 1 } });

    return response.status(200).send({ message: 'Likes Increased' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/updateDislikes/comments/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const filter = { 'answers._id': id };
    await Forum.findOneAndUpdate(filter, { $inc: { 'answers.$.dislikes': 1 } });

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