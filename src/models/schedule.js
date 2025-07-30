const db = require("../../db");

// Create schedule function
exports.create = (date, start_time, end_time, id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO schedule (date, start_time, end_time, id) VALUES (?, ?, ?, ?)";
        db.query(sql, [date, start_time, end_time, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};