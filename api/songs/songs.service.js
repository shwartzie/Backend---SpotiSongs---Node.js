
const fs = require('fs');
const lyricsFinder = require('lyrics-finder');
const path = require('path');
const logger = require('../../services/logger.service');
const { knex } = require("../../services/db.service");
const filePath = path.join(__dirname, '..', '..', 'data', 'genres.json');

module.exports = {
    query,
    queryLyrics,
    queryTracks,
    add
};

async function query() {

    const data = _readFile();
    return data;
}

async function queryLyrics(track, artist) {
    try {
        const lyrics = await lyricsFinder(artist, track);
        return lyrics;
    } catch (error) {
        return error;
    }
}

function _readFile() {
    let rawdata = fs.readFileSync(filePath);
    let genres = JSON.parse(rawdata);
    return genres;
}

async function queryTracks(userId, filterBy) {
    try {
        const tracks = await knex("tracks")
            .where({ user_id: userId });

        logger.info(`QueryTracks: ${tracks}`);
        return tracks;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function add(userId, tracks) {
    try {
        const response = await knex("tracks")
            .insert([...tracks]);
        return response;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

