// // // src/pages/Classrooms.js
// // import React, { useState, useEffect } from 'react';
// // import { Table, Button, Modal, Form, Input, notification } from 'antd';
// // import axios from 'axios';

// // const Classrooms = () => {
// //     const [classrooms, setClassrooms] = useState([]);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [isEditMode, setIsEditMode] = useState(false);  // For toggling edit mode
// //     const [currentClassroom, setCurrentClassroom] = useState(null); // Track the classroom being edited
// //     const [form] = Form.useForm();

// //     // Fetch all classrooms when the component mounts
// //     useEffect(() => {
// //         axios.get('/api/classrooms')
// //             .then(response => setClassrooms(response.data))
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error fetching classrooms',
// //                     description: error.message,
// //                 });
// //             });
// //     }, []);

// //     // Handle adding a new classroom
// //     const handleAdd = () => {
// //         form.validateFields().then((values) => {
// //             axios.post('/api/classrooms', {
// //                 room_number: values.roomNumber,
// //                 building: values.building,
// //                 capacity: values.capacity
// //             })
// //             .then(response => {
// //                 setClassrooms([...classrooms, response.data]);
// //                 form.resetFields();
// //                 setIsModalOpen(false);
// //                 notification.success({
// //                     message: 'Classroom added',
// //                     description: 'New classroom has been successfully added.',
// //                 });
// //             })
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error adding classroom',
// //                     description: error.message,
// //                 });
// //             });
// //         });
// //     };

// //     // Handle editing a classroom
// //     const handleEdit = () => {
// //         form.validateFields().then((values) => {
// //             axios.put(`/api/classrooms/${currentClassroom.classroom_id}`, {
// //                 room_number: values.roomNumber,
// //                 building: values.building,
// //                 capacity: values.capacity
// //             })
// //             .then(() => {
// //                 setClassrooms(classrooms.map((classroom) =>
// //                     classroom.classroom_id === currentClassroom.classroom_id ? { ...currentClassroom, ...values } : classroom
// //                 ));
// //                 form.resetFields();
// //                 setIsModalOpen(false);
// //                 setIsEditMode(false);
// //                 setCurrentClassroom(null);
// //                 notification.success({
// //                     message: 'Classroom updated',
// //                     description: 'Classroom details have been updated successfully.',
// //                 });
// //             })
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error updating classroom',
// //                     description: error.message,
// //                 });
// //             });
// //         });
// //     };

// //     // Handle deleting a classroom
// //     const handleDelete = (id) => {
// //         axios.delete(`/api/classrooms/${id}`)
// //             .then(() => {
// //                 setClassrooms(classrooms.filter((classroom) => classroom.classroom_id !== id));
// //                 notification.success({
// //                     message: 'Classroom deleted',
// //                     description: 'Classroom has been successfully deleted.',
// //                 });
// //             })
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error deleting classroom',
// //                     description: error.message,
// //                 });
// //             });
// //     };

// //     // Open modal in edit mode with existing classroom data
// //     const openEditModal = (classroom) => {
// //         setIsEditMode(true);
// //         setCurrentClassroom(classroom);
// //         form.setFieldsValue({
// //             roomNumber: classroom.room_number,
// //             building: classroom.building,
// //             capacity: classroom.capacity,
// //         });
// //         setIsModalOpen(true);
// //     };

// //     return (
// //         <div>
// //             <h1>Classroom Management</h1>
// //             <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Classroom</Button>
// //             <Table
// //                 columns={[
// //                     { title: 'Room Number', dataIndex: 'room_number', key: 'room_number' },
// //                     { title: 'Building', dataIndex: 'building', key: 'building' },
// //                     { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
// //                     {
// //                         title: 'Actions',
// //                         key: 'actions',
// //                         render: (_, record) => (
// //                             <>
// //                                 <Button onClick={() => openEditModal(record)} style={{ marginRight: 8 }}>Edit</Button>
// //                                 <Button onClick={() => handleDelete(record.classroom_id)} danger>Delete</Button>
// //                             </>
// //                         ),
// //                     },
// //                 ]}
// //                 dataSource={classrooms}
// //                 rowKey="classroom_id"
// //             />
// //             <Modal
// //                 title={isEditMode ? "Edit Classroom" : "Add Classroom"}
// //                 visible={isModalOpen}
// //                 onCancel={() => {
// //                     setIsModalOpen(false);
// //                     setIsEditMode(false);
// //                     setCurrentClassroom(null);
// //                     form.resetFields();
// //                 }}
// //                 onOk={isEditMode ? handleEdit : handleAdd}
// //             >
// //                 <Form form={form} layout="vertical">
// //                     <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
// //                         <Input />
// //                     </Form.Item>
// //                     <Form.Item name="building" label="Building" rules={[{ required: true }]}>
// //                         <Input />
// //                     </Form.Item>
// //                     <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
// //                         <Input />
// //                     </Form.Item>
// //                 </Form>
// //             </Modal>
// //         </div>
// //     );
// // };

// // export default Classrooms;




// // import React, { useState, useEffect } from 'react';
// // import { Table, Button, Modal, Form, Input, notification } from 'antd';
// // import axios from 'axios';

// // const Classrooms = () => {
// //     const [classrooms, setClassrooms] = useState([]);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [isEditMode, setIsEditMode] = useState(false);  // For toggling edit mode
// //     const [currentClassroom, setCurrentClassroom] = useState(null); // Track the classroom being edited
// //     const [form] = Form.useForm();

// //     // Fetch all classrooms when the component mounts
// //     useEffect(() => {
// //         axios.get('/api/classrooms')
// //             .then(response => setClassrooms(response.data))
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error fetching classrooms',
// //                     description: error.message,
// //                 });
// //             });
// //     }, []);

// //     // Handle adding a new classroom
// //     const handleAdd = () => {
// //         form.validateFields().then((values) => {
// //             const { roomNumber, building, capacity } = values;
// //             const classroom_id = values.classroom_id; // Manually set classroom_id here
// //             axios.post('/api/classrooms', {
// //                 classroom_id,  // Include classroom_id
// //                 room_number: roomNumber,
// //                 building,
// //                 capacity
// //             })
// //             .then(response => {
// //                 setClassrooms([...classrooms, response.data]);
// //                 form.resetFields();
// //                 setIsModalOpen(false);
// //                 notification.success({
// //                     message: 'Classroom added',
// //                     description: 'New classroom has been successfully added.',
// //                 });
// //             })
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error adding classroom',
// //                     description: error.message,
// //                 });
// //             });
// //         });
// //     };

// //     // Handle editing a classroom
// //     const handleEdit = () => {
// //         form.validateFields().then((values) => {
// //             const { roomNumber, building, capacity } = values;
// //             const classroom_id = currentClassroom.classroom_id;  // Use the existing classroom_id for editing
            
// //             axios.put(`/api/classrooms/${classroom_id}`, {
// //                 classroom_id,  // Include classroom_id
// //                 room_number: roomNumber,
// //                 building,
// //                 capacity
// //             })
// //             .then(() => {
// //                 setClassrooms(classrooms.map((classroom) =>
// //                     classroom.classroom_id === classroom_id ? { ...currentClassroom, ...values } : classroom
// //                 ));
// //                 form.resetFields();
// //                 setIsModalOpen(false);
// //                 setIsEditMode(false);
// //                 setCurrentClassroom(null);
// //                 notification.success({
// //                     message: 'Classroom updated',
// //                     description: 'Classroom details have been updated successfully.',
// //                 });
// //             })
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error updating classroom',
// //                     description: error.message,
// //                 });
// //             });
// //         });
// //     };

// //     // Handle deleting a classroom
// //     const handleDelete = (id) => {
// //         axios.delete(`/api/classrooms/${id}`)
// //             .then(() => {
// //                 setClassrooms(classrooms.filter((classroom) => classroom.classroom_id !== id));
// //                 notification.success({
// //                     message: 'Classroom deleted',
// //                     description: 'Classroom has been successfully deleted.',
// //                 });
// //             })
// //             .catch(error => {
// //                 notification.error({
// //                     message: 'Error deleting classroom',
// //                     description: error.message,
// //                 });
// //             });
// //     };

// //     // Open modal in edit mode with existing classroom data
// //     const openEditModal = (classroom) => {
// //         setIsEditMode(true);
// //         setCurrentClassroom(classroom);
// //         form.setFieldsValue({
// //             classroom_id: classroom.classroom_id,  // Include classroom_id in the form fields
// //             roomNumber: classroom.room_number,
// //             building: classroom.building,
// //             capacity: classroom.capacity,
// //         });
// //         setIsModalOpen(true);
// //     };

// //     return (
// //         <div>
// //             <h1>Classroom Management</h1>
// //             <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Classroom</Button>
// //             <Table
// //                 columns={[
// //                     { title: 'Classroom ID', dataIndex: 'classroom_id', key: 'classroom_id' },  // Display classroom_id
// //                     { title: 'Room Number', dataIndex: 'room_number', key: 'room_number' },
// //                     { title: 'Building', dataIndex: 'building', key: 'building' },
// //                     { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
// //                     {
// //                         title: 'Actions',
// //                         key: 'actions',
// //                         render: (_, record) => (
// //                             <>
// //                                 <Button onClick={() => openEditModal(record)} style={{ marginRight: 8 }}>Edit</Button>
// //                                 <Button onClick={() => handleDelete(record.classroom_id)} danger>Delete</Button>
// //                             </>
// //                         ),
// //                     },
// //                 ]}
// //                 dataSource={classrooms}
// //                 rowKey="classroom_id"
// //             />
// //             <Modal
// //                 title={isEditMode ? "Edit Classroom" : "Add Classroom"}
// //                 visible={isModalOpen}
// //                 onCancel={() => {
// //                     setIsModalOpen(false);
// //                     setIsEditMode(false);
// //                     setCurrentClassroom(null);
// //                     form.resetFields();
// //                 }}
// //                 onOk={isEditMode ? handleEdit : handleAdd}
// //             >
// //                 <Form form={form} layout="vertical">
// //                     <Form.Item name="classroom_id" label="Classroom ID" rules={[{ required: true }]} hidden={!isEditMode}>
// //                         <Input disabled={isEditMode} />
// //                     </Form.Item>
// //                     <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
// //                         <Input />
// //                     </Form.Item>
// //                     <Form.Item name="building" label="Building" rules={[{ required: true }]}>
// //                         <Input />
// //                     </Form.Item>
// //                     <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
// //                         <Input />
// //                     </Form.Item>
// //                 </Form>
// //             </Modal>
// //         </div>
// //     );
// // };

// // export default Classrooms;

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, notification } from 'antd';
// import axios from 'axios';

// const Classrooms = () => {
//     const [classrooms, setClassrooms] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEditMode, setIsEditMode] = useState(false);  // For toggling edit mode
//     const [currentClassroom, setCurrentClassroom] = useState(null); // Track the classroom being edited
//     const [form] = Form.useForm();

//     // Fetch all classrooms when the component mounts
//     useEffect(() => {
//         axios.get('http://localhost:3000/api/classrooms') // Ensure the correct URL
//             .then(response => setClassrooms(response.data))
//             .catch(error => {
//                 notification.error({
//                     message: 'Error fetching classrooms',
//                     description: error.message,
//                 });
//             });
//     }, []);

//     // Handle adding a new classroom
//     const handleAdd = () => {
//         form.validateFields().then((values) => {
//             axios.post('http://localhost:3000/api/classrooms', {
//                 room_number: values.roomNumber,
//                 building: values.building,
//                 capacity: values.capacity
//             })
//             .then(response => {
//                 setClassrooms([...classrooms, response.data]);
//                 form.resetFields();
//                 setIsModalOpen(false);
//                 notification.success({
//                     message: 'Classroom added',
//                     description: 'New classroom has been successfully added.',
//                 });
//             })
//             .catch(error => {
//                 notification.error({
//                     message: 'Error adding classroom',
//                     description: error.message,
//                 });
//             });
//         });
//     };

//     // Handle editing a classroom
//     const handleEdit = () => {
//         form.validateFields().then((values) => {
//             axios.put(`http://localhost:3000/api/classrooms/${currentClassroom.classroom_id}`, {
//                 room_number: values.roomNumber,
//                 building: values.building,
//                 capacity: values.capacity
//             })
//             .then(() => {
//                 setClassrooms(classrooms.map((classroom) =>
//                     classroom.classroom_id === currentClassroom.classroom_id ? { ...currentClassroom, ...values } : classroom
//                 ));
//                 form.resetFields();
//                 setIsModalOpen(false);
//                 setIsEditMode(false);
//                 setCurrentClassroom(null);
//                 notification.success({
//                     message: 'Classroom updated',
//                     description: 'Classroom details have been updated successfully.',
//                 });
//             })
//             .catch(error => {
//                 notification.error({
//                     message: 'Error updating classroom',
//                     description: error.message,
//                 });
//             });
//         });
//     };

//     // Handle deleting a classroom
//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:3000/api/classrooms/${id}`)
//             .then(() => {
//                 setClassrooms(classrooms.filter((classroom) => classroom.classroom_id !== id));
//                 notification.success({
//                     message: 'Classroom deleted',
//                     description: 'Classroom has been successfully deleted.',
//                 });
//             })
//             .catch(error => {
//                 notification.error({
//                     message: 'Error deleting classroom',
//                     description: error.message,
//                 });
//             });
//     };

//     // Open modal in edit mode with existing classroom data
//     const openEditModal = (classroom) => {
//         setIsEditMode(true);
//         setCurrentClassroom(classroom);
//         form.setFieldsValue({
//             roomNumber: classroom.room_number,
//             building: classroom.building,
//             capacity: classroom.capacity,
//         });
//         setIsModalOpen(true);
//     };

//     return (
//         <div>
//             <h1>Classroom Management</h1>
//             <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Classroom</Button>
//             <Table
//                 columns={[
//                     { title: 'Room Number', dataIndex: 'room_number', key: 'room_number' },
//                     { title: 'Building', dataIndex: 'building', key: 'building' },
//                     { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
//                     {
//                         title: 'Actions',
//                         key: 'actions',
//                         render: (_, record) => (
//                             <>
//                                 <Button onClick={() => openEditModal(record)} style={{ marginRight: 8 }}>Edit</Button>
//                                 <Button onClick={() => handleDelete(record.classroom_id)} danger>Delete</Button>
//                             </>
//                         ),
//                     },
//                 ]}
//                 dataSource={classrooms}
//                 rowKey="classroom_id"
//             />
//             <Modal
//                 title={isEditMode ? "Edit Classroom" : "Add Classroom"}
//                 open={isModalOpen}  // Changed from `visible` to `open`
//                 onCancel={() => {
//                     setIsModalOpen(false);
//                     setIsEditMode(false);
//                     setCurrentClassroom(null);
//                     form.resetFields();
//                 }}
//                 onOk={isEditMode ? handleEdit : handleAdd}
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="building" label="Building" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Classrooms;
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

const Classrooms = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentClassroom, setCurrentClassroom] = useState(null);
    const [form] = Form.useForm();

    // Fetch all classrooms when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/api/classrooms')
            .then(response => setClassrooms(response.data))
            .catch(error => {
                notification.error({
                    message: 'Error fetching classrooms',
                    description: error.message,
                });
            });
    }, []);

    // Handle adding a new classroom
    const handleAdd = () => {
        form.validateFields().then((values) => {
            axios.post('http://localhost:3000/api/classrooms', {
                room_number: values.roomNumber,
                building: values.building,
                capacity: values.capacity
            })
            .then(response => {
                setClassrooms([...classrooms, response.data]);
                closeModalAndReset();
                notification.success({
                    message: 'Classroom added',
                    description: 'New classroom has been successfully added.',
                });
            })
            .catch(error => {
                notification.error({
                    message: 'Error adding classroom',
                    description: error.message,
                });
            });
        });
    };

    // Handle editing a classroom
    const handleEdit = () => {
        form.validateFields().then((values) => {
            axios.put(`http://localhost:3000/api/classrooms/${currentClassroom.classroom_id}`, {
                room_number: values.roomNumber,
                building: values.building,
                capacity: values.capacity
            })
            .then(() => {
                setClassrooms(classrooms.map((classroom) =>
                    classroom.classroom_id === currentClassroom.classroom_id ? { ...currentClassroom, ...values } : classroom
                ));
                closeModalAndReset();
                notification.success({
                    message: 'Classroom updated',
                    description: 'Classroom details have been updated successfully.',
                });
            })
            .catch(error => {
                notification.error({
                    message: 'Error updating classroom',
                    description: error.message,
                });
            });
        });
    };

    // Handle deleting a classroom
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/classrooms/${id}`)
            .then(() => {
                setClassrooms(classrooms.filter((classroom) => classroom.classroom_id !== id));
                notification.success({
                    message: 'Classroom deleted',
                    description: 'Classroom has been successfully deleted.',
                });
            })
            .catch(error => {
                notification.error({
                    message: 'Error deleting classroom',
                    description: error.message,
                });
            });
    };

    // Open modal in edit mode with existing classroom data
    const openEditModal = (classroom) => {
        setIsEditMode(true);
        setCurrentClassroom(classroom);
        form.setFieldsValue({
            roomNumber: classroom.room_number,
            building: classroom.building,
            capacity: classroom.capacity,
        });
        setIsModalOpen(true);
    };

    // Close modal and reset form states
    const closeModalAndReset = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentClassroom(null);
        form.resetFields();
    };

    return (
        <div>
            <h1>Classroom Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Classroom</Button>
            <Table
                columns={[
                    { title: 'Classroom ID', dataIndex: 'classroom_id', key: 'classroom_id' },
                    { title: 'Room Number', dataIndex: 'room_number', key: 'room_number' },
                    { title: 'Building', dataIndex: 'building', key: 'building' },
                    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <>
                                <Button onClick={() => openEditModal(record)} style={{ marginRight: 8 }}>Edit</Button>
                                <Button onClick={() => handleDelete(record.classroom_id)} danger>Delete</Button>
                            </>
                        ),
                    },
                ]}
                dataSource={classrooms}
                rowKey="classroom_id"
            />
            <Modal
                title={isEditMode ? "Edit Classroom" : "Add Classroom"}
                open={isModalOpen}
                onCancel={closeModalAndReset}
                onOk={isEditMode ? handleEdit : handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="building" label="Building" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Classrooms;
