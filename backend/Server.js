const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000; 

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Import routes (Updated paths to include 'api/routes')
const studentRoutes = require('./api/routes/studentRoutes');
const courseRoutes = require('./api/routes/CourseRoutes');
const departmentRoutes = require('./api/routes/DepartmentRoutes');
const enrollmentRoutes = require('./api/routes/enrollmentRoutes');
const classroomRoutes = require('./api/routes/classroomRoutes');
const alumniRoutes = require('./api/routes/alumniRoutes');
const attendanceRoutes = require('./api/routes/attendanceRoutes');

// Use routes with appropriate base paths
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/attendance', attendanceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
