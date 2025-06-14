import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [form] = Form.useForm();

    // Fetch departments from backend
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
            alert("Error fetching departments. Check console for details.");
        }
    };

    // Define columns to display department information
    const columns = [
        { title: 'Department ID', dataIndex: 'department_id', key: 'department_id' },
        { title: 'Department Name', dataIndex: 'department_name', key: 'department_name' },
        { title: 'Head of Department', dataIndex: 'head_of_department', key: 'head_of_department' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.department_id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    // Add or edit a department
    const handleAddEdit = async () => {
        try {
            const values = await form.validateFields();

            if (editingDepartment) {
                // Update department
                const response = await axios.put(`http://localhost:3000/api/departments/${editingDepartment.department_id}`, values);
                setDepartments(departments.map(department =>
                    department.department_id === editingDepartment.department_id ? { ...department, ...values } : department
                ));
            } else {
                // Add new department
                const response = await axios.post('http://localhost:3000/api/departments', values);
                setDepartments([...departments, response.data]);
            }

            // Close the modal and reset the form
            setIsModalOpen(false);
            form.resetFields();
            setEditingDepartment(null);
        } catch (error) {
            console.error("Failed to add/edit department:", error);
            alert("Error: Could not save department data. Check console for details.");
        }
    };

    // Populate form with department data for editing
    const handleEdit = (department) => {
        form.setFieldsValue(department);
        setEditingDepartment(department);
        setIsModalOpen(true);
    };

    // Delete a department
    const handleDelete = async (department_id) => {
        try {
            await axios.delete(`http://localhost:3000/api/departments/${department_id}`);
            setDepartments(departments.filter(department => department.department_id !== department_id));
        } catch (error) {
            console.error("Failed to delete department:", error);
            alert("Error: Could not delete department. Check console for details.");
        }
    };

    // Toggle modal visibility and reset form
    const toggleModal = (visible) => {
        setIsModalOpen(visible);
        if (!visible) {
            form.resetFields();
            setEditingDepartment(null);
        }
    };

    return (
        <div>
            <h1>Department Management</h1>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingDepartment(null); }}>
                Add Department
            </Button>
            <Table columns={columns} dataSource={departments} rowKey="department_id" />

            <Modal
                title={editingDepartment ? "Edit Department" : "Add Department"}
                open={isModalOpen}
                onCancel={() => toggleModal(false)}
                onOk={handleAddEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="department_id"
                        label="Department ID"
                        rules={[{ required: true, message: "Please enter a unique department ID" }]} >
                        <Input disabled={!!editingDepartment} />
                    </Form.Item>
                    <Form.Item
                        name="department_name"
                        label="Department Name"
                        rules={[{ required: true, message: "Please enter the department name" }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="head_of_department"
                        label="Head of Department"
                        rules={[{ required: true, message: "Please enter the name of the head of department" }]} >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Departments;
