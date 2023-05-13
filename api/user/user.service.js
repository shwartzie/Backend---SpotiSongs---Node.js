const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");

const { knex } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    getUserSchemaById
};

async function query(collectionName) {
    console.log("query");
    try {
        const collection = await dbService.getCollection(collectionName);
        console.log("query COLLECTION", collection);

        // let users = await collection.toArray(); // await collection.toArray()
        // console.log("users", users);

        // users = users.map((user) => {
        //     delete user.password;
        //     return user;
        // });
        // return users;
    } catch (error) {
        logger.error("cannot find users", error);
        throw error;
    }
}

async function getById(userId) {
    try {
        const user = await knex('users')
            .columns('id')
            .where({ id: userId });
        return user[0];
    } catch (error) {
        logger.error(`while finding user by id: ${userId}`, error);
        throw error;
    }
}

async function getUserSchemaById(userId) {
    try {
        const user = await knex('users')
            .columns('id', 'fullname', 'email', 'country',
                'href', 'images', 'product', 'uri', 'followers')
            .where({ id: userId });
        return user[0];
    } catch (error) {
        logger.error(`while finding user by id: ${userId}`, error);
        throw error;
    }
}


async function getByUsername(username, password) {
    try {
        const user = await knex("users").select("*").where({ username, password });
        return user[0];
    } catch (error) {
        logger.error(`while finding user by username: ${username}`, error);
        throw error;
    } finally {
        knex.destroy();
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection("usersDemo");
        await collection.deleteOne({ _id: ObjectId(userId) });
    } catch (error) {
        logger.error(`cannot remove user ${userId}`, error);
        throw error;
    }
}

async function update({ _id, fullname, imgUrl, isJoined }) {
    try {
        // peek only updatable properties
        const userToSave = {
            _id: ObjectId(_id), // needed for the returnd obj
            fullname,
            imgUrl,
            isJoined,
        };
        const collection = await dbService.getCollection("usersDemo");
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
        return userToSave;
    } catch (error) {
        logger.error(`cannot update user ${user._id}`, error);
        throw error;
    }
}

async function add(userToAdd) {
    try {
        // console.log('userToAdd.external_urls.spotify ------------', userToAdd.external_urls.spotify);
        return knex('users')
            .columns('id', 'fullname', 'email', 'country',
                'href', 'images', 'product', 'uri', 'followers'
            )
            .insert({
                id: userToAdd.id,
                fullname: userToAdd.display_name,
                email: userToAdd.email,
                country: userToAdd.country,
                href: userToAdd.href,
                images: JSON.stringify(userToAdd.images),
                product: userToAdd.product,
                uri: userToAdd.uri,
                followers: JSON.stringify(userToAdd.followers)
            }).then(({ oid }) => {
                console.log('after insert', oid);
                //get user by id
                knex('users')
                    .select({
                        fullname: 'fullname'
                    }).where({ id: oid })
                    .then((user) => res.json(user[0])
                    ).catch(error => {
                        console.error(error);
                        return error;
                    });
            }).catch(error => {
                console.error(error);
                return error;
            });
    } catch (error) {
        logger.error("cannot insert user", error);
        throw error;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: "i" };
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance };
    }
    return criteria;
}
