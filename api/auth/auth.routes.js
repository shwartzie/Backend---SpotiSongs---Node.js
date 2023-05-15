const express = require("express");
const { login, signup, logout, loginWithSpotify,getRefreshToken,isTokenValid } = require("./auth.controller");

const router = express.Router();

router.post("/login/spotify/refresh", getRefreshToken);
router.post("/login/spotify", loginWithSpotify);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get('/token',isTokenValid)

module.exports = router;
