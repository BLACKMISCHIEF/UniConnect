// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// import Layout from './components/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Departments from './pages/Departments';
import Enrollments from './pages/Enrollments';
import Classrooms from './pages/Classrooms';
import Alumni from './pages/Alumni';
import Attendance from './pages/Attendance';

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/enrollments" element={<Enrollments />} />
                    <Route path="/classrooms" element={<Classrooms />} />
                    <Route path="/alumni" element={<Alumni />} />
                    <Route path="/attendance" element={<Attendance />} />
                </Routes>
        </Router>
    );
}

export default App;
