const { db } = require('./connectDB.js');
const hostname = 'http://127.0.0.1:8080/';

function getShortURL(longURL, username) {
  return new Promise((resolve, reject) => {
    const sql1 = `select * from urls where long_url = "${longURL}" and username = "${username}"`;

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

        const sql2 = `insert into urls (short_url, long_url, username) values ("${shortURL}", "${longURL}", "${username}")`;
        db.query(sql2);

        resolve(shortURL);
      }
    });
  });
}

module.exports = { getShortURL };
