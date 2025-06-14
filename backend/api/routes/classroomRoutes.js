// const express = require('express');
// const router = express.Router();
// const db = require('../../config'); // Assuming you have a database connection in config.js

// // Get all classrooms
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM classrooms', (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         res.json(results);
//     });
// });

// // Get a classroom by ID
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('SELECT * FROM classrooms WHERE classroom_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.length === 0) return res.status(404).json({ message: 'Classroom not found' });
//         res.json(results[0]);
//     });
// });

// // Create a new classroom (no auto-increment on classroom_id)
// router.post('/', (req, res) => {
//     const { classroom_id, building, room_number, capacity } = req.body;
    
//     // Validate that all fields are present
//     if (!classroom_id || !building || !room_number || !capacity) {
//         return res.status(400).json({ message: 'All fields (classroom_id, building, room_number, capacity) are required' });
//     }

//     // Check if the classroom_id already exists
//     db.query('SELECT * FROM classrooms WHERE classroom_id = ?', [classroom_id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.length > 0) return res.status(400).json({ message: 'Classroom ID already exists' });

//         const newClassroom = { classroom_id, building, room_number, capacity };
//         db.query('INSERT INTO classrooms SET ?', newClassroom, (error, results) => {
//             if (error) return res.status(500).json({ error: error.message });
//             res.status(201).json({ message: 'Classroom created', classroomId: classroom_id });
//         });
//     });
// });

// // Update a classroom (no auto-increment on classroom_id)
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { classroom_id, building, room_number, capacity } = req.body;
    
//     // Ensure that classroom_id matches the one in the URL
//     if (classroom_id !== id) {
//         return res.status(400).json({ message: 'Classroom ID in request body does not match URL parameter' });
//     }

//     // Validate that all fields are present for update
//     if (!building || !room_number || !capacity) {
//         return res.status(400).json({ message: 'Building, room_number, and capacity are required' });
//     }

//     const updatedClassroom = { building, room_number, capacity };

//     db.query('UPDATE classrooms SET ? WHERE classroom_id = ?', [updatedClassroom, id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Classroom not found' });
//         res.json({ message: 'Classroom updated' });
//     });
// });

// // Delete a classroom
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM classrooms WHERE classroom_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Classroom not found' });
//         res.json({ message: 'Classroom deleted' });
//     });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../../config'); // Your database connection from config.js

// // Get all classrooms
// router.get('/', async (req, res) => {
//     try {
//         const [results] = await db.query('SELECT * FROM classrooms');
//         res.json(results);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get a classroom by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [results] = await db.query('SELECT * FROM classrooms WHERE classroom_id = ?', [id]);
//         if (results.length === 0) return res.status(404).json({ message: 'Classroom not found' });
//         res.json(results[0]);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Create a new classroom
// router.post('/', async (req, res) => {
//     try {
//         const { classroom_id, building, room_number, capacity } = req.body;
//         const [existingClassroom] = await db.query('SELECT * FROM classrooms WHERE classroom_id = ?', [classroom_id]);
//         if (existingClassroom.length > 0) return res.status(400).json({ message: 'Classroom ID already exists' });

//         const newClassroom = { classroom_id, building, room_number, capacity };
//         await db.query('INSERT INTO classrooms SET ?', newClassroom);
//         res.status(201).json({ message: 'Classroom created', classroomId: classroom_id });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update a classroom
// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { classroom_id, building, room_number, capacity } = req.body;
//         if (classroom_id !== id) return res.status(400).json({ message: 'Classroom ID in request body does not match URL parameter' });

//         const updatedClassroom = { building, room_number, capacity };
//         const [results] = await db.query('UPDATE classrooms SET ? WHERE classroom_id = ?', [updatedClassroom, id]);
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Classroom not found' });
//         res.json({ message: 'Classroom updated' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete a classroom
// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [results] = await db.query('DELETE FROM classrooms WHERE classroom_id = ?', [id]);
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Classroom not found' });
//         res.json({ message: 'Classroom deleted' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../../config'); // Your database connection from config.js

// Get all classrooms
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM classrooms');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a classroom by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM classrooms WHERE classroom_id = ?', [id]);
        if (results.length === 0) return res.status(404).json({ message: 'Classroom not found' });
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new classroom
router.post('/', async (req, res) => {
    try {
        const { classroom_id, building, room_number, capacity } = req.body;

        // Check if the classroom ID already exists
        const [existingClassroom] = await db.query('SELECT * FROM classrooms WHERE classroom_id = ?', [classroom_id]);
        if (existingClassroom.length > 0) return res.status(400).json({ message: 'Classroom ID already exists' });

        // Insert new classroom
        const newClassroom = { classroom_id, building, room_number, capacity };
        await db.query('INSERT INTO classrooms SET ?', newClassroom);

        res.status(201).json({ message: 'Classroom created', classroomId: classroom_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { building, room_number, capacity } = req.body;

        // No need to check classroom_id in body; just use the ID from the URL
        const updatedClassroom = { building, room_number, capacity };
        const [results] = await db.query('UPDATE classrooms SET ? WHERE classroom_id = ?', [updatedClassroom, id]);

        if (results.affectedRows === 0) return res.status(404).json({ message: 'Classroom not found' });

        res.json({ message: 'Classroom updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a classroom
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('DELETE FROM classrooms WHERE classroom_id = ?', [id]);

        if (results.affectedRows === 0) return res.status(404).json({ message: 'Classroom not found' });

        res.json({ message: 'Classroom deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
