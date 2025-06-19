const express = require("express");
const passport = require("passport");
const { signup, verifyOtp, login, requestPasswordReset, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_URL + "/login",
  })
);

module.exports = router;
