const router = require('express').Router();
const PYQ = require('../models/PYQ');

// Endpoint to create a new PYQ
router.post("/postPYQ", async (req, res) => {
  try {
    const newPYQ = new PYQ({
      branchName: req.body.branchName,
      batch: req.body.batch,
      year: req.body.year,
      profName: req.body.profName,
      courseName: req.body.courseName,
      link: req.body.link,
      sem: req.body.sem,
      type: req.body.type
    });

    const pyq = await newPYQ.save();
    res.status(200).json(pyq);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// Endpoint to get PYQs with optional filters
router.get("/getPYQs", async (req, res) => {
  try {
    const { branchName, batch, year, sem, type } = req.query;
    let filter = {};

    if (branchName) filter.branchName = branchName;
    if (batch) filter.batch = batch;
    if (year) filter.year = year;
    if (sem) filter.sem = sem;
    if (type) filter.type = type;

    const pyqs = await PYQ.find(filter).sort({ year: -1 }); // Sorting by year in descending order
    res.status(200).json(pyqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

module.exports = router;
