
# 🏡 Auth-Aarvasa - Real Estate Authentication Backend

A secure Node.js + Express backend for a real estate platform supporting:
- ✅ Email + Password Signup
- ✅ OTP Email Verification
- ✅ Google OAuth Login
- ✅ JWT-based authentication
- ✅ MongoDB for user storage
- ✅ Nodemailer for emailing

---

## 🌐 Live Frontend

Frontend is deployed at:  
🔗 [https://aarvasa-nine.vercel.app](https://aarvasa-nine.vercel.app)

---

## 🚀 Features

- 📧 Signup with OTP sent to email
- 🔐 Login with email + password
- 🧠 Sign in with Google (OAuth2)
- 🪪 JWT token generation after login
- 💾 MongoDB for persistent user storage
- ✉️ Nodemailer with Gmail SMTP
- ⚙️ Passport.js for Google authentication
- 🔒 Passwords hashed with bcrypt

---

## 📁 Project Structure

```
Auth-Aarvasa/
├── config/
│   ├── db.js                # MongoDB connection
│   └── passport.js          # Google OAuth strategy
├── controllers/
│   └── authController.js    # Signup, Login, OTP logic
├── models/
│   └── User.js              # User schema
├── routes/
│   └── authRoutes.js        # Auth endpoints
├── utils/
│   ├── generateOtp.js
│   └── sendMail.js
├── .env                     # Environment variables
├── server.js                # Entry point
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file at the root with the following keys:

```env
# MongoDB
MONGO_URI=your_mongo_connection_string

# JWT Secret
JWT_SECRET=your_secure_jwt_secret

# Gmail SMTP credentials
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=https://aarvasa-nine.vercel.app
```

---

## 📬 API Endpoints

### `POST /api/auth/signup`
- **Accepts**:  
  ```json
  { "email": "user@example.com", "password": "yourpassword" }
  ```
- **Action**: Sends OTP to user's email.

### `POST /api/auth/verify`
- **Accepts**:  
  ```json
  { "email": "user@example.com", "otp": "123456" }
  ```
- **Action**: Verifies OTP and returns JWT token.

### `POST /api/auth/login`
- **Accepts**:  
  ```json
  { "email": "user@example.com", "password": "yourpassword" }
  ```
- **Action**: Logs in and returns JWT token.

### `GET /api/auth/google`
- Initiates Google OAuth login via redirect

### `GET /api/auth/google/callback`
- Handles OAuth redirect from Google and redirects to frontend

---

## 🧪 Testing

You can test the APIs using **Postman** or any API client:

```
POST http://localhost:5000/api/auth/signup
POST http://localhost:5000/api/auth/verify
POST http://localhost:5000/api/auth/login
GET  http://localhost:5000/api/auth/google
```

---

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Auth-Aarvasa.git
   cd Auth-Aarvasa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and fill in your secrets.

4. Start the development server:
   ```bash
   nodemon server.js
   ```

---


