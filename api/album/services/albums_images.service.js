module.exports = {
    add
};

async function add(images) {
    try {
        const response = await knex("album_images")
            .insert([...images])
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
