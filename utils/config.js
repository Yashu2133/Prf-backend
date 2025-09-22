require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
<<<<<<< HEAD
const SENDGRID_SENDER = process.env.SENDGRID_SENDER;

module.exports = { MONGODB_URI, PORT, JWT_SECRET, SENDGRID_API_KEY, SENDGRID_SENDER };
=======
const FROM_EMAIL = process.env.FROM_EMAIL;

module.exports = { MONGODB_URI, PORT, JWT_SECRET, SENDGRID_API_KEY, FROM_EMAIL };
>>>>>>> 0a1f229 (Update backend for sendergrid and config changes)
