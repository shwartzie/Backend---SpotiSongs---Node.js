const express = require('express');

const { getAlbums, addAlbums, addAlbumImages } = require("./album.controller.js");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/requireAuth.middleware.js");
router.get('/', getAlbums);
router.post('/:id/add', addAlbums);
router.post('/add/images', addAlbumImages);

module.exports = router;