const Course = require("../models/course");

// Create Course
exports.createCourse = (req, res) => {
    const { cname } = req.body;

    if (!cname) {
        return res.status(400).json({ error: "Course name is required" });
    }

    Course.createCourse(cname)
        .then(result => res.json({ message: "Course created", courseid: result.insertId }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// View All Courses
exports.viewAllCourses = (req, res) => {
    Course.viewAllCourses()
        .then(results => res.json({ courses: results }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// View Course by ID
exports.viewCourseById = (req, res) => {
    const { courseid } = req.body;
    
    if (!courseid) return res.status(400).json({ error: "Course ID is required" });

    Course.viewCourseById(courseid)
        .then(result => res.json({ course: result }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Update Course
exports.updateCourseById = (req, res) => {
    const { courseid, cname } = req.body;

    if (!courseid || !cname) {
        return res.status(400).json({ error: "Both Course ID and name are required" });
    }

    Course.updateCourseById(courseid, cname)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Course not found" });
            }
            res.json({ message: "Course updated" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Delete Course
exports.deleteCourseById = (req, res) => {
    const { courseid } = req.body;

    if (!courseid) return res.status(400).json({ error: "Course ID is required" });

    Course.deleteCourseById(courseid)
        .then(result => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Course not found" });
            }
            res.json({ message: "Course deleted" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Search Subject by Name
exports.searchSubjectByName = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Subject name is required in query" });
    }

    Course.searchSubjectByName(name, (err, results) => {
        if (err) {
            console.error("Error searching subject:", err);
            return res.status(500).json({ error: "Database error while searching subject" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No subject found with this name" });
        }

        res.status(200).json({ subjects: results });
    });
};

