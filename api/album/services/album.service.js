const { knex } = require("../../../services/db.service");
const logger = require('../../../services/logger.service');


module.exports = {
    addImages,
    add
};

async function add(albums, userId) {
    logger.info('adding albums...', albums[0]);
    try {
        if (!userId) {
            return await knex("user_albums")
                .insert([...albums]);
        } else {
            return await knex("albums")
                .insert([...albums])
                .onConflict("external_id")
                .ignore();
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}





