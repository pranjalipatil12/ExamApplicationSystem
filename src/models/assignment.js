const db = require("../../db");

// Assign exam to student
exports.assignExamToStudent = (studentId, examScheduleId) => {
  return new Promise((resolve, reject) => {
    // Validate exam_schedule exists
    db.query(
      "SELECT * FROM exam_schedule WHERE exam_schedule_id = ?",
      [examScheduleId],
      (err, exam) => {
        if (err) return reject(err);
        if (exam.length === 0) return reject(new Error("Exam schedule not found"));

        // Check if already assigned
        db.query(
          "SELECT * FROM student_submit WHERE id=? AND exam_schedule_id=?",
          [studentId, examScheduleId],
          (err, existing) => {
            if (err) return reject(err);
            if (existing.length > 0) {
              return reject(new Error("Exam already assigned to this student"));
            }

            // Insert dummy assignment (without answers yet)
            db.query(
              "INSERT INTO student_submit (id, exam_schedule_id, qid, answer) VALUES (?, ?, NULL, NULL)",
              [studentId, examScheduleId],
              (err, result) => {
                if (err) return reject(err);
                resolve({ message: "Exam assigned successfully" });
              }
            );
          }
        );
      }
    );
  });
};

// Get all assigned exams of a student
exports.viewAllAssignExams = (studentId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT ss.student_submit_id, e.title, s.start_time, s.end_time
       FROM student_submit ss
       JOIN exam_schedule es ON ss.exam_schedule_id = es.exam_schedule_id
       JOIN exam e ON es.examid = e.examid
       JOIN schedule s ON es.scheduleid = s.scheduleid
       WHERE ss.id=?`,
      [studentId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
