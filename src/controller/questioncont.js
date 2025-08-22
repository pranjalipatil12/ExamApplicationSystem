const Question = require("../models/question");


// Create Question
exports.createQuestion = (req, res) => {
    Question.createQuestion(req.body)
        .then(result => res.status(201).json({ message: "Question created", qid: result.insertId }))
        .catch(err => res.status(500).json({ error: "Failed to create question", details: err }));
};

// View All Questions
exports.viewAllQuestion = (req, res) => {
    Question.viewAllQuestion()
        .then(results => res.status(200).json({ questions: results }))
        .catch(err => res.status(500).json({ error: "Failed to fetch questions", details: err }));
};

// View Question By ID
exports.viewQuestionById = (req, res) => {
    const { qid } = req.body;
    Question.viewQuestionById(qid)
        .then(results => {
            if (results.length === 0) {
                return res.status(404).json({ message: "Question not found" });
            }
            res.status(200).json({ question: results[0] });
        })
        .catch(err => res.status(500).json({ error: "Failed to fetch question", details: err }));
};

// Update Question By ID
exports.updateQuestionById = (req, res) => {
    const { qid, ...updateData } = req.body;
    Question.updateQuestionById(qid, updateData)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Question not found" });
            }
            res.status(200).json({ message: "Question updated" });
        })
        .catch(err => res.status(500).json({ error: "Failed to update question", details: err }));
};

// Delete Question By ID
exports.deleteQuestionById = (req, res) => {
    const { qid } = req.body;
    Question.deleteQuestionById(qid)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Question not found" });
            }
            res.status(200).json({ message: "Question deleted" });
        })
        .catch(err => res.status(500).json({ error: "Failed to delete question", details: err }));
};


//Search Question By Name
exports.searchQuestionByQuestion = (req, res) => {
    const { question_text } = req.body;

    if (!question_text) {
        return res.status(400).json({ message: "Name is required in query" });
    }

    Question.searchQuestionByQuestion(question_text)
        .then((questions) => {
            if (questions.length === 0) {
                return res.status(404).json({ message: "No matching questions found." });
            }

            res.status(200).json({
                message: "Matching questions found",
                data: questions
            });
        })
        .catch((err) => {
            res.status(500).json({ error: "Internal server error", details: err.message });
        });
};

//asssign question to exam

exports.assignQuestionToExam = (req, res) => {
    const { examId, questionIds } = req.body;

    if (!examId || !Array.isArray(questionIds) || questionIds.length === 0) {
        return res.status(400).json({ message: "examId and questionIds[] are required." });
    }

    Question.assignQuestionToExam(examId, questionIds)
        .then(result => res.status(200).json(result))
        .catch(error => {
            res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
        });
};


// Search questions by exam name (using params)
exports.searchQuestionByExam = async (req, res) => {
    try {
        const { examName } = req.params;   // ✅ using query string
        //console.log(examName)
        if (!examName) {
            return res.status(400).json({ message: "examName is required in query." });
        }

        const questions = await Question.searchQuestionByExam(examName.trim());

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: `No questions found for exam: ${examName}` });
        }

        res.status(200).json({
            message: "Questions fetched successfully",
            examName,
            total: questions.length,
            questions
        });

    } catch (error) {
        console.error("Error searching questions by exam name:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// search questions by course name
exports.searchQuestionByCourse = (req, res) => {
    const { courseName } = req.params; 

    if (!courseName) {
        return res.status(400).json({ message: "Course name is required in params." });
    }

    Question.searchQuestionByCourse(courseName.trim(), (err, results) => {
        if (err) {
            console.error("Error fetching questions by course:", err);
            return res.status(500).json({ message: "Internal server error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ 
                message: `No questions found for course: ${courseName}` 
            });
        }

        res.status(200).json({
            course: courseName,
            total_questions: results.length,
            questions: results
        });
    });
};


