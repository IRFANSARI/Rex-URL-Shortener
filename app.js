// app.js
const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mock user data (Replace with real authentication)
const mockUser = {
  username: 'JohnDoe',
  email: 'john@example.com',
};

// Routes
app.get('/', (req, res) => {
  // Check if user is logged in (Replace with real authentication check)
  const user = req.query.user ? mockUser : null;
  res.render('index', { user });
});

app.get('/login', (req, res) => {
  res.render('login', { user: null });
});

app.get('/signup', (req, res) => {
  res.render('signup', { user: null });
});

app.get('/links', (req, res) => {
  // Fetch user's links from the database (Replace with real data)
  const links = [
    { _id: '1', shortUrl: 'abc123', longUrl: 'https://www.example.com' },
    { _id: '2', shortUrl: 'def456', longUrl: 'https://www.google.com' },
  ];
  res.render('links', { user: mockUser, links, request: req });
});

app.post('/api/shorten', (req, res) => {
  const { longUrl } = req.body;
  // Implement your URL shortening logic here
  const shortUrl = 'xyz789'; // Example short URL
  res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}` });
});

app.get('/logout', (req, res) => {
  // Implement your logout logic here
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
