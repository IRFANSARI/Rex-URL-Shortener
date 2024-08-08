require('dotenv').config();
const express = require('express');
const path = require('path');
const sqlQueries = require('./database/sqlQueries.js');

const hostname = process.env.URL;
const server = express();
const port = process.env.PORT;

const publicDirPath = path.join(__dirname, 'public');
server.use(express.static(publicDirPath));
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.sendFile(path.join(publicDirPath, 'index.html'));
});

server.post('/', (req, res) => {
  const longURL = req.body.url;
  const username = 'apwemf';

  sqlQueries.getShortURL(longURL, username).then((shortURL) => {
    res.send(shortURL);
  });
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
