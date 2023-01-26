
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const reportService = require('../report/report.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    queryCollections
};

async function queryCollections() {
    console.log("query");
    try {
        const usersCollection = await dbService.getCollection('users');
        const reportCollection = await dbService.getCollection('report');
        // console.log("COLLECTION", collection);

        let users = await usersCollection.find().toArray(); // await collection.toArray()
        let reports = await reportCollection.find().toArray();
        // console.log('users', users);

        users = users.map(user => {
            delete user.password;
            return user;
        });
        return { users, reports };
    } catch (err) {
        logger.error('cannot find users', err);
        throw err;
    }
}

async function query() {
    console.log("query");
    try {
        const collection = await dbService.getCollection('users');
        console.log("COLLECTION", collection);

        let users = await collection.find().toArray(); // await collection.toArray()
        console.log('users', users);

        users = users.map(user => {
            delete user.password;
            return user;
        });
        return users;
    } catch (err) {
        logger.error('cannot find users', err);
        throw err;
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('usersDemo');
        const user = await collection.findOne({ _id: ObjectId(userId) });
        delete user.password;

        user.givenReports = await reportService.query({ byUserId: ObjectId(user._id) });
        user.givenReports = user.givenReports.map(report => {
            delete report.byUser;
            return report;
        });

        return user;
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err);
        throw err;
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('usersDemo');
        const user = await collection.findOne({ username });
        return user;
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err);
        throw err;
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('usersDemo');
        await collection.deleteOne({ '_id': ObjectId(userId) });
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err);
        throw err;
    }
}

async function update({ _id, fullname, imgUrl, isJoined }) {
    try {
        // peek only updatable properties
        const userToSave = {
            _id: ObjectId(_id), // needed for the returnd obj
            fullname,
            imgUrl,
            isJoined
        };
        const collection = await dbService.getCollection('usersDemo');
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err);
        throw err;
    }
}

async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
        };
        const collection = await dbService.getCollection('usersDemo');
        await collection.insertOne(userToAdd);
        return userToAdd;
    } catch (err) {
        logger.error('cannot insert user', err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ];
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance };
    }
    return criteria;
}




