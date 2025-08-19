# Password Reset Flow - Backend

This is the **Node.js + Express + MongoDB** backend for the Password Reset Flow project.  
It handles user authentication, session management, and password reset.

---

## 🚀 Features

- User Registration (name, email, password)
- User Login with JWT Authentication
- Logout functionality
- Forgot Password (sends reset link via email)
- Reset Password (using token)
- MongoDB for storage
- Express middleware for authentication

---

## 📂 Folder Structure

```

prf-backend/
├── controllers/
│   └── authControllers.js
├── middleware/
│   └── auth.js
├── models/
│   └── user.js
├── routes/
│   └── authRouter.js
├── utils/
│   ├── config.js
│   ├── errorRoute.js
│   └── logger.js
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── package-lock.json

```

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Yashu2133/Prf-backend
cd Prf-backend
```
---

2. **Install dependencies**

```bash
npm install
```

---

3. **Create a .env file and add your environment variables**

```bash
PORT=3001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/password-reset
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
---

4. **Run the Application**

```bash
npm run dev
```

---