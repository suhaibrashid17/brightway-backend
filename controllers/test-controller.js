const Test = require("../models/Test");

exports.CreateTest = async (req, res) => {
  try {
    const existingTest = await Test.findOne({ test_id: req.body.test_id, class: req.body.class });
    if (existingTest) return res.status(400).json({ error: "Test ID already exists for this class" });

    const newTest = new Test({
      test_id: req.body.test_id,
      class: req.body.class,
      test_records: []
    });

    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.GetTestsByClass = async (req, res) => {
  try {
    const tests = await Test.find({ class: req.query.class });
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.SaveMarks = async (req, res) => {
  try {
    const test = await Test.findOneAndUpdate(
      { test_id: req.body.test_id, class: req.body.class },
      { $set: { test_records: req.body.marksData } },
      { new: true }
    );
    if (!test) return res.status(404).json({ error: "Test not found" });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.GetTestDetails = async (req, res) => {
  try {
    console.log(req.query.test_id)
    console.log(req.query.class)
    const test = await Test.findOne({ 
      test_id: req.query.test_id,
      class: req.query.class
    });
    if (!test) return res.status(404).json({ error: "Test not found" });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};