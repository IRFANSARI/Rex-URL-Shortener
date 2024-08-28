const md5 = require('md5');
const shortUUID = require('short-uuid');
const authorizeUser = require('./authorizeUser');
const sqlQueries = require('./sqlQueries');

async function handleSignUp(req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  const result = await sqlQueries.addUser(username, password);

  if (result === 'Success') {
    const uuid = shortUUID.generate();

    authorizeUser.setCookie(username, uuid);
    res.cookie('user', username, { maxAge: 260000 });
    res.cookie('uuid', uuid, { maxAge: 260000 });

    res.json({ redirect: '/' });
  } else {
    res.json({ message: result });
  }
}

async function handleLogin(req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  const result = await sqlQueries.getUser(username, password);
  if (result === 'Success') {
    const uuid = shortUUID.generate();

    authorizeUser.setCookie(username, uuid);
    res.cookie('user', username, { maxAge: 260000 });
    res.cookie('uuid', uuid, { maxAge: 260000 });

    res.json({ redirect: '/' });
  } else {
    res.json({ message: result });
  }
}

function handleSignOut(req, res) {
  authorizeUser.deleteCookie(req.cookies.user);

  for (let cookie in req.cookies) {
    res.clearCookie(cookie);
  }

  res.redirect('/');
}

module.exports = {
  handleSignUp,
  handleLogin,
  handleSignOut,
};
