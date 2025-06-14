const express = require('express');
const router = express.Router();
const db = require('../../config');

// Get all enrollments
router.get('/', async (req, res) => {
    try {
        const [enrollments] = await db.query('SELECT * FROM enrollment');
        res.json(enrollments);
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ error: 'Error fetching enrollments' });
    }
});

// Get a single enrollment by ID
router.get('/:enrollment_id', async (req, res) => {
    try {
        const { enrollment_id } = req.params;
        const [enrollment] = await db.query('SELECT * FROM enrollment WHERE enrollment_id = ?', [enrollment_id]);
        if (enrollment.length === 0) return res.status(404).json({ error: 'Enrollment not found' });
        res.json(enrollment[0]);
    } catch (error) {
        console.error("Error fetching enrollment:", error);
        res.status(500).json({ error: 'Error fetching enrollment' });
    }
});

// Add a new enrollment
router.post('/', async (req, res) => {
    try {
        const { student_id, course_id, enrollment_date, grade } = req.body;
        const [result] = await db.query(
            'INSERT INTO enrollment (student_id, course_id, enrollment_date, grade) VALUES (?, ?, ?, ?)',
            [student_id, course_id, enrollment_date, grade]
        );
        res.json({ enrollment_id: result.insertId, student_id, course_id, enrollment_date, grade });
    } catch (error) {
        console.error("Error adding enrollment:", error);
        res.status(500).json({ error: 'Error adding enrollment' });
    }
});

// Update an enrollment
router.put('/:enrollment_id', async (req, res) => {
    try {
        const { enrollment_id } = req.params;
        const { student_id, course_id, enrollment_date, grade } = req.body;
        await db.query(
            'UPDATE enrollment SET student_id = ?, course_id = ?, enrollment_date = ?, grade = ? WHERE enrollment_id = ?',
            [student_id, course_id, enrollment_date, grade, enrollment_id]
        );
        res.json({ enrollment_id, student_id, course_id, enrollment_date, grade });
    } catch (error) {
        console.error("Error updating enrollment:", error);
        res.status(500).json({ error: 'Error updating enrollment' });
    }
});

// Delete an enrollment
router.delete('/:enrollment_id', async (req, res) => {
    try {
        const { enrollment_id } = req.params;
        await db.query('DELETE FROM enrollment WHERE enrollment_id = ?', [enrollment_id]);
        res.json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        console.error("Error deleting enrollment:", error);
        res.status(500).json({ error: 'Error deleting enrollment' });
    }
});

module.exports = router;