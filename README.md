# 📚 Library Management System

A **full-stack Library Management System** built with **FastAPI (Backend)** and **React + TypeScript (Frontend)**.  
This application allows managing books, issuing and returning books, and tracking issue history with a clean and responsive UI.

---

## 🚀 Features

### 📖 Book Management
- Add new books
- View all books with:
  - Search (by title / author)
  - Filter (available / out of stock)
  - Sorting
- Update book details
- Delete books
- Display Book ID for easy identification

### 📕 Issue Management
- Issue books to students
- Prevent issuing when copies are unavailable
- Return issued books
- Track issue history (latest 10 records)

### 🎨 Frontend
- React + TypeScript (Vite)
- Responsive UI
- Clean component-based architecture
- Smooth and modern UI controls

### ⚙️ Backend
- FastAPI REST APIs
- SQLite database
- SQLAlchemy ORM
- Pydantic validation
- Pytest test cases

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Axios
- CSS

### Backend
- FastAPI
- Python
- SQLAlchemy
- SQLite

---

##📂 Project Structure
library_management_system/
│
├── backend/
│ ├── app/
│ │ ├── core/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── schemas/
│ │ └── services/
│ ├── tests/
│ └── library.db
│
├── frontend/
│ └── library_management_system/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── types/
│ └── vite.config.ts
│
└── README.md

