// // // const express = require('express');
// // const router = express.Router();
// // const db = require('../../config'); // Assuming your database connection is set up in config.js

// // // Get all attendance records
// // router.get('/', async (req, res) => {
// //     try {
// //         const [results] = await db.query('SELECT * FROM attendance');
// //         res.json(results);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // Get attendance record by ID
// // router.get('/:id', async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const [results] = await db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
// //         if (results.length === 0) return res.status(404).json({ message: 'Attendance record not found' });
// //         res.json(results[0]);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // Create a new attendance record
// // router.post('/', async (req, res) => {
// //     try {
// //         const { student_id, course_id, attendance_date, status } = req.body;
// //         const [existingRecord] = await db.query('SELECT * FROM attendance WHERE student_id = ? AND course_id = ? AND attendance_date = ?', [student_id, course_id, attendance_date]);
// //         if (existingRecord.length > 0) return res.status(400).json({ message: 'Attendance record already exists for this student on the given date for the course' });

// //         const [result] = await db.query('INSERT INTO attendance (student_id, course_id, attendance_date, status) VALUES (?, ?, ?, ?)', 
// //             [student_id, course_id, attendance_date, status]);

// //         res.status(201).json({
// //             message: 'Attendance record created successfully',
// //             attendanceId: result.insertId,
// //         });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // Update an attendance record
// // router.put('/:id', async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const { student_id, course_id, attendance_date, status } = req.body;
        
// //         const [results] = await db.query('UPDATE attendance SET student_id = ?, course_id = ?, attendance_date = ?, status = ? WHERE attendance_id = ?', 
// //             [student_id, course_id, attendance_date, status, id]);

// //         if (results.affectedRows === 0) return res.status(404).json({ message: 'Attendance record not found' });
        
// //         res.json({ message: `Attendance record with ID: ${id} updated successfully` });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // Delete an attendance record
// // router.delete('/:id', async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const [results] = await db.query('DELETE FROM attendance WHERE attendance_id = ?', [id]);
        
// //         if (results.affectedRows === 0) return res.status(404).json({ message: 'Attendance record not found' });
        
// //         res.json({ message: `Attendance record with ID: ${id} deleted successfully` });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // module.exports = router;



// const express = require('express');
// const router = express.Router();
// const db = require('../../config'); // Assuming your database connection is set up in config.js

// // Get all attendance records
// router.get('/', async (req, res) => {
//     try {
//         const [results] = await db.query('SELECT * FROM attendance');
//         res.json(results);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get attendance record by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [results] = await db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
//         if (results.length === 0) return res.status(404).json({ message: 'Attendance record not found' });
//         res.json(results[0]);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Create a new attendance record
// router.post('/', async (req, res) => {
//     try {
//         const { student_id, course_id, attendance_date, status } = req.body;
//         const [existingRecord] = await db.query('SELECT * FROM attendance WHERE student_id = ? AND course_id = ? AND attendance_date = ?', [student_id, course_id, attendance_date]);
//         if (existingRecord.length > 0) return res.status(400).json({ message: 'Attendance record already exists for this student on the given date for the course' });

//         const [result] = await db.query('INSERT INTO attendance (student_id, course_id, attendance_date, status) VALUES (?, ?, ?, ?)', 
//             [student_id, course_id, attendance_date, status]);

//         res.status(201).json({
//             message: 'Attendance record created successfully',
//             attendanceId: result.insertId,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update an attendance record
// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { student_id, course_id, attendance_date, status } = req.body;
        
//         const [results] = await db.query('UPDATE attendance SET student_id = ?, course_id = ?, attendance_date = ?, status = ? WHERE attendance_id = ?', 
//             [student_id, course_id, attendance_date, status, id]);

//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Attendance record not found' });
        
//         res.json({ message: `Attendance record with ID: ${id} updated successfully` });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete an attendance record
// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [results] = await db.query('DELETE FROM attendance WHERE attendance_id = ?', [id]);
        
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Attendance record not found' });
        
//         res.json({ message: `Attendance record with ID: ${id} deleted successfully` });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('../../config');

// Get all attendance records
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM attendance');
        res.json(results);
    } catch (error) {
        console.error("Error fetching attendance records:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

// Get attendance record by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error("Error fetching attendance by ID:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

// Create a new attendance record
router.post('/', async (req, res) => {
    const { student_id, course_id, attendance_date, status } = req.body;

    // Check if all required fields are provided
    if (!student_id || !course_id || !attendance_date || !status) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Check if attendance record already exists
    try {
        const [existingRecord] = await db.query('SELECT * FROM attendance WHERE student_id = ? AND course_id = ? AND attendance_date = ?', 
            [student_id, course_id, attendance_date]);

        if (existingRecord.length > 0) {
            return res.status(400).json({ error: 'Attendance record already exists for this student on the given date for the course' });
        }
    } catch (error) {
        console.error("Error checking attendance record:", error.message); // Detailed error logging
        return res.status(500).json({ error: "Database error while checking attendance." });
    }

    // Format the attendance date if needed
    const formattedDate = new Date(attendance_date).toISOString().split('T')[0];

    const attendance = { student_id, course_id, attendance_date: formattedDate, status };

    try {
        const [results] = await db.query('INSERT INTO attendance SET ?', attendance);
        res.json({ message: 'Attendance record created successfully', attendanceId: results.insertId });
    } catch (error) {
        console.error("Error adding attendance record:", error.message); // Detailed error logging
        res.status(500).json({ error: "Failed to add attendance record. Check server logs for more details." });
    }
});

// Update an attendance record
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, attendance_date, status } = req.body;

    // Check if the fields are provided
    if (!student_id || !course_id || !attendance_date || !status) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Format the attendance date if needed
    const formattedDate = new Date(attendance_date).toISOString().split('T')[0];

    try {
        const [results] = await db.query('UPDATE attendance SET student_id = ?, course_id = ?, attendance_date = ?, status = ? WHERE attendance_id = ?', 
            [student_id, course_id, formattedDate, status, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.json({ message: 'Attendance record updated successfully' });
    } catch (error) {
        console.error("Error updating attendance record:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

// Delete an attendance record
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('DELETE FROM attendance WHERE attendance_id = ?', [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        console.error("Error deleting attendance record:", error.message); // Detailed error logging
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
