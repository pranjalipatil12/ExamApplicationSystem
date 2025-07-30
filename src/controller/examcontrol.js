let promodel = require("../models/user.js");
const db = require("../../db");


exports.homepage = ((req,res) =>{
    if (!req.session.user) {
        return res.redirect('/login'); 
    }
    res.render("home.ejs", { user: req.session.user });
});


//user registration
exports.register = (req, res) => {
    console.log("Received request body:", req.body);

    let { name, email, contact, username, password, role } = req.body;
    
    let promise = promodel.register(name, email, contact, username, password, role);

    promise
        .then(() => {
            console.log("Data saved successfully");
            res.send({ message: "User saved" }); 
        })
        .catch((err) => {
            console.log("Data not saved", err);
            res.send({ error: err.message });
        });
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    let sql = "select * from user where email = ? and password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Login error:", err);
            res.send({ message: "server error" });
            return; // Stop execution
        }

        if (results.length === 0) {
            res.send({ message: "Invalid credentials" });
            return; // Stop execution
        }

        // Set session user info only if user exists
        req.session.user = {
            id: results[0].id,
            email: results[0].email,
            username: results[0].username,
            role: results[0].role
        };

        res.send({
            message: "Login successfully",
            user: req.session.user
        });
    });
}