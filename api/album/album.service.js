const { knex } = require("../../services/db.service");
const logger = require('../../services/logger.service');


module.exports = {
    addImages,
    add
};

async function add(albums) {
    logger.info('adding albums...',albums[0]);
    try {
        const response = await knex("user_albums")
            .insert([...albums]);
        return response;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}


async function addImages(images) {
    console.log('adding album images...');
    try {
        const response = await knex("album_images")
            .insert([...images]);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


