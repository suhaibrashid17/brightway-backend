const mongoose = require("mongoose");

const TestRecordSchema = new mongoose.Schema({
  roll_num: String,
  subjects: [{
    subjectName: String,
    obtainedMarks: Number,
    totalMarks: Number
  }]
});

const TestSchema = new mongoose.Schema({
  test_id: { type: String, required: true },
  class: { type: String, required: true },
  test_records: [TestRecordSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add compound index for unique test_id + class
TestSchema.index({ test_id: 1, class: 1 }, { unique: true });

module.exports = mongoose.model("Test", TestSchema);