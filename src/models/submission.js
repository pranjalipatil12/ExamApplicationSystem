const db = require("../../db");

// Submit exam answers
exports.submitExamAnswers = (studentId, examScheduleId, answers) => {
  return new Promise((resolve, reject) => {
    // Validate assigned exam
    db.query(
      "SELECT * FROM student_submit WHERE id=? AND exam_schedule_id=?",
      [studentId, examScheduleId],
      (err, assigned) => {
        if (err) return reject(err);
        if (assigned.length === 0)
          return reject(new Error("Exam not assigned to this student"));

        // Save submitted answers
        const insertValues = answers.map((a) => [
          studentId,
          examScheduleId,
          a.qid,
          a.answer,
        ]);

        db.query(
          "INSERT INTO student_submit (id, exam_schedule_id, qid, answer) VALUES ?",
          [insertValues],
          (err) => {
            if (err) return reject(err);

            // Dummy evaluation logic
            let totalScored = answers.length * 1; // 1 mark per correct (mock)
            let result = totalScored >= 5 ? "Pass" : "Fail";

            // Insert into final_result
            db.query(
              "INSERT INTO final_result (id, student_submit_id, total_scored, result) VALUES (?, ?, ?, ?)",
              [studentId, assigned[0].student_submit_id, totalScored, result],
              (err2) => {
                if (err2) return reject(err2);
                resolve({ message: "Exam submitted", totalScored, result });
              }
            );
          }
        );
      }
    );
  });
};

// Fetch exam result
exports.getExamResult = (studentId, examScheduleId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT fr.rid, fr.total_scored, fr.result, fr.generated_at
       FROM final_result fr
       JOIN student_submit ss ON fr.student_submit_id = ss.student_submit_id
       WHERE ss.id=? AND ss.exam_schedule_id=?`,
      [studentId, examScheduleId],
      (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return reject(new Error("Result not found"));
        resolve(results[0]);
      }
    );
  });
};
