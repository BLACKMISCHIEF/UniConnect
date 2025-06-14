// const express = require('express');
// const router = express.Router();
// const db = require('../../config'); // Assuming your database connection is in config.js

// // Get all enrollments
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM enrollments', (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         res.json(results);
//     });
// });

// // Get an enrollment by ID
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('SELECT * FROM enrollments WHERE enrollment_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.length === 0) return res.status(404).json({ message: 'Enrollment not found' });
//         res.json(results[0]);
//     });
// });

// // Create a new enrollment
// router.post('/', (req, res) => {
//     const { student_id, course_id, enrollment_date, grade } = req.body;
//     const newEnrollment = { student_id, course_id, enrollment_date, grade };

//     db.query('INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES (?, ?, ?, ?)', 
//         [newEnrollment.student_id, newEnrollment.course_id, newEnrollment.enrollment_date, newEnrollment.grade], 
//         (error, results) => {
//             if (error) return res.status(500).json({ error: error.message });
//             res.status(201).json({ message: 'Enrollment created', enrollmentId: results.insertId });
//         }
//     );
// });

// // Update an enrollment
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { student_id, course_id, enrollment_date, grade } = req.body;
//     const updatedEnrollment = { student_id, course_id, enrollment_date, grade };

//     db.query('UPDATE enrollments SET student_id = ?, course_id = ?, enrollment_date = ?, grade = ? WHERE enrollment_id = ?', 
//         [updatedEnrollment.student_id, updatedEnrollment.course_id, updatedEnrollment.enrollment_date, updatedEnrollment.grade, id], 
//         (error, results) => {
//             if (error) return res.status(500).json({ error: error.message });
//             if (results.affectedRows === 0) return res.status(404).json({ message: 'Enrollment not found' });
//             res.json({ message: 'Enrollment updated' });
//         }
//     );
// });

// // Delete an enrollment
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM enrollments WHERE enrollment_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Enrollment not found' });
//         res.json({ message: 'Enrollment deleted' });
//     });
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const db = require('../../config'); // Assuming your database connection is in config.js

// // Get all enrollments
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM enrollments', (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         res.json(results);
//     });
// });

// // Get an enrollment by ID
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('SELECT * FROM enrollments WHERE enrollment_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.length === 0) return res.status(404).json({ message: 'Enrollment not found' });
//         res.json(results[0]);
//     });
// });

// // Create a new enrollment
// router.post('/', (req, res) => {
//     const { student_id, course_id, enrollment_date, grade } = req.body;

//     if (!student_id || !course_id || !enrollment_date || !grade) {
//         return res.status(400).json({ error: 'Missing required fields: student_id, course_id, enrollment_date, grade' });
//     }

//     const newEnrollment = { student_id, course_id, enrollment_date, grade };

//     db.query('INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES (?, ?, ?, ?)', 
//         [newEnrollment.student_id, newEnrollment.course_id, newEnrollment.enrollment_date, newEnrollment.grade], 
//         (error, results) => {
//             if (error) return res.status(500).json({ error: error.message });
//             res.status(201).json({ message: 'Enrollment created', enrollmentId: results.insertId });
//         }
//     );
// });

// // Update an enrollment
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { student_id, course_id, enrollment_date, grade } = req.body;

//     if (!student_id || !course_id || !enrollment_date || !grade) {
//         return res.status(400).json({ error: 'Missing required fields: student_id, course_id, enrollment_date, grade' });
//     }

//     const updatedEnrollment = {student_id, course_id, enrollment_date, grade };

//     db.query('UPDATE enrollments SET student_id = ?, cou    rse_id = ?, enrollment_date = ?, grade = ? WHERE enrollment_id = ?', 
//         [updatedEnrollment.student_id, updatedEnrollment.course_id, updatedEnrollment.enrollment_date, updatedEnrollment.grade, id], 
//         (error, results) => {
//             if (error) return res.status(500).json({ error: error.message });
//             if (results.affectedRows === 0) return res.status(404).json({ message: 'Enrollment not found' });
//             res.json({ message: 'Enrollment updated' });
//         }
//     );
// });

// // Delete an enrollment
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM enrollments WHERE enrollment_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Enrollment not found' });
//         res.json({ message: 'Enrollment deleted' });
//     });
// });

// module.exports = router;
// enrollmentRoutes.js

// const express = require('express');
// const router = express.Router();
// const db = require('../../config'); // Assuming config.js contains the database connection

// // Get all enrollments
// router.get('/', async (req, res) => {
//     try {
//         const [enrollments] = await db.query('SELECT * FROM enrollment');
//         res.json(enrollments);
//     } catch (error) {
//         console.error("Error fetching enrollments:", error);
//         res.status(500).json({ error: "Could not fetch enrollments." });
//     }
// });

// // Get a specific enrollment by ID
// router.get('/:enrollment_id', async (req, res) => {
//     try {
//         const [enrollment] = await db.query('SELECT * FROM enrollment WHERE enrollment_id = ?', [req.params.enrollment_id]);
//         res.json(enrollment[0]);
//     } catch (error) {
//         console.error("Error fetching enrollment:", error);
//         res.status(500).json({ error: "Could not fetch enrollment." });
//     }
// });

// // Add a new enrollment
// router.post('/', async (req, res) => {
//     const { enrollment_id, student_id, course_id, enrollment_date, grade } = req.body;
//     try {
//         await db.query(
//             'INSERT INTO enrollment (enrollment_id, student_id, course_id, enrollment_date, grade) VALUES (?, ?, ?, ?, ?)',
//             [enrollment_id, student_id, course_id, enrollment_date, grade]
//         );
//         res.status(201).json({ message: "Enrollment created successfully." });
//     } catch (error) {
//         console.error("Error creating enrollment:", error);
//         res.status(500).json({ error: "Could not create enrollment." });
//     }
// });

// // Update an existing enrollment
// router.put('/:enrollment_id', async (req, res) => {
//     const { student_id, course_id, enrollment_date, grade } = req.body;
//     try {
//         await db.query(
//             'UPDATE enrollment SET student_id = ?, course_id = ?, enrollment_date = ?, grade = ? WHERE enrollment_id = ?',
//             [student_id, course_id, enrollment_date, grade, req.params.enrollment_id]
//         );
//         res.json({ message: "Enrollment updated successfully." });
//     } catch (error) {
//         console.error("Error updating enrollment:", error);
//         res.status(500).json({ error: "Could not update enrollment." });
//     }
// });

// // Delete an enrollment
// router.delete('/:enrollment_id', async (req, res) => {
//     try {
//         await db.query('DELETE FROM enrollment WHERE enrollment_id = ?', [req.params.enrollment_id]);
//         res.json({ message: "Enrollment deleted successfully." });
//     } catch (error) {
//         console.error("Error deleting enrollment:", error);
//         res.status(500).json({ error: "Could not delete enrollment." });
//     }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const db = require('../../config'); // Assuming your database connection is in config.js

// // Get all enrollments
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM enrollments', (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         res.json(results);
//     });
// });

// // Get an enrollment by ID
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('SELECT * FROM enrollments WHERE enrollment_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.length === 0) return res.status(404).json({ message: 'Enrollment not found' });
//         res.json(results[0]);
//     });
// });

// // Create a new enrollment
// router.post('/', (req, res) => {
//     const { student_id, course_id, enrollment_date, grade } = req.body;
//     const newEnrollment = { student_id, course_id, enrollment_date, grade };

//     db.query('INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES (?, ?, ?, ?)', 
//         [newEnrollment.student_id, newEnrollment.course_id, newEnrollment.enrollment_date, newEnrollment.grade], 
//         (error, results) => {
//             if (error) return res.status(500).json({ error: error.message });
//             res.status(201).json({ message: 'Enrollment created', enrollmentId: results.insertId });
//         }
//     );
// });

// // Update an enrollment
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { student_id, course_id, enrollment_date, grade } = req.body;
//     const updatedEnrollment = { student_id, course_id, enrollment_date, grade };

//     db.query('UPDATE enrollments SET student_id = ?, course_id = ?, enrollment_date = ?, grade = ? WHERE enrollment_id = ?', 
//         [updatedEnrollment.student_id, updatedEnrollment.course_id, updatedEnrollment.enrollment_date, updatedEnrollment.grade, id], 
//         (error, results) => {
//             if (error) return res.status(500).json({ error: error.message });
//             if (results.affectedRows === 0) return res.status(404).json({ message: 'Enrollment not found' });
//             res.json({ message: 'Enrollment updated' });
//         }
//     );
// });

// // Delete an enrollment
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM enrollments WHERE enrollment_id = ?', [id], (error, results) => {
//         if (error) return res.status(500).json({ error: error.message });
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Enrollment not found' });
//         res.json({ message: 'Enrollment deleted' });
//     });
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const db = require('../../config');

// // Get all enrollments
// router.get('/', async (req, res) => {
//     try {
//         const [results] = await db.query('SELECT * FROM enrollments');
//         res.json(results);
//     } catch (error) {
//         console.error("Error fetching enrollments:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get a specific enrollment by ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [results] = await db.query('SELECT * FROM enrollments WHERE enrollment_id = ?', [id]);
//         if (results.length === 0) {
//             return res.status(404).json({ error: 'Enrollment not found' });
//         }
//         res.json(results[0]);
//     } catch (error) {
//         console.error("Error fetching enrollment by ID:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Add a new enrollment
// router.post('/', async (req, res) => {
//     const { enrollment_id, student_id, course_id, enrollment_date, grade } = req.body;

//     // Check if all required fields are provided
//     if (!enrollment_id || !student_id || !course_id || !enrollment_date) {
//         return res.status(400).json({ error: "Enrollment ID, Student ID, Course ID, and Enrollment Date are required." });
//     }

//     // Format the date
//     const formattedEnrollmentDate = new Date(enrollment_date).toISOString().split('T')[0];

//     // Create the enrollment object to insert
//     const enrollment = { enrollment_id, student_id, course_id, enrollment_date: formattedEnrollmentDate, grade };

//     try {
//         const [results] = await db.query('INSERT INTO enrollments SET ?', enrollment);
//         res.json({ message: 'Enrollment added successfully', enrollmentId: results.insertId });
//     } catch (error) {
//         console.error("Error adding enrollment:", error.message);
//         res.status(500).json({ error: "Failed to add enrollment. Check server logs for more details." });
//     }
// });

// // Update an enrollment
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { student_id, course_id, enrollment_date, grade } = req.body;

//     // Check if the fields are provided
//     if (!student_id || !course_id || !enrollment_date) {
//         return res.status(400).json({ error: "Student ID, Course ID, and Enrollment Date are required." });
//     }

//     // Format the date
//     const formattedEnrollmentDate = new Date(enrollment_date).toISOString().split('T')[0];

//     const sql = 'UPDATE enrollments SET student_id = ?, course_id = ?, enrollment_date = ?, grade = ? WHERE enrollment_id = ?';

//     try {
//         const [results] = await db.query(sql, [student_id, course_id, formattedEnrollmentDate, grade, id]);

//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: 'Enrollment not found' });
//         }

//         res.json({ message: 'Enrollment updated successfully' });
//     } catch (error) {
//         console.error("Error updating enrollment:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete an enrollment
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [results] = await db.query('DELETE FROM enrollments WHERE enrollment_id = ?', [id]);

//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: 'Enrollment not found' });
//         }

//         res.json({ message: 'Enrollment deleted successfully' });
//     } catch (error) {
//         console.error("Error deleting enrollment:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../../config');

// Get all enrollments
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM enrollments');
        res.json(results);
    } catch (error) {
        console.error("Error fetching enrollments:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get a specific enrollment by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM enrollments WHERE enrollment_id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error("Error fetching enrollment by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Add a new enrollment
router.post('/', async (req, res) => {
    const { enrollment_id, student_id, course_id, enrollment_date, grade } = req.body;

    if (!student_id || !course_id || !enrollment_date || !grade) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const enrollment = { enrollment_id, student_id, course_id, enrollment_date, grade };

    try {
        const [results] = await db.query('INSERT INTO enrollments SET ?', enrollment);
        res.json({ message: 'Enrollment added successfully', enrollmentId: results.insertId });
    } catch (error) {
        console.error("Error adding enrollment:", error.message);
        res.status(500).json({ error: "Failed to add enrollment." });
    }
});

// Update an enrollment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, enrollment_date, grade } = req.body;

    if (!student_id || !course_id || !enrollment_date || !grade) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = 'UPDATE enrollments SET student_id = ?, course_id = ?, enrollment_date = ?, grade = ? WHERE enrollment_id = ?';

    try {
        const [results] = await db.query(sql, [student_id, course_id, enrollment_date, grade, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.json({ message: 'Enrollment updated successfully' });
    } catch (error) {
        console.error("Error updating enrollment:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Delete an enrollment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('DELETE FROM enrollments WHERE enrollment_id = ?', [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        console.error("Error deleting enrollment:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
