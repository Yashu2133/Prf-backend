const express = require('express');
const errorRoute = require('./utils/errorRoute');
const logger = require('./utils/logger');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://passresettt.netlify.app/',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(logger);

// routes
app.use('/api/v2/auth', authRouter);

// 404
app.use(errorRoute);

module.exports = app;
