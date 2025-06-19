const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  otp: String,
  otpExpiry: Date,
  googleId: String,
});

module.exports = mongoose.model("User", userSchema);
