const express = require('express');
const router = express.Router();
const db = require('../../config');

// Get all students
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM students');
        res.json(results);
    } catch (error) {
        console.error("Error fetching students:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

// Get a specific student by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM students WHERE student_id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error("Error fetching student by ID:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

// Add a new student
router.post('/', async (req, res) => {
    const { student_id, name, date_of_birth, email, phone_number, admission_year, department_id } = req.body;

    // Check if all fields are provided
    if (!student_id || !name || !date_of_birth || !email || !phone_number || !admission_year || !department_id) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone number (if needed)
    const phoneRegex = /^[0-9]+$/; // simple check for digits only
    if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({ error: 'Phone number must contain only digits' });
    }

    // Check if student_id already exists
    try {
        const checkStudentIdExists = await db.query('SELECT * FROM students WHERE student_id = ?', [student_id]);
        if (checkStudentIdExists[0].length > 0) {
            return res.status(400).json({ error: 'Student ID already exists.' });
        }
    } catch (error) {
        console.error("Error checking student ID:", error.message);
        return res.status(500).json({ error: "Database error while checking student ID." });
    }

    // Format the date
    const formattedDateOfBirth = new Date(date_of_birth).toISOString().split('T')[0];

    // Create the student object to insert
    const student = { student_id, name, date_of_birth: formattedDateOfBirth, email, phone_number, admission_year, department_id };

    try {
        const [results] = await db.query('INSERT INTO students SET ?', student);
        res.json({ message: 'Student added successfully', studentId: results.insertId });
    } catch (error) {
        console.error("Error adding student:", error.message); // Detailed error logging
        res.status(500).json({ error: "Failed to add student. Check server logs for more details." });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, date_of_birth, email, phone_number, admission_year, department_id } = req.body;

    // Check if the fields are provided
    if (!name || !date_of_birth || !email || !phone_number || !admission_year || !department_id) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone number (if needed)
    const phoneRegex = /^[0-9]+$/; // simple check for digits only
    if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({ error: 'Phone number must contain only digits' });
    }

    // Format the date
    const formattedDateOfBirth = new Date(date_of_birth).toISOString().split('T')[0];

    const sql = 'UPDATE students SET name = ?, date_of_birth = ?, email = ?, phone_number = ?, admission_year = ?, department_id = ? WHERE student_id = ?';
    
    try {
        const [results] = await db.query(sql, [name, formattedDateOfBirth, email, phone_number, admission_year, department_id, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error("Error updating student:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('DELETE FROM students WHERE student_id = ?', [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error("Error deleting student:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
