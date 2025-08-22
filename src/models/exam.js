const db = require("../../db");

// Create exam
exports.createExam = (title, total_marks, passing_marks) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO exam (title, total_marks, passing_marks) VALUES (?, ?, ?)";
        db.query(query, [title, total_marks, passing_marks], (err, result) => {
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
exports.updateExamById = (examid, title, total_marks, passing_marks) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE exam SET title = ?, total_marks = ?, passing_marks = ? WHERE examid = ?";
        db.query(query, [title, total_marks, passing_marks, examid], (err, result) => {
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

