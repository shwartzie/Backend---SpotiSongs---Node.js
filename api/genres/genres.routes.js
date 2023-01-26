const express = require('express');

const { query } = require("./genres.controller.js");
const router = express.Router();

router.get('/query', query);

module.exports = router;