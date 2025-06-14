const express = require('express');
const router = express.Router();
const db = require('../../config');

// Get all departments
router.get('/', async (req, res) => {
    try {
        const [departments] = await db.query('SELECT * FROM departments');
        res.json(departments);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ error: 'Error fetching departments' });
    }
});

// Get a single department by ID
router.get('/:department_id', async (req, res) => {
    try {
        const { department_id } = req.params;
        const [department] = await db.query('SELECT * FROM departments WHERE department_id = ?', [department_id]);
        if (department.length === 0) return res.status(404).json({ error: 'Department not found' });
        res.json(department[0]);
    } catch (error) {
        console.error("Error fetching department:", error);
        res.status(500).json({ error: 'Error fetching department' });
    }
});

// Add a new department
router.post('/', async (req, res) => {
    try {
        const { department_name, head_of_department } = req.body;
        const [result] = await db.query(
            'INSERT INTO departments (department_name, head_of_department) VALUES (?, ?)',
            [department_name, head_of_department]
        );
        res.json({ department_id: result.insertId, department_name, head_of_department });
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ error: 'Error adding department' });
    }
});

// Update a department
router.put('/:department_id', async (req, res) => {
    try {
        const { department_id } = req.params;
        const { department_name, head_of_department } = req.body;
        await db.query(
            'UPDATE departments SET department_name = ?, head_of_department = ? WHERE department_id = ?',
            [department_name, head_of_department, department_id]
        );
        res.json({ department_id, department_name, head_of_department });
    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ error: 'Error updating department' });
    }
});

// Delete a department
router.delete('/:department_id', async (req, res) => {
    try {
        const { department_id } = req.params;
        await db.query('DELETE FROM departments WHERE department_id = ?', [department_id]);
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ error: 'Error deleting department' });
    }
});

module.exports = router;
