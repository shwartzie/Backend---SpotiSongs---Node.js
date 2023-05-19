
const fs = require('fs');
const lyricsFinder = require('lyrics-finder');
const path = require('path');
const loggerService = require('../../services/logger.service');
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
        const tracks = await knex("likedsongs")
            .columns(
                "album",
                "artists",
                "available_markets",
                "disc_number",
                "duration_ms",
                "explicit",
                "external_ids",
                "external_urls",
                "href",
                "id",
                "is_local",
                "name",
                "popularity",
                "preview_url",
                "track_number",
                "type",
                "uri",
            ).where({ user_id: userId });
        loggerService.info(`QueryTracks: ${tracks}`);
        return tracks;
    } catch (error) {
        console.error(error);
        return;
    }
}

async function add(userId, values) {
    try {
        // const isSuccess = await knex("likedSongs")
        //     .insert({email: req.body.email});
        return tracks;
    } catch (error) {

    }
}