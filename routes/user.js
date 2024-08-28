const express = require('express');
const router = express.Router();

const {
  handleSignUp,
  handleLogin,
  handleSignOut,
} = require('../controllers/user');

router.post('/signup', handleSignUp);
router.post('/login', handleLogin);
router.get('/signout', handleSignOut);

module.exports = router;
