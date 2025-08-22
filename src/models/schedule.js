const db = require("../../db");

// Create schedule
exports.createSchedule = (start_time, end_time, userId, courseId) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO schedule (start_time, end_time, id, courseid) VALUES (?, ?, ?, ?)";
        db.query(query, [start_time, end_time, userId, courseId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// View all schedules
exports.viewAllSchedule = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM schedule";
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// View schedule by scheduleid
exports.viewScheduleById = (scheduleid) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM schedule WHERE scheduleid = ?", [scheduleid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Update schedule by scheduleid
exports.updateScheduleById = (scheduleid, start_time, end_time, courseId) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE schedule SET start_time = ?, end_time = ?, courseid = ? WHERE scheduleid = ?";
        db.query(query, [start_time, end_time, courseId, scheduleid], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Delete schedule by scheduleid
exports.deleteScheduleById = (scheduleid) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM schedule WHERE scheduleid = ?", [scheduleid], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Search schedule by date (from created_at)
exports.searchScheduleByDate = (date) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM schedule WHERE DATE(created_at) = ?", [date], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
