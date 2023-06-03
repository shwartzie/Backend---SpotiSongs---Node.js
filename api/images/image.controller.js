const imageService = require('./image.service');
const logger = require('../../services/logger.service');

module.exports = {
    getImages,
    addImages,
};


async function getImages(request, response) {
    try {
        const images = await imageService.get(id);
        response.status(200).send({ images });
    } catch (error) {
        logger.error('Failed to Query Tracks ' + error);
        response.status(204).json({ message: 'Failed to Query Tracks' + error });
        return;
    }
}
async function addImages(request, result) {
    try {
        const { images } = request.body;
        const response = await imageService.add(images);
        logger.info(response)
        result.status(200).json({ message: "Successfully added images" });

    } catch (error) {
        logger.error(`Failed to add images ${error}`);
        result.status(500).json({ message: `Failed to add images ${error}` });
    }
}
