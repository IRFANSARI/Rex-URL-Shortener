const express = require('express');
const path = require('path');
const sqlQueries = require('./database/sqlQueries.js');

const server = express();
const port = 8080;

const publicDirPath = path.join(__dirname, 'public');
server.use(express.static(publicDirPath));
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.sendFile(path.join(publicDirPath, 'index.html'));
});

server.post('/', (req, res) => {
  const longURL = req.body.url;
  const username = 'irfansari';

  sqlQueries.getShortURL(longURL, username).then((shortURL) => {
    res.send(shortURL);
  });
});

server.get('/dir', (req, res) => {
  res.send('Hello Brother');
});

server.get('*', (req, res) => {
  res.send('new fear unlock');
});

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
