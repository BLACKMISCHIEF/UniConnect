// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input } from 'antd';

// const Alumni = () => {
//     const [alumni, setAlumni] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [form] = Form.useForm();

//     const sampleAlumni = [
//         { id: 1, name: 'Alice Johnson', yearGraduated: 2020, email: 'alice.johnson@example.com' },
//         { id: 2, name: 'Bob Brown', yearGraduated: 2019, email: 'bob.brown@example.com' },
//     ];

//     useEffect(() => {
//         setAlumni(sampleAlumni);
//     }, []);

//     const columns = [
//         { title: 'Name', dataIndex: 'name', key: 'name' },
//         { title: 'Year Graduated', dataIndex: 'yearGraduated', key: 'yearGraduated' },
//         { title: 'Email', dataIndex: 'email', key: 'email' },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <>
//                     <Button onClick={() => handleEdit(record)}>Edit</Button>
//                     <Button onClick={() => handleDelete(record.id)} danger>
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     const handleAdd = () => {
//         form.validateFields().then((values) => {
//             setAlumni([...alumni, { id: alumni.length + 1, ...values }]);
//             form.resetFields();
//             setIsModalOpen(false);
//         });
//     };

//     const handleEdit = (alumnus) => {
//         form.setFieldsValue(alumnus);
//         setIsModalOpen(true);
//     };

//     const handleDelete = (id) => {
//         setAlumni(alumni.filter((alumnus) => alumnus.id !== id));
//     };

//     return (
//         <div>
//             <h1>Alumni Management</h1>
//             <Button type="primary" onClick={() => setIsModalOpen(true)}>
//                 Add Alumni
//             </Button>
//             <Table columns={columns} dataSource={alumni} rowKey="id" />

//             <Modal
//                 title="Add/Edit Alumni"
//                 visible={isModalOpen}
//                 onCancel={() => setIsModalOpen(false)}
//                 onOk={handleAdd}
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="yearGraduated" label="Year Graduated" rules={[{ required: true }]}>
//                         <Input type="number" />
//                     </Form.Item>
//                     <Form.Item name="email" label="Email" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Alumni;

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const Alumni = () => {
    const [alumni, setAlumni] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAlumnus, setEditingAlumnus] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAlumni();
    }, []);

    const fetchAlumni = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/alumni');
            setAlumni(data);
        } catch (error) {
            console.error("Error fetching alumni:", error);
            alert("Error fetching alumni data. Check console for details.");
        }
    };

    const columns = [
        { title: 'Alumni ID', dataIndex: 'alumni_id', key: 'alumni_id' },
        { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
        { title: 'Graduation Year', dataIndex: 'graduation_year', key: 'graduation_year' },
        { title: 'Job Title', dataIndex: 'current_job_title', key: 'current_job_title' },
        { title: 'Company', dataIndex: 'company', key: 'company' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.alumni_id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    const handleAddEdit = async () => {
        try {
            const values = await form.validateFields();

            if (editingAlumnus) {
                // Update alumnus
                await axios.put(`http://localhost:3000/api/alumni/${editingAlumnus.alumni_id}`, values);
                setAlumni(alumni.map(alum =>
                    alum.alumni_id === editingAlumnus.alumni_id ? { ...alum, ...values } : alum
                ));
            } else {
                // Add new alumnus
                const { data } = await axios.post('http://localhost:3000/api/alumni', values);
                setAlumni([...alumni, data]);
            }

            setIsModalOpen(false);
            form.resetFields();
            setEditingAlumnus(null);
        } catch (error) {
            console.error("Error adding/updating alumnus:", error);
            alert("Error: Could not save alumnus. Check console for details.");
        }
    };

    const handleEdit = (alumnus) => {
        form.setFieldsValue(alumnus);
        setEditingAlumnus(alumnus);
        setIsModalOpen(true);
    };

    const handleDelete = async (alumni_id) => {
        try {
            await axios.delete(`http://localhost:3000/api/alumni/${alumni_id}`);
            setAlumni(alumni.filter(alum => alum.alumni_id !== alumni_id));
        } catch (error) {
            console.error("Error deleting alumnus:", error);
            alert("Error: Could not delete alumnus. Check console for details.");
        }
    };

    const toggleModal = (visible) => {
        setIsModalOpen(visible);
        if (!visible) {
            form.resetFields();
            setEditingAlumnus(null);
        }
    };

    return (
        <div>
            <h1>Alumni Management</h1>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingAlumnus(null); }}>
                Add Alumni
            </Button>
            <Table columns={columns} dataSource={alumni} rowKey="alumni_id" />

            <Modal
                title={editingAlumnus ? "Edit Alumni" : "Add Alumni"}
                open={isModalOpen}
                onCancel={() => toggleModal(false)}
                onOk={handleAddEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="alumni_id"
                        label="Alumni ID"
                        rules={[{ required: true, message: "Please enter a unique alumni ID" }]}>
                        <Input disabled={!!editingAlumnus} />
                    </Form.Item>
                    <Form.Item
                        name="student_id"
                        label="Student ID"
                        rules={[{ required: true, message: "Please enter the student ID" }]}>
                        <Input disabled={!!editingAlumnus} />
                    </Form.Item>
                    <Form.Item
                        name="graduation_year"
                        label="Graduation Year"
                        rules={[{ required: true, message: "Please enter the graduation year" }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="current_job_title"
                        label="Current Job Title"
                        rules={[{ required: true, message: "Please enter the current job title" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="company"
                        label="Company"
                        rules={[{ required: true, message: "Please enter the company" }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Alumni;
