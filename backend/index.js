const express = require('express');
const serverless = require('serverless-http');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:');
const JWT_SECRET = 'your_jwt_secret';

// Replace with your actual domain
const allowedOrigins =  ['https://qa-hrs.onrender.com']; 

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This allows cookies and other credentials to be included in requests
};

app.use(express.json());
app.use(cors(corsOptions)); // Apply the CORS configuration

// Initialize the SQLite database in memory and create the users table
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)');
});

// Register a new user
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], function (err) {
    if (err) {
      return res.status(500).json({ message: 'User registration failed' });
    }
    const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET);
    res.status(201).json({ token });
  });
});

// Login an existing user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
  });
});

module.exports.handler = serverless(app);
