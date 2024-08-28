require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const userRouter = require('./routes/user');
const linksRouter = require('./routes/links');
const handleRedirection = require('./controllers/handleRedirection');
const { checkForValidUserLogin } = require('./middlewares/index');

// Environment Variables
const hostname = process.env.URL;
const port = process.env.PORT;
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkForValidUserLogin());
app.set('view engine', 'ejs');

// Handling Requests
app.get('/', (req, res) => {
  res.render('home');
});
app.use('/user', userRouter);
app.use('/links', linksRouter);
app.get('*', handleRedirection);

// Starting the server
app.listen(port || 8080, () => {
  console.log(`Server running at ${hostname}`);
});
