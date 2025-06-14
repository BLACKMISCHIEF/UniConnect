// // src/pages/Enrollments.js
// import React, { useState } from 'react';
// import { Table, Button, Modal, Form, Input } from 'antd';

// const Enrollments = () => {
//     const [enrollments, setEnrollments] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [form] = Form.useForm();

//     const handleAdd = () => {
//         form.validateFields().then((values) => {
//             setEnrollments([...enrollments, { id: enrollments.length + 1, ...values }]);
//             form.resetFields();
//             setIsModalOpen(false);
//         });
//     };

//     const handleDelete = (id) => {
//         setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
//     };

//     return (
//         <div>
//             <h1>Enrollment Management</h1>
//             <Button type="primary" onClick={() => setIsModalOpen(true)}>Enroll Student</Button>
//             <Table
//                 columns={[
//                     { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
//                     { title: 'Course ID', dataIndex: 'courseId', key: 'courseId' },
//                     {
//                         title: 'Actions',
//                         key: 'actions',
//                         render: (_, record) => (
//                             <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
//                         ),
//                     },
//                 ]}
//                 dataSource={enrollments}
//                 rowKey="id"
//             />
//             <Modal
//                 title="Enroll Student"
//                 visible={isModalOpen}
//                 onCancel={() => setIsModalOpen(false)}
//                 onOk={handleAdd}
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="courseId" label="Course ID" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Enrollments;


// src/pages/Enrollments.js
// // src/pages/Enrollments.js
// import React, { useState } from 'react';
// import { Table, Button, Modal, Form, Input } from 'antd';

// const Enrollments = () => {
//     const [enrollments, setEnrollments] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [form] = Form.useForm();

//     const handleAdd = () => {
//         form.validateFields().then((values) => {
//             setEnrollments([...enrollments, { id: enrollments.length + 1, ...values }]);
//             form.resetFields();
//             setIsModalOpen(false);
//         });
//     };

//     const handleDelete = (id) => {
//         setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
//     };

//     return (
//         <div>
//             <h1>Enrollment Management</h1>
//             <Button type="primary" onClick={() => setIsModalOpen(true)}>Enroll Student</Button>
//             <Table
//                 columns={[
//                     { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
//                     { title: 'Course ID', dataIndex: 'courseId', key: 'courseId' },
//                     {
//                         title: 'Actions',
//                         key: 'actions',
//                         render: (_, record) => (
//                             <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
//                         ),
//                     },
//                 ]}
//                 dataSource={enrollments}
//                 rowKey="id"
//             />
//             <Modal
//                 title="Enroll Student"
//                 visible={isModalOpen}
//                 onCancel={() => setIsModalOpen(false)}
//                 onOk={handleAdd}
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="courseId" label="Course ID" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Enrollments;
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, DatePicker, InputNumber } from 'antd';
// import axios from 'axios';
// import moment from 'moment';

// const Enrollments = () => {
//     const [enrollments, setEnrollments] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingEnrollment, setEditingEnrollment] = useState(null);
//     const [form] = Form.useForm();

//     // Fetch enrollments from backend
//     useEffect(() => {
//         fetchEnrollments();
//     }, []);

//     const fetchEnrollments = async () => {
//         try {
//             console.log("Fetching enrollments...");
//             const response = await axios.get('http://localhost:3000/api/enrollments');
//             console.log("Fetched enrollments:", response.data);
//             setEnrollments(response.data);
//         } catch (error) {
//             console.error("Error fetching enrollments:", error);
//             alert("Error fetching enrollments. Check console for details.");
//         }
//     };

//     // Define columns to display enrollment information
//     const columns = [
//         { title: 'Enrollment ID', dataIndex: 'enrollment_id', key: 'enrollment_id' },
//         { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
//         { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },
//         { 
//             title: 'Enrollment Date', 
//             dataIndex: 'enrollment_date', 
//             key: 'enrollment_date', 
//             render: date => moment(date).format('YYYY-MM-DD') 
//         },
//         { title: 'Grade', dataIndex: 'grade', key: 'grade' },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <>
//                     <Button onClick={() => handleEdit(record)}>Edit</Button>
//                     <Button onClick={() => handleDelete(record.enrollment_id)} danger>Delete</Button>
//                 </>
//             ),
//         },
//     ];

//     // Add or edit an enrollment
//     const handleAddEdit = async () => {
//         try {
//             const values = await form.validateFields();
//             if (values.enrollment_date) {
//                 values.enrollment_date = values.enrollment_date.format('YYYY-MM-DD');
//             }

//             if (editingEnrollment) {
//                 // Update enrollment
//                 const response = await axios.put(`http://localhost:3000/api/enrollments/${editingEnrollment.enrollment_id}`, values);
//                 setEnrollments(enrollments.map(enrollment =>
//                     enrollment.enrollment_id === editingEnrollment.enrollment_id ? { ...enrollment, ...values } : enrollment
//                 ));
//                 console.log("Updated enrollment:", response.data);
//             } else {
//                 // Add new enrollment
//                 const response = await axios.post('http://localhost:3000/api/enrollments', values);
//                 setEnrollments([...enrollments, response.data]);
//                 console.log("New enrollment added:", response.data);
//             }

//             setIsModalOpen(false);
//             form.resetFields();
//             setEditingEnrollment(null);
//         } catch (error) {
//             console.error("Failed to add/edit enrollment:", error);
//             alert("Error: Could not save enrollment data. Check console for details.");
//         }
//     };

//     // Populate form with enrollment data for editing
//     const handleEdit = (enrollment) => {
//         form.setFieldsValue({
//             ...enrollment,
//             enrollment_date: moment(enrollment.enrollment_date),
//         });
//         setEditingEnrollment(enrollment);
//         setIsModalOpen(true);
//     };

//     // Delete an enrollment
//     const handleDelete = async (enrollment_id) => {
//         try {
//             await axios.delete(`http://localhost:3000/api/enrollments/${enrollment_id}`);
//             setEnrollments(enrollments.filter(enrollment => enrollment.enrollment_id !== enrollment_id));
//             console.log("Enrollment deleted successfully");
//         } catch (error) {
//             console.error("Failed to delete enrollment:", error);
//             alert("Error: Could not delete enrollment. Check console for details.");
//         }
//     };

//     // Toggle modal visibility and reset form
//     const toggleModal = (visible) => {
//         setIsModalOpen(visible);
//         if (!visible) {
//             form.resetFields();
//             setEditingEnrollment(null);
//         }
//     };

//     return (
//         <div>
//             <h1>Enrollment Management</h1>
//             <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingEnrollment(null); }}>
//                 Add Enrollment
//             </Button>
//             <Table columns={columns} dataSource={enrollments} rowKey="enrollment_id" />

//             <Modal
//                 title={editingEnrollment ? "Edit Enrollment" : "Add Enrollment"}
//                 open={isModalOpen}
//                 onCancel={() => toggleModal(false)}
//                 onOk={handleAddEdit}
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item 
//                         name="enrollment_id"
//                         label="Enrollment ID"
//                         rules={[{ required: true, message: "Please enter a unique enrollment ID" }]} >
//                         <Input disabled={!!editingEnrollment} />
//                     </Form.Item>
//                     <Form.Item 
//                         name="student_id" 
//                         label="Student ID" 
//                         rules={[{ required: true, message: "Please enter the student ID" }]} >
//                         <InputNumber style={{ width: '100%' }} />
//                     </Form.Item>
//                     <Form.Item 
//                         name="course_id" 
//                         label="Course ID" 
//                         rules={[{ required: true, message: "Please enter the course ID" }]} >
//                         <InputNumber style={{ width: '100%' }} />
//                     </Form.Item>
//                     <Form.Item 
//                         name="enrollment_date" 
//                         label="Enrollment Date" 
//                         rules={[{ required: true, message: "Please enter the enrollment date" }]} >
//                         <DatePicker format="YYYY-MM-DD" />
//                     </Form.Item>
//                     <Form.Item 
//                         name="grade" 
//                         label="Grade" 
//                         rules={[{ required: true, message: "Please enter the grade" }]} >
//                         <Input />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Enrollments;
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, DatePicker, InputNumber } from 'antd';
// import axios from 'axios';
// import moment from 'moment';

// const Enrollments = () => {
//     const [enrollments, setEnrollments] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingEnrollment, setEditingEnrollment] = useState(null);
//     const [form] = Form.useForm();

//     // Fetch enrollments from backend
//     useEffect(() => {
//         fetchEnrollments();
//     }, []);

//     const fetchEnrollments = async () => {
//         try {
//             console.log("Fetching enrollments...");
//             const response = await axios.get('http://localhost:3000/api/enrollments');
//             console.log("Fetched enrollments:", response.data);
//             setEnrollments(response.data);
//         } catch (error) {
//             console.error("Error fetching enrollments:", error);
//             alert("Error fetching enrollments. Check console for details.");
//         }
//     };

//     // Define columns to display enrollment information
//     const columns = [
//         { title: 'Enrollment ID', dataIndex: 'enrollment_id', key: 'enrollment_id' },
//         { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
//         { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },
//         { 
//             title: 'Enrollment Date', 
//             dataIndex: 'enrollment_date', 
//             key: 'enrollment_date', 
//             render: date => moment(date).format('YYYY-MM-DD') 
//         },
//         { title: 'Grade', dataIndex: 'grade', key: 'grade' },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <>
//                     <Button onClick={() => handleEdit(record)}>Edit</Button>
//                     <Button onClick={() => handleDelete(record.enrollment_id)} danger>Delete</Button>
//                 </>
//             ),
//         },
//     ];

//     // Add or edit an enrollment
//     const handleAddEdit = async () => {
//         try {
//             const values = await form.validateFields();
//             if (values.enrollment_date) {
//                 values.enrollment_date = values.enrollment_date.format('YYYY-MM-DD');
//             }

//             if (editingEnrollment) {
//                 // Update enrollment
//                 const response = await axios.put(`http://localhost:3000/api/enrollments/${editingEnrollment.enrollment_id}`, values);
//                 setEnrollments(enrollments.map(enrollment =>
//                     enrollment.enrollment_id === editingEnrollment.enrollment_id ? { ...enrollment, ...values } : enrollment
//                 ));
//                 console.log("Updated enrollment:", response.data);
//             } else {
//                 // Add new enrollment
//                 const response = await axios.post('http://localhost:3000/api/enrollments', values);
//                 setEnrollments([...enrollments, response.data]);
//                 console.log("New enrollment added:", response.data);
//             }

//             setIsModalOpen(false);
//             form.resetFields();
//             setEditingEnrollment(null);
//         } catch (error) {
//             console.error("Failed to add/edit enrollment:", error);
//             alert("Error: Could not save enrollment data. Check console for details.");
//         }
//     };

//     // Populate form with enrollment data for editing
//     const handleEdit = (enrollment) => {
//         form.setFieldsValue({
//             ...enrollment,
//             enrollment_date: moment(enrollment.enrollment_date),
//         });
//         setEditingEnrollment(enrollment);
//         setIsModalOpen(true);
//     };

//     // Delete an enrollment
//     const handleDelete = async (enrollment_id) => {
//         try {
//             await axios.delete(`http://localhost:3000/api/enrollments/${enrollment_id}`);
//             setEnrollments(enrollments.filter(enrollment => enrollment.enrollment_id !== enrollment_id));
//             console.log("Enrollment deleted successfully");
//         } catch (error) {
//             console.error("Failed to delete enrollment:", error);
//             alert("Error: Could not delete enrollment. Check console for details.");
//         }
//     };

//     // Toggle modal visibility and reset form
//     const toggleModal = (visible) => {
//         setIsModalOpen(visible);
//         if (!visible) {
//             form.resetFields();
//             setEditingEnrollment(null);
//         }
//     };

//     return (
//         <div>
//             <h1>Enrollment Management</h1>
//             <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingEnrollment(null); }}>
//                 Add Enrollment
//             </Button>
//             <Table columns={columns} dataSource={enrollments} rowKey="enrollment_id" />

//             <Modal
//                 title={editingEnrollment ? "Edit Enrollment" : "Add Enrollment"}
//                 open={isModalOpen}
//                 onCancel={() => toggleModal(false)}
//                 onOk={handleAddEdit}
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item 
//                         name="enrollment_id"
//                         label="Enrollment ID"
//                         rules={[{ required: true, message: "Please enter a unique enrollment ID" }]} >
//                         <Input disabled={!!editingEnrollment} />
//                     </Form.Item>
//                     <Form.Item 
//                         name="student_id" 
//                         label="Student ID" 
//                         rules={[{ required: true, message: "Please enter the student ID" }]} >
//                         <InputNumber style={{ width: '100%' }} />
//                     </Form.Item>
//                     <Form.Item 
//                         name="course_id" 
//                         label="Course ID" 
//                         rules={[{ required: true, message: "Please enter the course ID" }]} >
//                         <InputNumber style={{ width: '100%' }} />
//                     </Form.Item>
//                     <Form.Item 
//                         name="enrollment_date" 
//                         label="Enrollment Date" 
//                         rules={[{ required: true, message: "Please enter the enrollment date" }]} >
//                         <DatePicker format="YYYY-MM-DD" />
//                     </Form.Item>
//                     <Form.Item 
//                         name="grade" 
//                         label="Grade" 
//                         rules={[{ required: true, message: "Please enter the grade" }]} >
//                         <Input />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Enrollments;



import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEnrollment, setEditingEnrollment] = useState(null);
    const [form] = Form.useForm();

    // Fetch enrollments from backend
    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            console.log("Fetching enrollments...");
            const response = await axios.get('http://localhost:3000/api/enrollments');
            console.log("Fetched enrollments:", response.data);
            setEnrollments(response.data);
        } catch (error) {
            console.error("Error fetching enrollments:", error);
            alert("Error fetching enrollments. Check console for details.");
        }
    };

    // Define columns to display all enrollment information
    const columns = [
        { title: 'Enrollment ID', dataIndex: 'enrollment_id', key: 'enrollment_id' },
        { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
        { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },
        { 
            title: 'Enrollment Date', 
            dataIndex: 'enrollment_date', 
            key: 'enrollment_date', 
            render: date => moment(date).format('YYYY-MM-DD') 
        },
        { title: 'Grade', dataIndex: 'grade', key: 'grade' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.enrollment_id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    // Add or edit an enrollment
    const handleAddEdit = async () => {
        console.log("OK button clicked, starting handleAddEdit"); // Log trigger
        try {
            const values = await form.validateFields();
            console.log("Form values:", values); // Log the validated form data

            // Format the enrollment_date for backend if it's a moment object
            if (values.enrollment_date) {
                values.enrollment_date = values.enrollment_date.format('YYYY-MM-DD');
            }

            if (editingEnrollment) {
                // Update enrollment
                console.log("Editing existing enrollment with ID:", editingEnrollment.enrollment_id);
                const response = await axios.put(`http://localhost:3000/api/enrollments/${editingEnrollment.enrollment_id}`, values);

                // Optimistically update the local state
                setEnrollments(enrollments.map(enrollment =>
                    enrollment.enrollment_id === editingEnrollment.enrollment_id ? { ...enrollment, ...values } : enrollment
                ));

                console.log("Updated enrollment:", response.data);
            } else {
                // Add new enrollment
                console.log("Adding a new enrollment");
                const response = await axios.post('http://localhost:3000/api/enrollments', values);

                // Add the newly created enrollment to the local state
                setEnrollments([...enrollments, response.data]);
                console.log("New enrollment added:", response.data);
            }

            // Close the modal and reset the form
            setIsModalOpen(false);
            form.resetFields();
            setEditingEnrollment(null);
        } catch (error) {
            console.error("Failed to add/edit enrollment:", error);
            alert("Error: Could not save enrollment data. Check console for details.");
        }
    };

    // Populate form with enrollment data for editing
    const handleEdit = (enrollment) => {
        console.log("Editing enrollment:", enrollment);
        form.setFieldsValue({
            ...enrollment,
            enrollment_date: moment(enrollment.enrollment_date) // Format the date for the DatePicker
        });
        setEditingEnrollment(enrollment);
        setIsModalOpen(true);
    };

    // Delete an enrollment
    const handleDelete = async (enrollment_id) => {
        console.log("Deleting enrollment with ID:", enrollment_id);
        try {
            await axios.delete(`http://localhost:3000/api/enrollments/${enrollment_id}`);
            setEnrollments(enrollments.filter(enrollment => enrollment.enrollment_id !== enrollment_id));
            console.log("Enrollment deleted successfully");
        } catch (error) {
            console.error("Failed to delete enrollment:", error);
            alert("Error: Could not delete enrollment. Check console for details.");
        }
    };

    // Toggle modal visibility and reset form
    const toggleModal = (visible) => {
        console.log(`Setting modal visibility to: ${visible}`);
        setIsModalOpen(visible);
        if (!visible) {
            form.resetFields();
            setEditingEnrollment(null);
        }
    };

    return (
        <div>
            <h1>Enrollment Management</h1>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingEnrollment(null); }}>
                Add Enrollment
            </Button>
            <Table columns={columns} dataSource={enrollments} rowKey="enrollment_id" />

            <Modal
                title={editingEnrollment ? "Edit Enrollment" : "Add Enrollment"}
                open={isModalOpen}
                onCancel={() => toggleModal(false)}
                onOk={handleAddEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item 
                        name="enrollment_id"
                        label="Enrollment ID"
                        rules={[{ required: true, message: "Please enter a unique enrollment ID" }]} >
                        <Input disabled={!!editingEnrollment} />
                    </Form.Item>
                    <Form.Item 
                        name="student_id" 
                        label="Student ID" 
                        rules={[{ required: true, message: "Please enter the student ID" }]} >
                        <Input disabled={!!editingEnrollment} />
                    </Form.Item>
                    <Form.Item 
                        name="course_id" 
                        label="Course ID" 
                        rules={[{ required: true, message: "Please enter the course ID" }]} >
                        <Input disabled={!!editingEnrollment} />
                    </Form.Item>
                    <Form.Item 
                        name="enrollment_date" 
                        label="Enrollment Date" 
                        rules={[{ required: true, message: "Please enter the enrollment date" }]} >
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item 
                        name="grade" 
                        label="Grade" 
                        rules={[{ required: true, message: "Please enter the grade" }]} >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Enrollments;
