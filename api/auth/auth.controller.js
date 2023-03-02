const authService = require("./auth.service");
const logger = require("../../services/logger.service");
const userService = require("../user/user.service");
const utilService = require("../../services/util.service");
const SpotifyWebApi = require("spotify-web-api-node");

module.exports = {
    login,
    signup,
    logout,
    loginWithSpotify,
    getRefreshToken,
};

async function loginWithSpotify(request, response) {
    console.log("trying to login with spotify");
	
    const { code } = request.body;
    if (!code) {
        response.status(400).json({ message: "No code provided" });
        return;
    }

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    const { body } = await spotifyApi.authorizationCodeGrant(code);
    const result = {
        accessToken: body.access_token,
        refreshToken: body.refresh_token,
        expiresIn: body.expires_in,
    };
    response.status(200).send({ ...result });
}

async function getRefreshToken(request, response) {
    const { refreshToken } = request.body;
    console.log("trying to getRefreshToken");
    try {
        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            refreshToken,
        });

        const { body } = await spotifyApi.refreshAccessToken();
        console.log({ ...body });

        response.status(200).send({
            accessToken: body.access_token,
            expiresIn: body.expires_in,
        });
    } catch (error) {
        response.status(500).send({ message: error });
        return;
    }
}
async function login(request, response) {
    const { username, password, code } = request.body;
    try {
        const user = await authService.login(username, password);
        // const loginToken = authService.getLoginToken(user);
        // response.cookie("loginToken", loginToken);

        delete user.password;
        response.status(200).send(user);
    } catch (err) {
        logger.error("Failed to Login " + err);
        response.status(401).send({ err: "Failed to Login" });
    }
}

async function signup(request, response) {
    try {
        const credentials = request.body;
        // Never log passwords
        // logger.debug(credentials)

        const account = await authService.signup(credentials);
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
        const user = await authService.login(credentials.username, credentials.password);
        logger.info("User signup:", user);
        const loginToken = authService.getLoginToken(user);
        response.cookie("loginToken", loginToken, { sameSite: "None", secure: true });
        response.json(user);
    } catch (err) {
        logger.error("Failed to signup " + err);
        response.status(500).send({ err: "Failed to signup" });
    }
}

async function logout(request, response) {
    try {
        const user = request.body;
        if (user.username.includes("Guest")) {
            userService.remove(user._id);
        }
        delete user;
        response.clearCookie("loginToken");
        response.send({ msg: "Logged out successfully" });
    } catch (err) {
        response.status(500).send({ err: "Failed to logout" });
    }
}
