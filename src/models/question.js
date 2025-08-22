const db = require("../../db");

// Create Question
exports.createQuestion = (data) => {
  const {
    question_text,
    opt1,
    opt2,
    opt3,
    opt4,
    correct_ans,
    exam_schedule_id,
  } = data;
  const query = `
        INSERT INTO question 
        (question_text, opt1, opt2, opt3, opt4, correct_ans, exam_schedule_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [question_text, opt1, opt2, opt3, opt4, correct_ans, exam_schedule_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Get All Questions
exports.viewAllQuestion = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM question", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get Question by ID
exports.viewQuestionById = (qid) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM question WHERE qid = ?", [qid], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Update Question by ID
exports.updateQuestionById = (qid, data) => {
  const {
    question_text,
    opt1,
    opt2,
    opt3,
    opt4,
    correct_ans,
    exam_schedule_id,
  } = data;
  const query = `
        UPDATE question 
        SET question_text = ?, opt1 = ?, opt2 = ?, opt3 = ?, opt4 = ?, correct_ans = ?, exam_schedule_id = ?
        WHERE qid = ?
    `;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        question_text,
        opt1,
        opt2,
        opt3,
        opt4,
        correct_ans,
        exam_schedule_id,
        qid,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Delete Question by ID
exports.deleteQuestionById = (qid) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM question WHERE qid = ?", [qid], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//Search Question By Name

exports.searchQuestionByQuestion = (question_text) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM question WHERE question_text LIKE ?";
    db.query(sql, [`%${question_text}%`], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Assign Question to Exam

exports.assignQuestionToExam = (examId, questionIds) => {
  return new Promise((resolve, reject) => {
    // 1. Check if exam exists
    db.query(
      "SELECT * FROM exam WHERE examid = ?",
      [examId],
      (err, examRows) => {
        if (err)
          return reject({
            status: 500,
            message: "Database error while checking exam",
          });
        if (examRows.length === 0)
          return reject({ status: 404, message: "Exam not found." });

        // 2. Check if schedule is assigned to exam
        db.query(
          "SELECT * FROM exam_schedule WHERE examid = ?",
          [examId],
          (err, scheduleRows) => {
            if (err)
              return reject({
                status: 500,
                message: "Database error while checking exam schedule",
              });
            if (scheduleRows.length === 0)
              return reject({
                status: 404,
                message: "No schedule assigned to this exam.",
              });

            const exam_schedule_id = scheduleRows[0].exam_schedule_id;

            // 3. Validate question IDs (check if they exist)
            db.query(
              "SELECT qid FROM question WHERE qid IN (?)",
              [questionIds],
              (err, validQuestions) => {
                if (err)
                  return reject({
                    status: 500,
                    message: "Database error while validating question IDs",
                  });

                const validQids = validQuestions.map((q) => q.qid);
                const invalidQids = questionIds.filter(
                  (qid) => !validQids.includes(qid)
                );
                if (invalidQids.length > 0) {
                  return reject({
                    status: 400,
                    message: `Invalid question IDs: ${invalidQids.join(", ")}`,
                  });
                }

                // 4. Check for duplicates (questions already assigned to this exam)
                db.query(
                  "SELECT qid FROM question WHERE exam_schedule_id = ? AND qid IN (?)",
                  [exam_schedule_id, questionIds],
                  (err, assignedQuestions) => {
                    if (err)
                      return reject({
                        status: 500,
                        message:
                          "Database error while checking assigned questions",
                      });

                    const duplicateQids = assignedQuestions.map((q) => q.qid);
                    if (duplicateQids.length > 0) {
                      return reject({
                        status: 409,
                        message: `These question IDs are already assigned to this exam: ${duplicateQids.join(
                          ", "
                        )}`,
                      });
                    }

                    // 5. Assign questions to exam
                    let remaining = questionIds.length;
                    questionIds.forEach((qid) => {
                      db.query(
                        "UPDATE question SET exam_schedule_id = ? WHERE qid = ?",
                        [exam_schedule_id, qid],
                        (err) => {
                          if (err)
                            return reject({
                              status: 500,
                              message: "Error assigning question ID " + qid,
                            });

                          remaining--;
                          if (remaining === 0) {
                            return resolve({
                              message: `Successfully assigned ${questionIds.length} question(s) to exam.`,
                              exam_schedule_id,
                            });
                          }
                        }
                      );
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};


exports.searchQuestionByExam = (examName) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT q.qid, q.question_text, q.opt1, q.opt2, q.opt3, q.opt4, q.correct_ans, e.title
            FROM question q
            JOIN exam_schedule es ON q.exam_schedule_id = es.exam_schedule_id
            JOIN exam e ON es.examid = e.examid
            WHERE e.title = ?`;   // ✅ use placeholder

        db.query(query, [examName], (err, results) => {
            if (err) {
                console.log(err);
                return reject(err);
            } 
            resolve(results);
        });
    });
};


// Search questions by course name
exports.searchQuestionByCourse = (courseName, callback) => {
    const query = `
        SELECT q.qid, q.question_text, q.opt1, q.opt2, q.opt3, q.opt4, q.correct_ans
        FROM question q
        JOIN exam_schedule es ON q.exam_schedule_id = es.exam_schedule_id
        JOIN schedule s ON es.scheduleid = s.scheduleid
        JOIN course c ON s.courseid = c.courseid
        WHERE LOWER(c.cname) = LOWER(?)
    `;
    db.query(query, [courseName], callback);
};
