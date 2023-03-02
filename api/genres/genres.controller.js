const genresService = require('./genres.service');
const logger = require('../../services/logger.service');

async function query(request, result) {
	try {
		const query = await genresService.query();
		result.status(200).send({ query });
		// logger.info('User Query: ', query);
	} catch (err) {
		logger.error('Failed to Query ' + err);
		result.status(401).send({ err: 'Failed to Query' });
	}
}

module.exports = {
	query,
};
