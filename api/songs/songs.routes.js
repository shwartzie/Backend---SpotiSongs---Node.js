const express = require('express');

const { getLyrics, getTracks, addTracks} = require("./songs.controller.js");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/requireAuth.middleware.js");
router.get('/lyrics', authenticateToken, getLyrics);
router.get('/:id/tracks', getTracks);
router.post('/:id/tracks/add',addTracks)

module.exports = router;