const express = require('express');

const { getLyrics } = require("./songs.controller.js");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/requireAuth.middleware.js");
router.get('/lyrics', authenticateToken, getLyrics);

module.exports = router;