import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import './Home.css';  // Import the global CSS styles

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [form] = Form.useForm();

    // Fetch courses from backend
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            console.log("Fetching courses...");
            const response = await axios.get('http://localhost:3000/api/courses');
            console.log("Fetched courses:", response.data);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            alert("Error fetching courses. Check console for details.");
        }
    };

    // Define columns to display all course information
    const columns = [
        { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },
        { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
        { title: 'Credits', dataIndex: 'credits', key: 'credits' },
        { title: 'Department ID', dataIndex: 'department_id', key: 'department_id' },
        { title: 'Semester', dataIndex: 'semester', key: 'semester' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.course_id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    // Add or edit a course
    const handleAddEdit = async () => {
        console.log("OK button clicked, starting handleAddEdit"); // Log trigger
        try {
            const values = await form.validateFields();
            console.log("Form values:", values); // Log the validated form data

            if (editingCourse) {
                // Update course
                console.log("Editing existing course with ID:", editingCourse.course_id);
                const response = await axios.put(`http://localhost:3000/api/courses/${editingCourse.course_id}`, values);

                // Optimistically update the local state
                setCourses(courses.map(course =>
                    course.course_id === editingCourse.course_id ? { ...course, ...values } : course
                ));

                console.log("Updated course:", response.data);
            } else {
                // Add new course
                console.log("Adding a new course");
                const response = await axios.post('http://localhost:3000/api/courses', values);

                // Add the newly created course to the local state
                setCourses([...courses, response.data]);
                console.log("New course added:", response.data);
            }

            // Close the modal and reset the form
            setIsModalOpen(false);
            form.resetFields();
            setEditingCourse(null);
        } catch (error) {
            console.error("Failed to add/edit course:", error);
            alert("Error: Could not save course data. Check console for details.");
        }
    };

    // Populate form with course data for editing
    const handleEdit = (course) => {
        console.log("Editing course:", course);
        form.setFieldsValue(course);
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    // Delete a course
    const handleDelete = async (course_id) => {
        console.log("Deleting course with ID:", course_id);
        try {
            await axios.delete(`http://localhost:3000/api/courses/${course_id}`);
            setCourses(courses.filter(course => course.course_id !== course_id));
            console.log("Course deleted successfully");
        } catch (error) {
            console.error("Failed to delete course:", error);
            alert("Error: Could not delete course. Check console for details.");
        }
    };

    // Toggle modal visibility and reset form
    const toggleModal = (visible) => {
        console.log(`Setting modal visibility to: ${visible}`);
        setIsModalOpen(visible);
        if (!visible) {
            form.resetFields();
            setEditingCourse(null);
        }
    };

    return (
        <div>
            <h1>Course Management</h1>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingCourse(null); }}>
                Add Course
            </Button>
            <Table columns={columns} dataSource={courses} rowKey="course_id" />

            <Modal
                title={editingCourse ? "Edit Course" : "Add Course"}
                open={isModalOpen}
                onCancel={() => toggleModal(false)}
                onOk={handleAddEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="course_id"
                        label="Course ID"
                        rules={[{ required: true, message: "Please enter a unique course ID" }]} >
                        <Input disabled={!!editingCourse} />
                    </Form.Item>
                    <Form.Item
                        name="course_name"
                        label="Course Name"
                        rules={[{ required: true, message: "Please enter the course name" }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="credits"
                        label="Credits"
                        rules={[{ required: true, message: "Please enter the course credits" }]} >
                        <InputNumber min={1} max={6} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="department_id"
                        label="Department ID"
                        rules={[{ required: true, message: "Please enter the department ID" }]} >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="semester"
                        label="Semester"
                        rules={[{ required: true, message: "Please enter the semester" }]} >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Courses;
