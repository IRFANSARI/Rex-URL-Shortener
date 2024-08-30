const path = require('path');
const sqlQueries = require('./sqlQueries');
const hostname = process.env.URL;

module.exports = async function (req, res) {
  const shortURL = req.originalUrl.substring(1);

  const longURL = await sqlQueries.getLongURL(shortURL);
  if (longURL === undefined) {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
  } else {
    res.redirect(longURL);
  }
};
