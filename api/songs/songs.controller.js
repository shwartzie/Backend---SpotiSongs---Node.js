const songsService = require('./songs.service');
const logger = require('../../services/logger.service');
const { response } = require('express');

module.exports = {
	query,
	getLyrics,
	getTracks,
	addTracks
};

async function query(request, result) {
	try {
		const query = await songsService.query();
		result.status(200).send({ query });
		// logger.info('User Query: ', query);
	} catch (error) {
		logger.error('Failed to Query ' + error);
		result.status(401).json({ message: 'Failed to Query' });
	}
}

async function getLyrics(request, result) {
	try {
		const { track, artist } = request.query;
		// console.log("getLyrics", request);
		// console.log('Cookies: ', JSON.stringify(request.cookies));
		// console.log('Signed Cookies: ', request.signedCookies);
		const lyrics = await songsService.queryLyrics(track, artist); //|| "No Lyrics Found";
		result.status(200).cookie('name', "lol").json({ lyrics });
		logger.info(`User Query lyrics for track: ${track} which is played by ${artist}`,);
	} catch (error) {
		logger.error('Failed to Query Lyrics ' + error);
		result.status(401).json({ message: 'Failed to Query Lyrics' });
	}
}
async function getTracks(request, response) {
	try {
		console.log(request.params)
		const { id, filterBy } = request.params;
		// console.info("getTracks", request.params);

		// if (id == "" || !id) {
		// 	result.status(404).json({ message: 'User Id Is Invalid' });
		// 	return;
		// }
		const tracks = await songsService.queryTracks(id, filterBy);
		response.status(200).send({ tracks });
	} catch (error) {
		logger.error('Failed to Query Tracks ' + error);
		response.status(204).json({ message: 'Failed to Query Tracks' + error });
		return;
	}
}
async function addTracks(request, result) {
	try {
		// console.log(request.params)
		const { id: userId } = request.params;
		const { tracks } = request.body;

		// const response = await songsService.add(userId, tracks);
		// logger.info(`Response after adding tracks: ${response}`)
		result.status(200).json({ message: "Successfully added tracks" });

	} catch (error) {
		logger.error(`Failed to add tracks ${error}`);
		result.status(500).json({ message: `Failed to add tracks ${error}` });
	}
}

