const userCookies = new Map();

function setCookie(user, uuid) {
  userCookies.set(user, uuid);
}

function getCookie(user, uuid) {
  return userCookies.has(user) && userCookies.get(user) === uuid;
}

function deleteCookie(user) {
  return userCookies.delete(user);
}

module.exports = { setCookie, getCookie, deleteCookie };
