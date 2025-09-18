require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER = process.env.SENDGRID_SENDER;

module.exports = { MONGODB_URI, PORT, JWT_SECRET, SENDGRID_API_KEY, SENDGRID_SENDER };
