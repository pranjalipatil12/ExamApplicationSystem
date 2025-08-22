const Assignment = require("../models/assignment");


exports.assignExamToStudent = async (req, res) => {
  try {
    const { studentId, examScheduleId } = req.body;
    const result = await Assignment.assignExamToStudent(studentId, examScheduleId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewAllAssignExams = async (req, res) => {
  try {
    const studentId = req.params.id;
    const exams = await Assignment.viewAllAssignExams(studentId);
    res.status(200).json(exams);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
