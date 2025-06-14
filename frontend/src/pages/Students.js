
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [form] = Form.useForm();

    // Fetch students from backend
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            console.log("Fetching students...");
            const response = await axios.get('http://localhost:3000/api/students');
            console.log("Fetched students:", response.data);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            alert("Error fetching students. Check console for details.");
        }
    };

    // Define columns to display all student information
    const columns = [
        { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { 
            title: 'Date of Birth', 
            dataIndex: 'date_of_birth', 
            key: 'date_of_birth', 
            render: date => moment(date).format('YYYY-MM-DD') 
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'phone_number', key: 'phone_number' },
        { title: 'Admission Year', dataIndex: 'admission_year', key: 'admission_year' },
        { title: 'Department ID', dataIndex: 'department_id', key: 'department_id' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.student_id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    // Add or edit a student
    const handleAddEdit = async () => {
        console.log("OK button clicked, starting handleAddEdit"); // Log trigger
        try {
            const values = await form.validateFields();
            console.log("Form values:", values); // Log the validated form data

            // Format the date_of_birth for backend if it's a moment object
            if (values.date_of_birth) {
                values.date_of_birth = values.date_of_birth.format('YYYY-MM-DD'); // Format the date to match backend
            }

            if (editingStudent) {
                // Update student
                console.log("Editing existing student with ID:", editingStudent.student_id);
                const response = await axios.put(`http://localhost:3000/api/students/${editingStudent.student_id}`, values);

                // Optimistically update the local state
                setStudents(students.map(student =>
                    student.student_id === editingStudent.student_id ? { ...student, ...values } : student
                ));

                console.log("Updated student:", response.data);
            } else {
                // Add new student
                console.log("Adding a new student");
                const response = await axios.post('http://localhost:3000/api/students', values);

                // Add the newly created student to the local state
                setStudents([...students, response.data]);
                console.log("New student added:", response.data);
            }

            // Close the modal and reset the form
            setIsModalOpen(false);
            form.resetFields();
            setEditingStudent(null);
        } catch (error) {
            console.error("Failed to add/edit student:", error);
            alert("Error: Could not save student data. Check console for details.");
        }
    };

    // Populate form with student data for editing
    const handleEdit = (student) => {
        console.log("Editing student:", student);
        form.setFieldsValue({
            ...student,
            date_of_birth: moment(student.date_of_birth) // Format the date for the DatePicker
        });
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    // Delete a student
    const handleDelete = async (student_id) => {
        console.log("Deleting student with ID:", student_id);
        try {
            await axios.delete(`http://localhost:3000/api/students/${student_id}`);
            setStudents(students.filter(student => student.student_id !== student_id));
            console.log("Student deleted successfully");
        } catch (error) {
            console.error("Failed to delete student:", error);
            alert("Error: Could not delete student. Check console for details.");
        }
    };

    // Toggle modal visibility and reset form
    const toggleModal = (visible) => {
        console.log(`Setting modal visibility to: ${visible}`);
        setIsModalOpen(visible);
        if (!visible) {
            form.resetFields();
            setEditingStudent(null);
        }
    };

    return (
        <div>
            <h1>Student Management</h1>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingStudent(null); }}>
                Add Student
            </Button>
            <Table columns={columns} dataSource={students} rowKey="student_id" />

            <Modal
                title={editingStudent ? "Edit Student" : "Add Student"}
                open={isModalOpen}
                onCancel={() => toggleModal(false)}
                onOk={handleAddEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item 
                        name="student_id"
                        label="Student ID"
                        rules={[{ required: true, message: "Please enter a unique student ID" }]} >
                        <Input disabled={!!editingStudent} />
                    </Form.Item>
                    <Form.Item 
                        name="name" 
                        label="Name" 
                        rules={[{ required: true, message: "Please enter the student's name" }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name="date_of_birth" 
                        label="Date of Birth" 
                        rules={[{ required: true, message: "Please enter the date of birth" }]} >
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item 
                        name="email" 
                        label="Email" 
                        rules={[{ required: true, type: 'email', message: "Please enter a valid email" }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name="phone_number" 
                        label="Phone Number" 
                        rules={[{ required: true, message: "Please enter the phone number" }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name="admission_year" 
                        label="Admission Year" 
                        rules={[{ required: true, message: "Please enter the admission year" }]} >
                        <InputNumber min={1900} max={2100} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item 
                        name="department_id" 
                        label="Department ID" 
                        rules={[{ required: true, message: "Please enter the department ID" }]} >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Students;
