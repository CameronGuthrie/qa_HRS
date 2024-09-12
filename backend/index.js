const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const db = new sqlite3.Database(':memory:'); // In-memory database for demo purposes
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined. Please set it in your .env file.');
  process.exit(1); // Stop server if JWT_SECRET is not set
}

const allowedOrigins = ['https://qa-hrs.onrender.com', 'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Serve front-end static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Initialize the SQLite database in memory and create the aa_customer table
db.serialize(() => {
  db.run(`CREATE TABLE aa_customer (
    customer_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_FirstName VARCHAR(50),
    customer_Surname VARCHAR(50),
    customer_email TEXT UNIQUE,
    customer_password TEXT
  )`);
});

app.post('/login', (req, res) => {
  console.log('Login request received:', req.body);  // Log the login request
  const { email, password } = req.body;

  db.get('SELECT * FROM aa_customer WHERE customer_email = ?', [email], (err, customer) => {
    if (err || !customer || !bcrypt.compareSync(password, customer.customer_password)) {
      console.error('Login failed:', err || 'Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ customer_ID: customer.customer_ID, email: customer.customer_email }, JWT_SECRET);
    console.log('Login successful, token generated:', token);  // Log the token
    res.json({ token });
  });
});

app.post('/register', (req, res) => {
  console.log('Register request received:', req.body);  // Log the registration request
  const { firstName, surname, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  db.run(
    'INSERT INTO aa_customer (customer_FirstName, customer_Surname, customer_email, customer_password) VALUES (?, ?, ?, ?)',
    [firstName, surname, email, hash],
    function (err) {
      if (err) {
        console.error('Registration failed:', err);
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(400).json({ message: 'Email is already registered.' });
        }
        return res.status(500).json({ message: 'Customer registration failed.' });
      }

      const token = jwt.sign({ customer_ID: this.lastID, email }, JWT_SECRET);
      console.log('Registration successful, token generated:', token);  // Log the token
      res.status(201).json({ token });
    }
  );
});


// Catch-all route to serve the front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
