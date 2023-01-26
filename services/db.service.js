const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger.service');
const config = require('../config');




const client = new MongoClient(config.dbURL, {
	useNewUrlParser: true
	, useUnifiedTopology: true
});

client.connect((err) => {
	if (err) {
		console.error(err);
	} else {
		dbConn = client.db("");
		// const collection = client.db("").collection("users");
		// console.log("COLLECTION", dbConn);
		// client.close();
	}
});




module.exports = {
	getCollection
};

// Database Name
const dbName = 'feel-good';

let dbConn = null;


async function getCollection(collectionName) {
	// console.log("ASDFASDFASDF");
	try {


		const collection = await dbConn.collection(collectionName);
		// console.log("COLLECTION", collection);
		return collection;
	} catch (err) {
		logger.error('Failed to get Mongo collection', err);
		console.log(err);
	}
}

async function connect() {
	if (dbConn) return dbConn;
	try {
		client.connect(err => {
			const db = client.db(dbName);
			dbConn = db;
			console.log("dbConn", dbConn);
		});
		return dbConn;
	} catch (err) {
		logger.error('Cannot Connect to DB', err);
		throw err;
	}
}
