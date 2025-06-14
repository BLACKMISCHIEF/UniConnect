import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    BookOutlined,
    ApartmentOutlined,
    FileTextOutlined,
    HomeOutlined,
    TeamOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const sections = [
        { title: 'Manage Students', path: '/students', icon: <UserOutlined className="card-icon" /> },
        { title: 'Manage Courses', path: '/courses', icon: <BookOutlined className="card-icon" /> },
        { title: 'Manage Departments', path: '/departments', icon: <ApartmentOutlined className="card-icon" /> },
        { title: 'Manage Enrollments', path: '/enrollments', icon: <FileTextOutlined className="card-icon" /> },
        { title: 'Manage Classrooms', path: '/classrooms', icon: <HomeOutlined className="card-icon" /> },
        { title: 'Manage Alumni', path: '/alumni', icon: <TeamOutlined className="card-icon" /> },
        { title: 'View Attendance', path: '/attendance', icon: <CheckCircleOutlined className="card-icon" /> },
    ];

    return (
        <div className="dashboard-container">
            {/* Header with Admin Info */}
            <div className="header">
                <div className="header-title">UniConnect</div>
                <div className="header-subtext">Empowering University Connections</div>
                <div className="user-info">Logged in as Admin</div>
            </div>

            {/* Navigation Bar */}
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="https://home.dartmouth.edu/campus-life/residential-life" target="_blank" rel="noopener noreferrer">Campus Life</a>
                <a href="https://students.dartmouth.edu/ugar/" target="_blank" rel="noopener noreferrer">Research</a>
                <a href="https://home.dartmouth.edu/news" target="_blank" rel="noopener noreferrer">News & Events</a>
                <a href="https://home.dartmouth.edu/about/follow-us-social-media" target="_blank" rel="noopener noreferrer">Connect With Us</a>
            </nav>

            {/* Campus Banner */}
            <div className="campus-banner"></div>

            {/* Dashboard Title */}
            <h1 className="dashboard-title">UniConnect Dashboard</h1>

            {/* Cards Section */}
            <Row gutter={[16, 16]}>
                {sections.map((section, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card
                            title={
                                <div className="card-title-with-icon">
                                    {section.icon}
                                    <span>{section.title}</span>
                                </div>
                            }
                            bordered={false}
                            className="dashboard-card"
                            hoverable
                        >
                            <Button
                                type="primary"
                                onClick={() => navigate(section.path)}
                                block
                            >
                                Open {section.title}
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Footer */}
            <div className="footer">
                &copy; 2024 UniConnect. All Rights Reserved.
            </div>
        </div>
    );
};

export default Home;
