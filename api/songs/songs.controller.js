const songsService = require('./songs.service');
const logger = require('../../services/logger.service');

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
		const lyrics = await songsService.queryLyrics(track, artist) || "No Lyrics Found";
		result.status(200).json({ lyrics });
 		logger.info('User Query lyrics: ', lyrics);
	} catch (error) {
		logger.error('Failed to Query Lyrics ' + error);
		result.status(401).json({ message: 'Failed to Query Lyrics' });
	}
}

module.exports = {
	query,
	getLyrics
};
