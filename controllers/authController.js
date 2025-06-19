const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const generateOtp = require("../utils/generateOtp");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already in use" });

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await sendMail(email, "Verify your email", `Your OTP is: ${otp}`);

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, otp, otpExpiry });
  await user.save();

  res.json({ msg: "OTP sent to email" });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now())
    return res.status(400).json({ msg: "Invalid or expired OTP" });

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

const otpStore = new Map();

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = generateOtp();
  otpStore.set(email, otp);

  await sendMail(email, 'Reset Your Password - Aarvasa', `Your OTP is: ${otp}`);
  res.json({ message: 'OTP sent to your email' });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const validOtp = otpStore.get(email);
  if (!validOtp || validOtp !== otp)
    return res.status(400).json({ message: 'Invalid or expired OTP' });

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashed });

  otpStore.delete(email);
  res.json({ message: 'Password updated successfully' });
};