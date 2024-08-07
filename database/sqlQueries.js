const { db } = require('./connectDB.js');
const hostname = 'http://127.0.0.1/';

function addURL(longURL, username) {
  let shortURL = '';
  const sql1 = `select * from urls where long_url = "${longURL}" and username = "${username}"`;

  db.query(sql1, (err, data) => {
    if (err) shortURL = 'Error !!!';
    if (data.length > 0) {
      shortURL = data[0].short_url;
    }
  });

  if (shortURL != '') return shortURL;

  shortURL =
    hostname +
    username.substring(0, 3) +
    Date.now().toString(36).substring(2) +
    Math.random().toString(36).substring(6, 8) +
    username.substring(3, 6);

  const sql2 = `insert into urls (short_url, long_url, username) values ("${shortURL}", "${longURL}", "${username}")`;
  db.query(sql2, (err) => {
    if (err) return 'Error !!!';
  });

  return shortURL;
}

function showData() {
  const sql = `select * from urls`;

  db.query(sql, (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log('Length: ' + data.length);
  });
}

module.exports = { addURL, showData };
