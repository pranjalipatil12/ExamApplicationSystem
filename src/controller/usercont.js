let promodel = require("../models/user.js");
const db = require("../../db.js");


exports.homepage = ((req,res) =>{
    res.render("home.ejs");
});


//user registration
exports.register = (req, res) => {
    console.log("Received request body:", req.body);

    let { name, email, contact, password, role } = req.body;
    
    let promise = promodel.register(name, email, contact, password, role);

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

//user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // call model
    const results = await promodel.login(email, password);

    // check user exist
    if (results.length === 0) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    return res.status(200).send({
      message: "Login successfully",
      user: results[0],   // send user details from DB
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Server error" });
  }
};