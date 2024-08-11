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

server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.set('view engine', 'ejs');

server.use((req, res, next) => {
  if (req.cookies) {
    user = req.cookies.user;
    uuid = req.cookies.uuid;

    if (auth.getCookie(user, uuid)) {
      res.locals.isLoggedIn = true;
      res.locals.username = user;
    } else {
      res.locals.isLoggedIn = false;
      res.locals.username = '';
    }
  } else {
    res.locals.isLoggedIn = false;
    res.locals.username = '';
  }

  next();
});

server.get('/', (req, res) => {
  res.render('home');
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
      res.cookie('uuid', uuid, { maxAge: 260000 });
      res.json({ redirect: '/' });
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
      res.cookie('uuid', uuid, { maxAge: 260000 });
      res.json({ redirect: '/' });
    } else {
      res.json({ message: result });
    }
  });
});

server.post('/shorten', (req, res) => {
  if (req.cookies) {
    const user = req.cookies.user;
    const uuid = req.cookies.uuid;

    if (auth.getCookie(user, uuid)) {
      const longURL = req.body.url;
      const username = req.cookies.user;

      const schemes = [
        'http://',
        'https://',
        'ftp://',
        'ftps://',
        'mailto:',
        'file://',
        'www.',
      ];

      const startsWithScheme = schemes.some((scheme) =>
        longURL.startsWith(scheme)
      );

      if (!startsWithScheme) {
        res.json({ error: 'Invalid URL !!!' });
      } else {
        sqlQueries.getShortURL(longURL, username).then((shortURL) => {
          res.json({ message: shortURL });
        });
      }
    } else {
      res.json({ error: 'Please Login or SignUp to use it' });
    }
  } else {
    res.json({ error: 'Please Login or SignUp to use it' });
  }
});

server.get('/links', (req, res) => {
  if (req.cookies) {
    const user = req.cookies.user;
    const uuid = req.cookies.uuid;

    if (auth.getCookie(user, uuid)) {
      const username = req.cookies.user;

      sqlQueries.getLinks(username).then((data) => {
        res.render('links', { data });
      });
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

server.post('/delete', (req, res) => {
  if (req.cookies) {
    const user = req.cookies.user;
    const uuid = req.cookies.uuid;

    if (auth.getCookie(user, uuid)) {
      const username = req.cookies.user;
      const shortURL = req.body.shortURL;

      sqlQueries.removeLink(username, shortURL);

      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: 'No cookies found' });
  }
});

server.get('*', (req, res) => {
  const shortURL = hostname + req.originalUrl.substring(1);

  sqlQueries.getLongURL(shortURL).then((longURL) => {
    if (longURL === undefined) {
      res.status(404).render('404');
    } else {
      res.redirect(longURL);
    }
  });
});

server.listen(port || 8080, () => {
  console.log(`Server running at ${hostname}`);
});
