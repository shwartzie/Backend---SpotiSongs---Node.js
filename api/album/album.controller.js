const albumService = require('./album.service');
const logger = require('../../services/logger.service');

module.exports = {
    getAlbums,
    addAlbums,
    addAlbumImages
};


async function getAlbums(request, response) {
    try {
        console.log(request.params);
        const { id } = request.params;
        const tracks = await albumService.get(id);
        response.status(200).send({ tracks });
    } catch (error) {
        logger.error('Failed to Query Tracks ' + error);
        response.status(204).json({ message: 'Failed to Query Tracks' + error });
        return;
    }
}
async function addAlbums(request, result) {
    try {
        // console.log(request.params)
        const { id: userId } = request.params;
        const { albums } = request.body;
        // const response = await albumService.add(albums);
        // logger.info(`Response after adding albums: ${response}`);
        result.status(200).json({ message: "Successfully added albums" });

    } catch (error) {
        logger.error(`Failed to add albums ${error}`);
        result.status(500).json({ message: `Failed to add albums ${error}` });
    }
}
async function addAlbumImages(request, result) {
    try {
        // console.log(request.params)
        const { id: userId } = request.params;
        const { images } = request.body;
        const response = await albumService.addImages(images);
        logger.info(`Response after adding albums: ${response}`);
        result.status(200).json({ message: "Successfully added albums images" });

    } catch (error) {
        logger.error(`Failed to add albums ${error}`);
        result.status(500).json({ message: `Failed to add albums images ${error}` });
    }
}
