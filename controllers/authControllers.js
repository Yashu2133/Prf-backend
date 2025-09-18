const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SENDGRID_API_KEY, SENDGRID_SENDER } = require('../utils/config');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const authControllers = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: `User registered successfully ${user.name}` });
    } catch (err) {
      res.status(500).json({ message: `There is an error : ${err.message}` });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User does not exist' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Strict' });

      console.log('User found:', user);
      console.log('Password valid:', isPasswordValid);
      console.log('Token:', token);

      res.status(200).json({ message: `User logged in successfully ${user.name}` });
    } catch (err) {
      return res.status(500).json({ message: `Login failed : ${err.message}` });
    }
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
  },
resetPassword: async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `https://passwordreset-flow-frontend.netlify.app/reset-password/${token}`;

    // ✅ Configure SendGrid transport
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey', // fixed value
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    // ✅ Send mail
    await transporter.sendMail({
      from: process.env.SENDGRID_SENDER,  // must be verified sender in SendGrid
      to: email,
      subject: 'Reset your password',
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: `There is an error in resetting password : ${err.message}` });
  }
},

resetPasswordConfirm: async (req, res) => {
  try {
    const rawToken = req.params.token;
    const token = rawToken.trim();

    const { password } = req.body;

    console.log('🔹 Incoming raw token:', JSON.stringify(rawToken));
    console.log('🔹 Clean token (trimmed):', JSON.stringify(token));
    console.log('🔹 Incoming password:', password);
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    console.log('🔹 User found:', user ? user.email : null);

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired token. Please request a new password reset link.' 
      });
    }

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: 'Password has been reset successfully' 
    });

  } catch (err) {
    res.status(500).json({ 
      message: `Error resetting password: ${err.message}` 
    });
  }
}

};

module.exports = authControllers;
