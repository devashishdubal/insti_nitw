const router = require('express').Router();
const Forum = require('../models/Forum');

// make an endpoint to create a club and assign club owners (not for public)
// owner can change permission settings for admin and members
// admins can change permission settings for members only
router.post("/postQuestion", async (req, res) => {
  try {
    const newQn = new Forum({
      questionTitle: req.body.questionTitle,
      questionDescription: req.body.questionDescription,
      questionTag: req.body.questionTag
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

    const { filter } = request.params;
    let qns = await Forum.find({});
    if (filter != 0) qns = await Forum.find({ questionTag: filter });


    return response.status(200).json({
      Data: qns
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/updateLikes/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await Forum.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    return response.status(200).send({ message: 'Likes Increased' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/updateDislikes/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await Forum.findByIdAndUpdate(id, { $inc: { dislikes: 1 } });
    return response.status(200).send({ message: 'Disliked' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;