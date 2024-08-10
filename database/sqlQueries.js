const { db } = require('./connectDB.js');
const hostname = process.env.URL;

function getShortURL(longURL, username) {
  return new Promise((resolve, reject) => {
    const sql1 = `select short_url from urls where long_url = '${longURL}' and username = '${username}'`;

    db.query(sql1, (err, data) => {
      if (data.length > 0) {
        resolve(data[0].short_url);
      } else {
        const shortURL =
          hostname +
          username.substring(0, 3) +
          Date.now().toString(36).substring(2) +
          Math.random().toString(36).substring(6, 8) +
          username.substring(3, 6);

        const sql2 = `insert into urls (short_url, long_url, username) values ('${shortURL}', '${longURL}', '${username}')`;
        db.query(sql2);

        resolve(shortURL);
      }
    });
  });
}

function getLongURL(shortURL) {
  return new Promise((resolve, reject) => {
    const sql = `select * from urls where short_url = '${shortURL}'`;

    db.query(sql, (err, data) => {
      if (data.length == 0) {
        resolve(undefined);
      } else {
        resolve(data[0].long_url);
      }
    });
  });
}

function addUser(username, password) {
  return new Promise((resolve, reject) => {
    sql1 = `select * from users where username = '${username}'`;

    db.query(sql1, (err, data) => {
      if (data.length > 0) {
        resolve('Username already exists, Try again');
      } else {
        sql2 = `insert into users (username, password) values ('${username}', '${password}')`;

        db.query(sql2, (err) => {
          resolve('Success');
        });
      }
    });
  });
}

function getUser(username, password) {
  return new Promise((resolve, reject) => {
    sql = `select * from users where username = '${username}' and password = '${password}'`;

    db.query(sql, (err, data) => {
      if (data.length == 0) {
        resolve('Either username or password is incorrect');
      } else {
        resolve('Success');
      }
    });
  });
}

function getLinks(username) {
  return new Promise((resolve, reject) => {
    sql = `select * from urls order by id desc`;

    db.query(sql, (err, data) => {
      resolve(data);
    });
  });
}

module.exports = { getShortURL, getLongURL, addUser, getUser, getLinks };
