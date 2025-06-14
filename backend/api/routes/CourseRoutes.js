const express = require('express');
const router = express.Router();
const db = require('../../config'); // Assuming your database connection is in config.js

// Get all courses
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM courses');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a course by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM courses WHERE course_id = ?', [id]);
        if (results.length === 0) return res.status(404).json({ message: 'Course not found' });
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new course
router.post('/', async (req, res) => {
    const { course_id, course_name, credits, department_id, semester } = req.body;

    // Validate that all required fields are provided
    if (!course_id || !course_name || !credits || !department_id || !semester) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Format data into a new course object
    const newCourse = { course_id, course_name, credits, department_id, semester };

    try {
        // Insert new course
        const [results] = await db.query('INSERT INTO courses (course_id, course_name, credits, department_id, semester) VALUES (?, ?, ?, ?, ?)', 
            [newCourse.course_id, newCourse.course_name, newCourse.credits, newCourse.department_id, newCourse.semester]);

        res.status(201).json({ message: 'Course created', courseId: results.insertId });
    } catch (error) {
        console.error("Error creating course:", error.message); // Log detailed error
        res.status(500).json({ error: "Failed to create course. Check server logs for more details." });
    }
});

// Update a course
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { course_name, credits, department_id, semester } = req.body;

    // Validate that all required fields are provided
    if (!course_name || !credits || !department_id || !semester) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Prepare the updated course data
    const updatedCourse = { course_name, credits, department_id, semester };

    try {
        // Update course in the database
        const [results] = await db.query('UPDATE courses SET course_name = ?, credits = ?, department_id = ?, semester = ? WHERE course_id = ?', 
            [updatedCourse.course_name, updatedCourse.credits, updatedCourse.department_id, updatedCourse.semester, id]);

        // Check if any rows were affected (i.e., course with given ID exists)
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error("Error updating course:", error.message); // Log detailed error
        res.status(500).json({ error: "Failed to update course. Check server logs for more details." });
    }
});

// Delete a course
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query('DELETE FROM courses WHERE course_id = ?', [id]);

        // Check if any rows were affected (i.e., course with given ID exists)
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error("Error deleting course:", error.message); // Log detailed error
        res.status(500).json({ error: "Failed to delete course. Check server logs for more details." });
    }
});

module.exports = router;
