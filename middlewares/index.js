const authorizeUser = require('../controllers/authorizeUser');

function checkForValidUserLogin() {
  return (req, res, next) => {
    if (req.cookies) {
      user = req.cookies.user;
      uuid = req.cookies.uuid;

      if (authorizeUser.getCookie(user, uuid)) {
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
  };
}

module.exports = { checkForValidUserLogin };
