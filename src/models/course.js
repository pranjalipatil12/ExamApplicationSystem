const db = require("../../db");

// Create course
exports.createCourse = (cname) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO course (cname) VALUES (?)";
        db.query(query, [cname], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// View all courses
exports.viewAllCourses = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM course", (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// View course by ID
exports.viewCourseById = (courseid) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM course WHERE courseid = ?", [courseid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


// Update course by ID
exports.updateCourseById = (courseid, cname) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE course SET cname = ? WHERE courseid = ?";
        db.query(query, [cname, courseid], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Delete course by ID
exports.deleteCourseById = (courseid) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM course WHERE courseid = ?", [courseid], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Search subject by name
exports.searchSubjectByName = (name, callback) => {
    const sql = "SELECT * FROM course WHERE cname LIKE ?";
    db.query(sql, [`%${name}%`], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
