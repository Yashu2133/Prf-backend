const express = require('express');
const { register, login, logout, resetPassword, resetPasswordConfirm } = require('../controllers/authControllers');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/reset_password', resetPassword);
authRouter.post('/reset_password_confirm/:token', resetPasswordConfirm);

module.exports = authRouter;
