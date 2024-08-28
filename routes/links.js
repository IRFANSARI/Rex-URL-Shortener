const express = require('express');
const router = express.Router();

const {
  handleGetAllLinks,
  handleCreateLink,
  handleDeleteLink,
} = require('../controllers/links');

router
  .route('/')
  .get(handleGetAllLinks)
  .post(handleCreateLink)
  .delete(handleDeleteLink);

module.exports = router;
