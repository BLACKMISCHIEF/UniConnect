// // import React, { useState, useEffect } from 'react';
// // import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
// // import axios from 'axios';
// // import moment from 'moment';

// // const Attendance = () => {
// //     const [attendance, setAttendance] = useState([]);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [editingAttendance, setEditingAttendance] = useState(null);
// //     const [students, setStudents] = useState([]);
// //     const [courses, setCourses] = useState([]);  // Add courses state
// //     const [form] = Form.useForm();

// //     // Fetch attendance, students, and courses from the backend
// //     useEffect(() => {
// //         fetchAttendance();
// //         fetchStudents();
// //         fetchCourses();  // Fetch courses as well
// //     }, []);

// //     const fetchAttendance = async () => {
// //         try {
// //             const { data } = await axios.get('http://localhost:3000/api/attendance');
// //             setAttendance(data);
// //         } catch (error) {
// //             console.error("Error fetching attendance:", error);
// //             alert("Error fetching attendance. Check console for details.");
// //         }
// //     };

// //     const fetchStudents = async () => {
// //         try {
// //             const { data } = await axios.get('http://localhost:3000/api/students');
// //             setStudents(data);
// //         } catch (error) {
// //             console.error("Error fetching students:", error);
// //             alert("Error fetching students. Check console for details.");
// //         }
// //     };

// //     const fetchCourses = async () => {  // Fetch courses
// //         try {
// //             const { data } = await axios.get('http://localhost:3000/api/courses');
// //             setCourses(data);
// //         } catch (error) {
// //             console.error("Error fetching courses:", error);
// //             alert("Error fetching courses. Check console for details.");
// //         }
// //     };

// //     // Define columns to display attendance information
// //     const columns = [
// //         { title: 'Attendance ID', dataIndex: 'attendance_id', key: 'attendance_id' },
// //         { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },  // Displaying student ID only
// //         { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },  // New column
// //         { title: 'Date', dataIndex: 'attendance_date', key: 'attendance_date', render: date => moment(date).format('YYYY-MM-DD') },  // Updated column
// //         { title: 'Status', dataIndex: 'status', key: 'status' },
// //         {
// //             title: 'Actions',
// //             key: 'actions',
// //             render: (_, record) => (
// //                 <>
// //                     <Button onClick={() => handleEdit(record)}>Edit</Button>
// //                     <Button onClick={() => handleDelete(record.attendance_id)} danger>Delete</Button>
// //                 </>
// //             ),
// //         },
// //     ];

// //     // Add or edit attendance
// //     const handleAddEdit = async () => {
// //         try {
// //             const values = await form.validateFields();

// //             // Format the date for backend if it's a moment object
// //             if (values.attendance_date) {
// //                 values.attendance_date = values.attendance_date.format('YYYY-MM-DD'); // Format the date to match backend
// //             }

// //             if (editingAttendance) {
// //                 // Update attendance
// //                 await axios.put(`http://localhost:3000/api/attendance/${editingAttendance.attendance_id}`, values);

// //                 // Optimistically update the local state
// //                 setAttendance(attendance.map(att => 
// //                     att.attendance_id === editingAttendance.attendance_id ? { ...att, ...values } : att
// //                 ));
// //             } else {
// //                 // Add new attendance
// //                 const { data } = await axios.post('http://localhost:3000/api/attendance', values);

// //                 // Add the newly created attendance to the local state
// //                 setAttendance([...attendance, data]);
// //             }

// //             // Close the modal and reset the form
// //             setIsModalOpen(false);
// //             form.resetFields();
// //             setEditingAttendance(null);
// //         } catch (error) {
// //             console.error("Failed to add/edit attendance:", error);
// //             alert("Error: Could not save attendance. Check console for details.");
// //         }
// //     };

// //     // Populate form with attendance data for editing
// //     const handleEdit = (attendance) => {
// //         form.setFieldsValue({
// //             ...attendance,
// //             attendance_date: moment(attendance.attendance_date),  // Format the date for the DatePicker
// //         });
// //         setEditingAttendance(attendance);
// //         setIsModalOpen(true);
// //     };

// //     // Delete attendance
// //     const handleDelete = async (attendance_id) => {
// //         try {
// //             await axios.delete(`http://localhost:3000/api/attendance/${attendance_id}`);
// //             setAttendance(attendance.filter(att => att.attendance_id !== attendance_id));
// //         } catch (error) {
// //             console.error("Failed to delete attendance:", error);
// //             alert("Error: Could not delete attendance. Check console for details.");
// //         }
// //     };

// //     // Toggle modal visibility and reset form
// //     const toggleModal = (visible) => {
// //         setIsModalOpen(visible);
// //         if (!visible) {
// //             form.resetFields();
// //             setEditingAttendance(null);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Attendance Management</h1>
// //             <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingAttendance(null); }}>
// //                 Add Attendance
// //             </Button>
// //             <Table columns={columns} dataSource={attendance} rowKey="attendance_id" />

// //             <Modal
// //                 title={editingAttendance ? "Edit Attendance" : "Add Attendance"}
// //                 open={isModalOpen}
// //                 onCancel={() => toggleModal(false)}
// //                 onOk={handleAddEdit}
// //             >
// //                 <Form form={form} layout="vertical">
// //                     <Form.Item
// //                         name="attendance_id"
// //                         label="Attendance ID"
// //                         rules={[{ required: true, message: "Please enter a unique attendance ID" }]}>
// //                         <Input disabled={!!editingAttendance} />
// //                     </Form.Item>
// //                     <Form.Item
// //                         name="student_id"
// //                         label="Student ID"
// //                         rules={[{ required: true, message: "Please select a student" }]}>
// //                         <Select placeholder="Select a student">
// //                             {students.map(student => (
// //                                 <Select.Option key={student.student_id} value={student.student_id}>
// //                                     {student.student_id}  {/* Displaying student ID in dropdown */}
// //                                 </Select.Option>
// //                             ))}
// //                         </Select>
// //                     </Form.Item>
// //                     <Form.Item
// //                         name="course_id"
// //                         label="Course"
// //                         rules={[{ required: true, message: "Please select a course" }]}>
// //                         <Select placeholder="Select a course">
// //                             {courses.map(course => (
// //                                 <Select.Option key={course.course_id} value={course.course_id}>
// //                                     {course.course_name}
// //                                 </Select.Option>
// //                             ))}
// //                         </Select>
// //                     </Form.Item>
// //                     <Form.Item
// //                         name="attendance_date"
// //                         label="Date"
// //                         rules={[{ required: true, message: "Please select a date" }]}>
// //                         <DatePicker format="YYYY-MM-DD" />
// //                     </Form.Item>
// //                     <Form.Item
// //                         name="status"
// //                         label="Status"
// //                         rules={[{ required: true, message: "Please select the attendance status" }]}>
// //                         <Select>
// //                             <Select.Option value="Present">Present</Select.Option>
// //                             <Select.Option value="Absent">Absent</Select.Option>
// //                             <Select.Option value="Late">Late</Select.Option>
// //                         </Select>
// //                     </Form.Item>
// //                 </Form>
// //             </Modal>
// //         </div>
// //     );
// // };

// // export default Attendance;

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
// import axios from 'axios';
// import moment from 'moment';

// const Attendance = () => {
//     const [attendance, setAttendance] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingAttendance, setEditingAttendance] = useState(null);
//     const [students,setStudents] = useState([]);
//     const [courses, setCourses] = useState([]);  // Add courses state
//     const [form] = Form.useForm();

//     useEffect(() => {
//         fetchAttendance();
//         fetchStudents();
//         fetchCourses();
//     }, []);

//     const fetchAttendance = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:3000/api/attendance');
//             setAttendance(data);
//         } catch (error) {
//             console.error("Error fetching attendance:", error);
//             alert("Error fetching attendance. Check console for details.");
//         }
//     };

//     const fetchStudents = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:3000/api/students');
//             setStudents(data);
//         } catch (error) {
//             console.error("Error fetching students:", error);
//             alert("Error fetching students. Check console for details.");
//         }
//     };

//     const fetchCourses = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:3000/api/courses');
//             setCourses(data);
//         } catch (error) {
//             console.error("Error fetching courses:", error);
//             alert("Error fetching courses. Check console for details.");
//         }
//     };

//     const columns = [
//         { title: 'Attendance ID', dataIndex: 'attendance_id', key: 'attendance_id' },
//         { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
//         { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },
//         { title: 'Date', dataIndex: 'attendance_date', key: 'attendance_date', render: date => moment(date).format('YYYY-MM-DD') },
//         { title: 'Status', dataIndex: 'status', key: 'status' },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <>
//                     <Button onClick={() => handleEdit(record)}>Edit</Button>
//                     <Button onClick={() => handleDelete(record.attendance_id)} danger>Delete</Button>
//                 </>
//             ),
//         },
//     ];

//     const handleAddEdit = async () => {
//         try {
//             const values = await form.validateFields();
//             if (values.attendance_date) {
//                 values.attendance_date = values.attendance_date.format('YYYY-MM-DD');
//             }

//             if (editingAttendance) {
//                 await axios.put(`http://localhost:3000/api/attendance/${editingAttendance.attendance_id}`, values);
//                 setAttendance(attendance.map(att => 
//                     att.attendance_id === editingAttendance.attendance_id ? { ...att, ...values } : att
//                 ));
//             } else {
//                 const { data } = await axios.post('http://localhost:3000/api/attendance', values);
//                 setAttendance([...attendance, data]);
//             }

//             setIsModalOpen(false);
//             form.resetFields();
//             setEditingAttendance(null);
//         } catch (error) {
//             console.error("Failed to add/edit attendance:", error);
//             alert("Error: Could not save attendance. Check console for details.");
//         }
//     };

//     const handleEdit = (attendance) => {
//         form.setFieldsValue({
//             ...attendance,
//             attendance_date: moment(attendance.attendance_date),
//         });
//         setEditingAttendance(attendance);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async (attendance_id) => {
//         try {
//             await axios.delete(`http://localhost:3000/api/attendance/${attendance_id}`);
//             setAttendance(attendance.filter(att => att.attendance_id !== attendance_id));
//         } catch (error) {
//             console.error("Failed to delete attendance:", error);
//             alert("Error: Could not delete attendance. Check console for details.");
//         }
//     };

//     const toggleModal = (visible) => {
//         setIsModalOpen(visible);
//         if (!visible) {
//             form.resetFields();
//             setEditingAttendance(null);
//         }
//     };

//     return (
//         <div>
//             <h1>Attendance Management</h1>
//             <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingAttendance(null); }}>
//                 Add Attendance
//             </Button>
//             <Table columns={columns} dataSource={attendance} rowKey="attendance_id" />

//             <Modal
//                 title={editingAttendance ? "Edit Attendance" : "Add Attendance"}
//                 open={isModalOpen}
//                 onCancel={() => toggleModal(false)}
//                 onOk={handleAddEdit}
//             >
//                 <Form form={form} layout="vertical">
//                     <Form.Item
//                         name="attendance_id"
//                         label="Attendance ID"
//                         rules={[{ required: true, message: "Please enter a unique attendance ID" }]}>
//                         <Input disabled={!!editingAttendance} />
//                     </Form.Item>
//                     <Form.Item
//                         name="student_id"
//                         label="Student ID"
//                         rules={[{ required: true, message: "Please enter the student ID" }]}>
//                         <Input disabled /> {/* Display student ID as input and make it uneditable */}
//                     </Form.Item>
//                     <Form.Item
//                         name="course_id"
//                         label="Course"
//                         rules={[{ required: true, message: "Please select a course" }]}>
//                         <Select placeholder="Select a course">
//                             {courses.map(course => (
//                                 <Select.Option key={course.course_id} value={course.course_id}>
//                                     {course.course_name}
//                                 </Select.Option>
//                             ))}
//                         </Select>
//                     </Form.Item>
//                     <Form.Item
//                         name="attendance_date"
//                         label="Date"
//                         rules={[{ required: true, message: "Please select a date" }]}>
//                         <DatePicker format="YYYY-MM-DD" />
//                     </Form.Item>
//                     <Form.Item
//                         name="status"
//                         label="Status"
//                         rules={[{ required: true, message: "Please select the attendance status" }]}>
//                         <Select>
//                             <Select.Option value="Present">Present</Select.Option>
//                             <Select.Option value="Absent">Absent</Select.Option>
//                             <Select.Option value="Late">Late</Select.Option>
//                         </Select>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default Attendance;
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAttendance, setEditingAttendance] = useState(null);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAttendance();
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchAttendance = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/attendance');
            setAttendance(data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
            alert("Error fetching attendance. Check console for details.");
        }
    };

    const fetchStudents = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/students');
            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
            alert("Error fetching students. Check console for details.");
        }
    };

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/courses');
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            alert("Error fetching courses. Check console for details.");
        }
    };

    const columns = [
        { title: 'Attendance ID', dataIndex: 'attendance_id', key: 'attendance_id' },
        { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
        { title: 'Course ID', dataIndex: 'course_id', key: 'course_id' },
        { title: 'Date', dataIndex: 'attendance_date', key: 'attendance_date', render: date => moment(date).format('YYYY-MM-DD') },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.attendance_id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    const handleAddEdit = async () => {
        try {
            const values = await form.validateFields();
            if (values.attendance_date) {
                values.attendance_date = values.attendance_date.format('YYYY-MM-DD');
            }

            if (editingAttendance) {
                await axios.put(`http://localhost:3000/api/attendance/${editingAttendance.attendance_id}`, values);
                setAttendance(attendance.map(att => 
                    att.attendance_id === editingAttendance.attendance_id ? { ...att, ...values } : att
                ));
            } else {
                const { data } = await axios.post('http://localhost:3000/api/attendance', values);
                setAttendance([...attendance, data]);
            }

            setIsModalOpen(false);
            form.resetFields();
            setEditingAttendance(null);
        } catch (error) {
            console.error("Failed to add/edit attendance:", error);
            alert("Error: Could not save attendance. Check console for details.");
        }
    };

    const handleEdit = (attendance) => {
        form.setFieldsValue({
            ...attendance,
            attendance_date: moment(attendance.attendance_date),
        });
        setEditingAttendance(attendance);
        setIsModalOpen(true);
    };

    const handleDelete = async (attendance_id) => {
        try {
            await axios.delete(`http://localhost:3000/api/attendance/${attendance_id}`);
            setAttendance(attendance.filter(att => att.attendance_id !== attendance_id));
        } catch (error) {
            console.error("Failed to delete attendance:", error);
            alert("Error: Could not delete attendance. Check console for details.");
        }
    };

    const toggleModal = (visible) => {
        setIsModalOpen(visible);
        if (!visible) {
            form.resetFields();
            setEditingAttendance(null);
        }
    };

    return (
        <div>
            <h1>Attendance Management</h1>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setEditingAttendance(null); }}>
                Add Attendance
            </Button>
            <Table columns={columns} dataSource={attendance} rowKey="attendance_id" />

            <Modal
                title={editingAttendance ? "Edit Attendance" : "Add Attendance"}
                open={isModalOpen}
                onCancel={() => toggleModal(false)}
                onOk={handleAddEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="attendance_id"
                        label="Attendance ID"
                        rules={[{ required: true, message: "Please enter a unique attendance ID" }]}>
                        <Input disabled={!!editingAttendance} />
                    </Form.Item>
                    <Form.Item
                        name="student_id"
                        label="Student ID"
                        rules={[{ required: true, message: "Please enter the student ID" }]}>
                        <Input disabled={!!editingAttendance} />
                    </Form.Item>
                    <Form.Item
                        name="course_id"
                        label="Course ID"
                        rules={[{ required: true, message: "Please enter the course ID" }]}>
                        <Input disabled={!!editingAttendance} />
                    </Form.Item>
                    <Form.Item
                        name="attendance_date"
                        label="Date"
                        rules={[{ required: true, message: "Please select a date" }]}>
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select the attendance status" }]}>
                        <Select>
                            <Select.Option value="Present">Present</Select.Option>
                            <Select.Option value="Absent">Absent</Select.Option>
                            <Select.Option value="Late">Late</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Attendance;
