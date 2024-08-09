require('dotenv').config();
const express = require('express');
const path = require('path');
const md5 = require('md5');
const shortUUID = require('short-uuid');
const cookieParser = require('cookie-parser');
const sqlQueries = require('./database/sqlQueries.js');
const auth = require('./middleware/auth.js');

const hostname = process.env.URL;
const server = express();
const port = process.env.PORT;

const publicDirPath = path.join(__dirname, 'public');
server.use(express.static(publicDirPath));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.get('/', (req, res) => {
  if (req.cookies) {
    user = req.cookies.user;
    uuid = req.cookies.uuid;

    if (auth.getCookie(user, uuid)) {
      res.redirect('/home');
    } else {
      res.sendFile(path.join(publicDirPath, 'index1.html'));
    }
  } else {
    res.sendFile(path.join(publicDirPath, 'index1.html'));
  }
});

server.get('/signout', (req, res) => {
  auth.deleteCookie(req.cookies.user);

  for (let cookie in req.cookies) {
    res.clearCookie(cookie);
  }

  res.redirect('/');
});

server.post('/login', (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);

  sqlQueries.getUser(username, password).then((result) => {
    if (result === 'Success') {
      const uuid = shortUUID.generate();

      auth.setCookie(username, uuid);
      res.cookie('user', username, { maxAge: 260000 });
      res.cookie('uuid', uuid, { maxAge: 260000 }); // Set for 3 days
      res.json({ redirect: '/home' });
    } else {
      res.json({ message: result });
    }
  });
});

server.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);

  sqlQueries.addUser(username, password).then((result) => {
    if (result === 'Success') {
      const uuid = shortUUID.generate();

      auth.setCookie(username, uuid);
      res.cookie('user', username, { maxAge: 260000 });
      res.cookie('uuid', uuid, { maxAge: 260000 }); // Set for 3 days
      res.json({ redirect: '/home' });
    } else {
      res.json({ message: result });
    }
  });
});

server.get('/home', (req, res) => {
  if (req.cookies) {
    user = req.cookies.user;
    uuid = req.cookies.uuid;

    if (auth.getCookie(user, uuid)) {
      res.sendFile(path.join(publicDirPath, 'home.html'));
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

server.post('/home', (req, res) => {
  if (req.cookies) {
    user = req.cookies.user;
    uuid = req.cookies.uuid;

    if (auth.getCookie(user, uuid)) {
      const longURL = req.body.url;
      const username = user;

      sqlQueries.getShortURL(longURL, username).then((shortURL) => {
        res.json({ message: shortURL });
      });
    } else {
      res.json({ redirect: '/' });
    }
  } else {
    res.json({ redirect: '/' });
  }
});

server.get('*', (req, res) => {
  const shortURL = hostname + req.originalUrl.substring(1);

  sqlQueries.getLongURL(shortURL).then((longURL) => {
    if (longURL === undefined) {
      res.status(404).send('404 Page not Found. Please check your link.');
    } else {
      res.redirect(longURL);
    }
  });
});

server.listen(port || 8080, () => {
  console.log(`Server running at ${hostname}`);
});
