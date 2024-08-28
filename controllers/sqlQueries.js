const shortid = require('shortid');
const { db } = require('../connectDB');
const hostname = process.env.URL;

function addUser(username, password) {
  return new Promise((resolve, reject) => {
    sql1 = 'SELECT * FROM users WHERE username = ?';

    db.query(sql1, [username], (err, data) => {
      if (data.length > 0) {
        resolve('Username already exists, Try again');
      } else {
        sql2 = 'INSERT INTO users (username, password) VALUES (?, ?)';

        db.query(sql2, [username, password], (err) => {
          resolve('Success');
        });
      }
    });
  });
}

function getUser(username, password) {
  return new Promise((resolve, reject) => {
    sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, data) => {
      if (data.length == 0) {
        resolve('Either username or password is incorrect');
      } else {
        resolve('Success');
      }
    });
  });
}

function getShortURL(longURL, username) {
  return new Promise((resolve, reject) => {
    const sql1 =
      'SELECT short_url FROM urls WHERE long_url = ? AND username = ?';

    db.query(sql1, [longURL, username], (err, data) => {
      if (data.length > 0) {
        resolve(data[0].short_url);
      } else {
        const shortURL =
          hostname +
          username[0] +
          shortid.generate() +
          username[username.length - 1];

        const sql2 =
          'INSERT INTO urls (short_url, long_url, username) VALUES (?, ?, ?)';
        db.query(sql2, [shortURL, longURL, username]);

        resolve(shortURL);
      }
    });
  });
}

function getLongURL(shortURL) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM urls WHERE short_url = ?';

    db.query(sql, [shortURL], (err, data) => {
      if (data.length == 0) {
        resolve(undefined);
      } else {
        resolve(data[0].long_url);
      }
    });
  });
}

function getLinks(username) {
  return new Promise((resolve, reject) => {
    sql = 'SELECT * FROM urls WHERE username = ? ORDER BY id DESC';

    db.query(sql, [username], (err, data) => {
      resolve(data);
    });
  });
}

function removeLink(username, shortURL) {
  sql = 'DELETE FROM urls WHERE username = ? AND short_url = ?';

  db.query(sql, [username, shortURL]);
}

module.exports = {
  addUser,
  getUser,
  getShortURL,
  getLongURL,
  getLinks,
  removeLink,
};
