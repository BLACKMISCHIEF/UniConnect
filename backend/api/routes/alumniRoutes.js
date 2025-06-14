const express = require('express');
const router = express.Router();
const db = require('../../config');

// Get all alumni
router.get('/', async (req, res) => {
    try {
        const [alumni] = await db.query('SELECT * FROM alumni');
        res.json(alumni);
    } catch (error) {
        console.error("Error fetching alumni:", error);
        res.status(500).json({ error: 'Error fetching alumni data' });
    }
});

// Get a single alumnus by ID
router.get('/:alumni_id', async (req, res) => {
    try {
        const { alumni_id } = req.params;
        const [alumnus] = await db.query('SELECT * FROM alumni WHERE alumni_id = ?', [alumni_id]);
        if (alumnus.length === 0) return res.status(404).json({ error: 'Alumnus not found' });
        res.json(alumnus[0]);
    } catch (error) {
        console.error("Error fetching alumnus:", error);
        res.status(500).json({ error: 'Error fetching alumnus data' });
    }
});

// Add a new alumnus
router.post('/', async (req, res) => {
    try {
        const { student_id, graduation_year, current_job_title, company } = req.body;
        const [result] = await db.query(
            'INSERT INTO alumni (student_id, graduation_year, current_job_title, company) VALUES (?, ?, ?, ?)',
            [student_id, graduation_year, current_job_title, company]
        );
        res.json({ alumni_id: result.insertId, student_id, graduation_year, current_job_title, company });
    } catch (error) {
        console.error("Error adding alumnus:", error);
        res.status(500).json({ error: 'Error adding alumnus data' });
    }
});

// Update an alumnus
router.put('/:alumni_id', async (req, res) => {
    try {
        const { alumni_id } = req.params;
        const { student_id, graduation_year, current_job_title, company } = req.body;
        await db.query(
            'UPDATE alumni SET student_id = ?, graduation_year = ?, current_job_title = ?, company = ? WHERE alumni_id = ?',
            [student_id, graduation_year, current_job_title, company, alumni_id]
        );
        res.json({ alumni_id, student_id, graduation_year, current_job_title, company });
    } catch (error) {
        console.error("Error updating alumnus:", error);
        res.status(500).json({ error: 'Error updating alumnus data' });
    }
});

// Delete an alumnus
router.delete('/:alumni_id', async (req, res) => {
    try {
        const { alumni_id } = req.params;
        await db.query('DELETE FROM alumni WHERE alumni_id = ?', [alumni_id]);
        res.json({ message: 'Alumnus deleted successfully' });
    } catch (error) {
        console.error("Error deleting alumnus:", error);
        res.status(500).json({ error: 'Error deleting alumnus data' });
    }
});

module.exports = router;
