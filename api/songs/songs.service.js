
const fs = require('fs');
const lyricsFinder = require('lyrics-finder');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'data', 'genres.json');

module.exports = {
    query,
    queryLyrics
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

