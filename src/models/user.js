const db = require("../../db");

//user registration
exports.register = (name, email,contact, password, role) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO user (name, email, contact, password, role) VALUES (?, ?, ?, ?,?)",
            [name, email,contact, password, role],
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

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};


