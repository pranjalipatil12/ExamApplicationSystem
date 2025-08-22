const Schedule = require("../models/schedule");

// Create schedule
exports.createSchedule = (req, res) => {
    const userId = req.session?.user?.id || req.body.id;
    const { start_time, end_time, courseid } = req.body;

    if (!userId) return res.status(401).json({ error: "Unauthorized. Please log in." });
    if (!start_time || !end_time || !courseid) {
        return res.status(400).json({ error: "start_time, end_time, and courseid are required." });
    }

    Schedule.createSchedule(start_time, end_time, userId, courseid)
        .then(result => res.status(201).json({ message: "Schedule created", scheduleid: result.insertId }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// View all schedules
exports.viewAllSchedule = (req, res) => {
    Schedule.viewAllSchedule()
        .then(schedule => res.json({ schedule }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// View by schedule ID
exports.viewScheduleById = (req, res) => {
 const scheduleid = parseInt(req.body.scheduleid);
    if (!scheduleid || isNaN(scheduleid)) {
        return res.status(400).json({ error: "Valid 'scheduleid' is required in query." });
    }

    Schedule.viewScheduleById(scheduleid)
        .then(result => res.json({ schedule: result }))
        .catch(err => res.status(400).json({ error: err.message }));
};

// Update schedule
exports.updateScheduleById = (req, res) => {
    const { scheduleid, start_time, end_time, courseid } = req.body;

    if (!scheduleid) return res.status(400).json({ error: "scheduleid is required to update schedule." });

    Schedule.updateScheduleById(scheduleid, start_time, end_time, courseid)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No schedule found with this ID" });
            }
            res.json({ message: "Schedule updated successfully" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Delete schedule
exports.deleteScheduleById = (req, res) => {
    const scheduleid = parseInt(req.body.scheduleid);

    if (!scheduleid || isNaN(scheduleid)) {
        return res.status(400).json({ error: "Valid 'scheduleid' query param is required" });
    }

    Schedule.deleteScheduleById(scheduleid)
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
