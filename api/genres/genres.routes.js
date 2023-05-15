const express = require('express');

const { query } = require("./genres.controller.js");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/requireAuth.middleware.js");

router.get('/query', authenticateToken, query);

module.exports = router;