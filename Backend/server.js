const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Import database module

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files (for front-end)

// Create orders table if it doesn't exist
db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        total_price REAL NOT NULL,
        products TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
  
  // Sign-Up Endpoint
  app.post('/signup', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
// Check if the email already exists in the database
db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Error checking for duplicate email:', err);
      return res.status(500).json({ message: 'Error checking email availability' });
    }

    if (row) {
      // If a user with this email already exists, return an error message
      return res.status(400).json({ message: 'Email already exists. Please choose a different email.' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user into the database
    db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        function (err) {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Error registering user' });
          }
          res.status(201).json({ message: 'User signed up successfully' });
        }
      );
    });
  });
  
  // Login Endpoint
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    // Retrieve user data from the database
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).json({ message: 'Error logging in' });
      }
  
      if (!row) {
        return res.status(400).json({ message: 'User not found' });
      }

// Compare the hashed password with the one provided
if (bcrypt.compareSync(password, row.password)) {
    // Password matches, login successful
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Password does not match
    res.status(400).json({ message: 'Incorrect password' });
  }
});
});

// In your server.js
app.post('/request-repair', (req, res) => {
  const { service, name, address, requestDate } = req.body;

  if (!service || !name || !address || !requestDate) {
    return res.status(400).json({ message: 'Missing repair request data' });
  }

  db.run(
    'INSERT INTO repair_requests (service, name, address, request_date) VALUES (?, ?, ?, ?)',
    [service, name, address, requestDate],
    function (err) {
      if (err) {
        console.error('Error inserting repair request:', err);
        return res.status(500).json({ message: 'Error processing repair request' });
      }

      res.status(200).json({ message: 'Repair request placed successfully' });
    }
  );
});

// Checkout Endpoint - Save order to the database
app.post('/checkout', (req, res) => {
const { userId, name, address, city, paymentMethod, totalPrice, products } = req.body;

if (!userId || !name || !address || !city || !paymentMethod || !totalPrice || !products) {
  return res.status(400).json({ message: 'Missing order data' });
}

// Log the received order data for debugging
console.log('Received order data:', {
  userId, name, address, city, paymentMethod, totalPrice, products
});

 // Insert the order data into the database
 db.run(
    'INSERT INTO orders (user_id, name, address, city, payment_method, total_price, products) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [userId, name, address, city, paymentMethod, totalPrice, JSON.stringify(products)],
    function (err) {
      if (err) {
        console.error('Error inserting order:', err);
        return res.status(500).json({ message: 'Error processing order' });
      }

      console.log('Order placed successfully:', this.lastID); // Log the inserted order ID
      res.status(200).json({ message: 'Order placed successfully' });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});