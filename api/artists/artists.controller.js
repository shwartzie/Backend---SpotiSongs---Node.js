const artistService = require("./services/artists.service");
const socketService = require("../../services/socket.service");
const logger = require("../../services/logger.service");
const jwt = require("jsonwebtoken");

// const logger = require('../../services/logger.service')

module.exports = {
    getArtist,
    deleteArtist,
    updateArtist,
    logout,
    getArtists,
    addArtist,
    generateToken
};

async function getArtist(request, response, next) {
    try {
        if (request.query.isSchema) {
            const artist = await artistService.getArtistSchemaById(request.params.id);
            console.log('getArtistSchemaById',artist);
            request.artist = { ...artist };
            return next();
        } else {
            const artist = await artistService.getById(request.params.id);
            console.log('getArtistById', artist);
            if (!artist) {
                response.status(204);
                return;
            }
            response.send({ ...artist }).status(200);
        }

    } catch (error) {
        logger.error("Failed to get artist", error);
        response.status(204).send({ error: "Failed to get artist" });
    }
}

async function generateToken(request, response) {
    try {
        // response.json("demo").status(200)
        const accessToken = jwt.sign(request.artist, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
        const refreshToken = jwt.sign(request.artist, process.env.REFRESH_TOKEN_SECRET);
        console.info("generating Token !! ");
        response
            .cookie("accessToken", accessToken, { expire: new Date(600000).getMilliseconds() })
            .cookie("refreshToken", refreshToken, { expire: new Date(600000).getMilliseconds() })
            .send({...request.artist })
            .status(200);

    } catch (error) {
        logger.error("Failed to get artist", error);
        response.status(204).send({ error: "Failed to get artist" });
    }
}

async function addArtist(request, response) {
    try {
        console.info("Adding artist");
        const artist = await artistService.add(request.body);
        response.status(200).send({ ...artist });
    } catch (error) {
        logger.error("Failed to signup artist", error);
        response.status(500).send({ error: "Failed to signup artist" });
    }
}

async function getArtists(request, response) {
    try {
        const artist = await artistService.query("artists");
        response.status(200).send(artist);
    } catch (error) {
        logger.error("Failed to get artist", error);
        response.status(500).send({ error: "Failed to get artist" });
    }
}

async function deleteArtist(request, response) {
    try {
        await artistService.remove(request.params.id);
        response.send({ msg: "Deleted successfully" });
    } catch (error) {
        // logger.error('Failed to delete artist', error)
        response.status(500).send({ error: "Failed to delete artist" });
    }
}

async function updateArtist(request, response) {
    try {
        const artist = request.body;
        const savedArtist = await artistService.update(artist);
        response.send(savedArtist);
    } catch (error) {
        // logger.error('Failed to update artist', error)
        response.status(500).send({ error: "Failed to update artist" });
    }
}

async function logout(request, response) {
    try {
        const artist = request.body;

        delete artist;
    } catch (error) {
        // logger.error('Failed to logout artist', error)
        response.status(500).send({ error: "Failed to logout artist" });
    }
}
