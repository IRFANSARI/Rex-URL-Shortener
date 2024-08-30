const authorizeUser = require('./authorizeUser');
const sqlQueries = require('./sqlQueries');
const hostname = process.env.URL;

async function handleGetAllLinks(req, res) {
  if (req.cookies) {
    const user = req.cookies.user;
    const uuid = req.cookies.uuid;

    if (authorizeUser.getCookie(user, uuid)) {
      const username = req.cookies.user;

      let data = await sqlQueries.getLinks(username);
      data = data.map((item) => ({
        ...item,
        short_url: `${hostname}${item.short_url}`,
      }));

      res.render('links', { data });
    } else {
      res.status(401).redirect('/');
    }
  } else {
    res.status(401).redirect('/');
  }
}

async function handleCreateLink(req, res) {
  if (req.cookies) {
    const user = req.cookies.user;
    const uuid = req.cookies.uuid;

    if (authorizeUser.getCookie(user, uuid)) {
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
        let shortURL = await sqlQueries.getShortURL(longURL, username);
        shortURL = hostname + shortURL;
        res.json({ message: shortURL });
      }
    } else {
      res.json({ error: 'Please Login or SignUp to use it' });
    }
  } else {
    res.json({ error: 'Please Login or SignUp to use it' });
  }
}

function handleDeleteLink(req, res) {
  if (req.cookies) {
    const user = req.cookies.user;
    const uuid = req.cookies.uuid;

    if (authorizeUser.getCookie(user, uuid)) {
      const username = req.cookies.user;
      let shortURL = req.body.shortURL;
      shortURL = shortURL.replace(hostname, '');

      sqlQueries.removeLink(username, shortURL);
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

module.exports = {
  handleGetAllLinks,
  handleCreateLink,
  handleDeleteLink,
};
