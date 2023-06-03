module.exports = {
    add
};


async function get() {
    try {
        const response = await knex("images");
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function add(images) {
    try {
        const response = await knex("images")
            .insert([...images])
            .onConflict("external_id")
            .ignore();
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
