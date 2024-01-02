const router = require('express').Router();
const Question = require('../models/Question');

// make an endpoint to create a club and assign club owners (not for public)
// owner can change permission settings for admin and members
// admins can change permission settings for members only
router.post("/postQuestion", async (req, res) => {
    try {
        const newQn = new Question({
            questionTitle: req.body.questionTitle,
            questionBody: req.body.questionBody,
            questionTag: req.body.questionTag
        });

        const qn = await newQn.save();
        res.status(200).json(qn);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
})

router.get('/getQuestions', async (request, response) => {
    try {
      const qns = await Question.find({});
  
      return response.status(200).json({
        Data: qns
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

module.exports = router;