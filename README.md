# Personal Finance Tracker (MERN Stack)

A full-stack Personal Finance Tracker application that helps users manage their income, expenses, budgets, and view financial analytics.  
Built using the MERN stack with secure authentication and deployed fully on free cloud platforms.

---

## Live Demo

Frontend : [Vercel](https://personal-finance-tracker-git-main-yatin-annams-projects.vercel.app?_vercel_share=m7DEagv7ejjjYBS9RMSY4uoSX1LzsKzu) <br>
Backend : [Render](https://finance-tracker-backend-o5xn.onrender.com)

---

## Features

- User authentication (Register / Login) using JWT
- Add, edit and delete income & expense transactions
- Category wise transaction tracking
- Monthly analytics with interactive charts
- Month wise data navigation
- Budget setting with over-budget alerts
- Clean and responsive UI with subtle animations
- Fully deployed on free cloud platforms

---

## Tech Stack

### Frontend
- React.js (Vite)
- Axios
- Chart.js / Recharts
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB Atlas (Cloud)

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## Project Structure
```bash
personal-finance-tracker/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── styles.css
│ │ └── main.jsx
│ └── package.json
│
└── README.md
```
---

## Environment Variables

### Backend (`backend/.env`)
```env
MONGO_URI = your_mongodb_atlas_uri
JWT_SECRET = your_secret_key
```

### Frontend (frontend/.env)
```env
VITE_API_URL = https://your-backend-name.onrender.com/api
```
---

## Setup Instructions (Local)

1. Clone the repository
```
git clone https://github.com/yatinannam/Personal-Finance-Tracker.git
cd personal-finance-tracker
```

2. Backend Setup
```
cd backend
npm install
npm start
```

3. Frontend Setup
```
cd frontend
npm install
npm run dev
```
---

## Contributing

Contributions are welcome and appreciated!
If you like this project, feel free to star the repository!
To contribute to this project, please follow these steps:

1. Fork the repository

2. Create a new branch  
```bash
git checkout -b feature/your-feature-name
```
3. Make your changes and commit them
```bash
git commit -m "Add: brief description of changes"
```
4. Push to fork
```bash
git push origin feature/your-feature-name
```
5. Open a Pull Request describing your changes
---
