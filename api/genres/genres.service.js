
const fs = require('fs');

const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'data', 'genres.json');

module.exports = {
    query
};

async function query() {

    const data = readFile();
    return data;
}

function readFile() {
    let rawdata = fs.readFileSync(filePath);
    let genres = JSON.parse(rawdata);
    console.log("genres", genres);
    return genres;
}

