const Submission = require("../models/submission");

exports.submitExamAnswers = async (req, res) => {
  try {
    const { id, examId } = req.params;
    const { answers } = req.body; // [{qid:1, answer:"A"}, {qid:2, answer:"B"}]

    const result = await Submission.submitExamAnswers(id, examId, answers);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExamResult = async (req, res) => {
  try {
    const { id, examId } = req.params;
    const result = await Submission.getExamResult(id, examId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
