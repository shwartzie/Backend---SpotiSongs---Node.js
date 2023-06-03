const express = require('express');

const { getImages, addImages } = require("./image.controller.js");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/requireAuth.middleware.js");
router.get('/', getImages);
router.post('/add', addImages);

module.exports = router;