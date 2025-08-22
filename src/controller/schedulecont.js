const Schedule = require("../models/schedule.js");

// const schedule = require("../models/schedule");

// Function to create a schedule
exports.createSchedule = (req, res) => {
    const { date, start_time, end_time, id } = req.body;

    Schedule.create(date, start_time, end_time, id)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No schedule found with this ID" });
            }
            res.json({ message: "Schedule deleted successfully" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Search by created_at date
exports.searchScheduleByDate = (req, res) => {
    const date = req.body.date;
    if (!date) return res.status(400).json({ error: "Date is required in query." });

    Schedule.searchScheduleByDate(date)
        .then(result => res.json({ schedules: result }))
        .catch(err => res.status(400).json({ error: err.message }));
};
