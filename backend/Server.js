const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000', // Local frontend
  'https://uni-connect-5d5e.vercel.app', // Deployed Vercel frontend
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Optional, if using cookies/auth
};

// Apply CORS middleware with options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight (for PUT/DELETE)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const studentRoutes = require('./api/routes/studentRoutes');
const courseRoutes = require('./api/routes/CourseRoutes');
const departmentRoutes = require('./api/routes/DepartmentRoutes');
const enrollmentRoutes = require('./api/routes/enrollmentRoutes');
const classroomRoutes = require('./api/routes/classroomRoutes');
const alumniRoutes = require('./api/routes/alumniRoutes');
const attendanceRoutes = require('./api/routes/attendanceRoutes');

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/attendance', attendanceRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
