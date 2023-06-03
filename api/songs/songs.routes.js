const express = require('express');

const { getLyrics, getUserTracks, addTracks} = require("./songs.controller.js");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/requireAuth.middleware.js");
router.get('/lyrics', authenticateToken, getLyrics);
router.get('/:id/tracks', getUserTracks);
router.post('/:id/tracks/add',addTracks)
router.post('/tracks/add',addTracks)

module.exports = router;