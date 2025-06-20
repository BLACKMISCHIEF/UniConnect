# UniConnect Student Management System

A full-stack web application to manage student-related information for an educational institute. Built with **React** (frontend), **Node.js/Express** (backend), and **PostgreSQL** (database), and deployed using **Vercel** (frontend) and **Render** (backend).

## 🌐 Live Links
- **Frontend (React)**: [https://uni-connect-git-main-jdoijad15115s-projects.vercel.app](https://uni-connect-git-main-jdoijad15115s-projects.vercel.app)
- **Backend (API)**: [https://uniconnect-mv75.onrender.com/api](https://uniconnect-mv75.onrender.com/api)

---

## 📁 Features Implemented
- CRUD operations for:
  - Students
  - Courses
  - Departments
  - Instructors
  - Classrooms
  - Enrollments
  - Attendance
  - Alumni
- Fully functional admin dashboard using Ant Design UI components
- PostgreSQL database with relational schema and foreign key constraints
- Error handling and form validation on frontend/backend
- CORS configuration to allow deployment across domains

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Axios
- Ant Design
- React Router DOM
- Moment.js

### Backend
- Node.js
- Express.js
- PostgreSQL with pg
- dotenv
- body-parser
- CORS

### Deployment
- **Frontend**: Vercel
- **Backend + DB**: Render

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js and npm
- PostgreSQL installed and running

### Backend Setup
```bash
cd backend
npm install
```

> Create `.env` file in root with your DB credentials:
```
DATABASE_URL=postgresql://<username>:<password>@<host>/<database>
```

Run the server:
```bash
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🌱 Database
- The schema contains tables: `students`, `courses`, `departments`, `instructors`, `classrooms`, `enrollments`, `attendance`, and `alumni`
- Make sure you import all necessary tables before interacting with routes

---

## 📦 API Endpoints

Each endpoint is prefixed with `/api`

| Route              | Method | Description                 |
|-------------------|--------|-----------------------------|
| `/students`       | GET    | Fetch all students          |
| `/students/:id`   | GET    | Fetch a student by ID       |
| `/students`       | POST   | Add new student             |
| `/students/:id`   | PUT    | Update student              |
| `/students/:id`   | DELETE | Delete student              |

_Similar routes exist for:_ `courses`, `departments`, `enrollments`, `attendance`, `classrooms`, `alumni`

---

## ⚠️ Troubleshooting

- 500 errors: Usually due to schema mismatch or foreign key violations
- 404 errors: Check route prefix `/api/...`
- CORS errors: Make sure `cors()` is correctly configured in `server.js`

---

## 🤝 Credits
- Designed and developed by **Janhavi Doijad**

---

## 📄 License
MIT License
