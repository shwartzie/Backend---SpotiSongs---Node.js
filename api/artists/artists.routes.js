const express = require("express");
const { getArtist, deleteArtist, updateArtist, logout, getArtists } = require("./artists.controller.js");

const router = express.Router();

// middleware that is spec  ific to this router
// router.use(requireAuth)

router.get("/", getArtists);
router.get("/:id", getArtist);
router.put("/:id", updateArtist);
router.post("/", logout);
router.delete("/:id", deleteArtist);

module.exports = router;
