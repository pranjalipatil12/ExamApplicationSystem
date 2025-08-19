const Schedule = require("../models/schedule.js");

// const schedule = require("../models/schedule");

// Function to create a schedule
exports.createSchedule = (req, res) => {
    const { date, start_time, end_time, id } = req.body;

    Schedule.create(date, start_time, end_time, id)
        .then(result => {
            res.send({ message: "Schedule created", scid: result.insertId });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};