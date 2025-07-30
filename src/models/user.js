const db = require("../../db");

//user registration
exports.register = (name, email,contact,username, password, role) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO user (name, email, contact, username,password, role) VALUES (?, ?, ?, ?,?,?)",
            [name, email,contact,username, password, role],
            (err, result) => {
                if (err) {
                    console.log("Data not saved");
                    return reject(err);
                }
                console.log("Data saved to DB");
                resolve(result);
            }
        );
    });
};
