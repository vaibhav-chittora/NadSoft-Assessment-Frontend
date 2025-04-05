# 📚 Student Management System

A full-stack **Student Management System** built with **MERN Stack** that allows users to add, edit, delete, and paginate student records. Clean UI, real-time updates, and easy extendability for future enhancements.

---

## [Live Demo Link 🌐]()

## 🚀 Features

- ➕ Add new student with validation
- ✏️ Edit student details
- ❌ Delete student with confirmation
- 🔄 Pagination for navigating large datasets
- ⚠️ SweetAlert2 modals for smooth UX
- 📡 REST API integration with MongoDB backend

---

## 🧰 Tech Stack

### 💻 Frontend:

- React.js (Hooks, Functional Components)
- Axios for HTTP requests
- Bootstrap 5 for responsive UI
- SweetAlert2 for alerts/modals

### 🖥️ Backend:

- Node.js with Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture
- CORS + Body Parser

---

## 🏁 Getting Started

### 🔧 Backend Setup

```bash
cd backend
npm install
npm start
```

> Server runs on: `http://localhost:3000/api`

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

> React App runs on: `http://localhost:5173` (or depending on your Vite/CRA setup)

---

## 📁 Project Structure

```bash
frontend/
├── components/
│   └── StudentFormModal.jsx
├── pages/
│   └── StudentList.jsx
backend/
├── models/
│   └── Student.js
├── routes/
│   └── studentRoutes.js
├── controllers/
│   └── studentController.js
├──services/
│   └── studentService.js
    └── marksService.js
..... etc


```

---

## 🌱 Future Enhancements

- ✅ Search functionality (by name/email)
- 🧮 Add marks/grades system (one-to-many relation)
- 📊 Chart.js or Recharts integration for analytics
- 📥 CSV/Excel Export & Import of students
- 🛡️ User Authentication (Login/Admin roles)
- 🔐 JWT/OAuth2 for secure API access
- 📈 Real-time updates with WebSockets
- 📝 Documentation with Swagger/OpenAPI
- 🔍 Search by multiple fields (name, email, etc.)
