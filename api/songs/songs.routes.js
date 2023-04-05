const express = require('express');

const { getLyrics } = require("./songs.controller.js");
const router = express.Router();

router.get('/lyrics', getLyrics);

module.exports = router;