const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

require("./config/passport");

const app = express();
app.use(express.json());
app.use(session({ secret: 'otpsecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("cors")({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
