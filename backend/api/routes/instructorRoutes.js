const express = require('express');
const router = express.Router();
const db = require('../../config');// Ensure db connection is set in config.js

// Get all instructors
router.get('/', (req, res) => {
    db.query('SELECT * FROM instructors', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});

// Get an instructor by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM instructors WHERE instructor_id = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.length === 0) return res.status(404).json({ message: 'Instructor not found' });
        res.json(results[0]);
    });
});

// Add a new instructor
router.post('/', (req, res) => {
    const { name, email, phone_number, hire_date, department_id } = req.body;
    const newInstructor = { name, email, phone_number, hire_date, department_id };

    db.query('INSERT INTO instructors (name, email, phone_number, hire_date, department_id) VALUES (?, ?, ?, ?, ?)', 
        [newInstructor.name, newInstructor.email, newInstructor.phone_number, newInstructor.hire_date, newInstructor.department_id], 
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(201).json({ message: 'Instructor added', instructorId: results.insertId });
        }
    );
});

// Update an instructor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, hire_date, department_id } = req.body;
    const updatedInstructor = { name, email, phone_number, hire_date, department_id };

    db.query('UPDATE instructors SET name = ?, email = ?, phone_number = ?, hire_date = ?, department_id = ? WHERE instructor_id = ?', 
        [updatedInstructor.name, updatedInstructor.email, updatedInstructor.phone_number, updatedInstructor.hire_date, updatedInstructor.department_id, id], 
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Instructor not found' });
            res.json({ message: 'Instructor updated' });
        }
    );
});

// Delete an instructor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM instructors WHERE instructor_id = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Instructor not found' });
        res.json({ message: 'Instructor deleted' });
    });
});

module.exports = router;
