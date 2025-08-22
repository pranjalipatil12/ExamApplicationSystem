const Exam = require("../models/exam");

// Create Exam
exports.createExam = (req, res) => {
    const { title, total_marks, passing_marks } = req.body;

    if (!title || !total_marks || !passing_marks) {
        return res.status(400).send({ error: "All fields are required" });
    }

    Exam.createExam(title, total_marks, passing_marks)
        .then(result => res.send({ message: "Exam created", examid: result.insertId }))
        .catch(err => res.status(500).send({ error: err.message }));
};

// View all Exams
exports.viewAllExam = (req, res) => {
    Exam.viewAllExam()
        .then(results => res.send({ exams: results }))
        .catch(err => res.status(500).send({ error: err.message }));
};

// View Exam by ID
exports.viewExamById = (req, res) => {
    const examid = req.body.examid;

    if (!examid) return res.status(400).send({ error: "Exam ID is required" });

    Exam.viewExamById(examid)
        .then(result => res.send({ exam: result }))
        .catch(err => res.status(500).send({ error: err.message }));
};

// Update Exam by ID
exports.updateExamById = (req, res) => {
    const { examid, title, total_marks, passing_marks } = req.body;

    if (!examid) return res.status(400).send({ error: "Exam ID is required" });

    Exam.updateExamById(examid, title, total_marks, passing_marks)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).send({ error: "No exam found with this ID" });
            }
            res.send({ message: "Exam updated successfully" });
        })
        .catch(err => res.status(500).send({ error: err.message }));
};

// Delete Exam by ID
exports.deleteExamById = (req, res) => {
    const examid = parseInt(req.body.examid);

    if (!examid || isNaN(examid)) {
        return res.status(400).send({ error: "Valid exam ID is required" });
    }

    Exam.deleteExamById(examid)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).send({ error: "No exam found for this ID" });
            }
            res.send({ message: "Exam deleted successfully" });
        })
        .catch(err => res.status(500).send({ error: err.message }));
};

// Search Exams by Date

exports.searchExamsByDate = (req, res) => {
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({ error: "Date is required in query." });
    }

    Exam.searchExamsByDate(date)
        .then((exams) => {
            if (exams.length === 0) {
                return res.status(404).json({ message: "No exams found on this date." });
            }
            res.json({ exams });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

