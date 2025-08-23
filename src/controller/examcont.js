const Exam = require("../models/exam");

// Create Exam
exports.createExam = (req, res) => {
    const { examName,totalMarks,passingMarks,course} = req.body;

    // if (examName,totalMarks,passingMarks,course) {
    //     return res.status(400).send({ error: "All fields are required" });
    // }

    Exam.createExam(examName,totalMarks,passingMarks,course)
        .then((result)=>{
            if(result.affectedRows>0){
                res.send("Exam Created");
            }
            else{
                res.send("Exam Not Created");
            }
        })
        .catch(err => res.status(500).send({ error: err.message }));
};

// View all Exams
exports.viewAllExam = (req, res) => {
    Exam.viewAllExam()
        .then(results => res.send(results))
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
    const { examid,examName,totalMarks,passingMarks,course} = req.body;

    if (!examid) return res.status(400).send({ error: "Exam ID is required" });

    Exam.updateExamById(examName,totalMarks,passingMarks,course,examid)
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
  const examid = parseInt(req.params.id); 

  if (!examid || isNaN(examid)) {
    return res.status(400).send("Valid exam ID is required");
  }

  Exam.deleteExamById(examid)
    .then(result => {
      if (result.affectedRows === 0) {
        return res.status(404).send("No exam found for this ID");
      }
      res.send("Exam deleted successfully");
    })
    .catch(err => res.status(500).send("Error: " + err.message));
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

