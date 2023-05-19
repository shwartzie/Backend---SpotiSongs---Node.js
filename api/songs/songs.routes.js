const express = require('express');

const { getLyrics, getTracks } = require("./songs.controller.js");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/requireAuth.middleware.js");
router.get('/lyrics', authenticateToken, getLyrics);
router.get('/:id/tracks', getTracks);

module.exports = router;