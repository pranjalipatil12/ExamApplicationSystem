const db = require("../../db");

// Create exam
exports.createExam = (examName,totalMarks,passingMarks,course) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO exam VALUES ('0',?, ?, ?,?)";
        db.query(query, [examName,totalMarks,passingMarks,course], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// View all exams
exports.viewAllExam = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM exam";
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// View exam by ID
exports.viewExamById = (examid) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM exam WHERE examid = ?", [examid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Update exam by ID
exports.updateExamById = (examName, totalMarks, passingMarks, course, examid) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE exam SET examname = ?, total_marks = ?, passing_marks = ?, course = ? WHERE examid = ?";
        db.query(query, [examName, totalMarks, passingMarks, course, examid], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Delete exam by ID
exports.deleteExamById = (examid) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM exam WHERE examid = ?", [examid], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Search exams by date
exports.searchExamsByDate = (date) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM exam WHERE DATE(created_at) = ?";
        db.query(query, [date], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

