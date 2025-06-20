const express = require('express');
const router = express.Router();
const db = require('../../config'); // PostgreSQL Pool

// Get all attendance records
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM attendance');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching attendance records:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get attendance record by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM attendance WHERE attendance_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching attendance by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Create a new attendance record
router.post('/', async (req, res) => {
    const { student_id, course_id, attendance_date, status } = req.body;

    if (!student_id || !course_id || !attendance_date || !status) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const formattedDate = new Date(attendance_date).toISOString().split('T')[0];

    // Check for duplicates
    try {
        const duplicateCheck = await db.query(
            'SELECT * FROM attendance WHERE student_id = $1 AND course_id = $2 AND attendance_date = $3',
            [student_id, course_id, formattedDate]
        );

        if (duplicateCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Attendance record already exists for this student on the given date for the course' });
        }
    } catch (error) {
        console.error("Error checking attendance record:", error.message);
        return res.status(500).json({ error: "Database error while checking attendance." });
    }

    try {
        const result = await db.query(
            `INSERT INTO attendance (student_id, course_id, attendance_date, status)
             VALUES ($1, $2, $3, $4) RETURNING attendance_id`,
            [student_id, course_id, formattedDate, status]
        );
        res.status(201).json({ message: 'Attendance record created successfully', attendanceId: result.rows[0].attendance_id });
    } catch (error) {
        console.error("Error adding attendance record:", error.message);
        res.status(500).json({ error: "Failed to add attendance record. Check server logs for more details." });
    }
});

// Update an attendance record
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, attendance_date, status } = req.body;

    if (!student_id || !course_id || !attendance_date || !status) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const formattedDate = new Date(attendance_date).toISOString().split('T')[0];

    try {
        const result = await db.query(
            `UPDATE attendance
             SET student_id = $1, course_id = $2, attendance_date = $3, status = $4
             WHERE attendance_id = $5`,
            [student_id, course_id, formattedDate, status, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.json({ message: 'Attendance record updated successfully' });
    } catch (error) {
        console.error("Error updating attendance record:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Delete an attendance record
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM attendance WHERE attendance_id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        console.error("Error deleting attendance record:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
