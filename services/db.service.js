const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: process.env.POSTGRES_PASSWORD,
        database: "spotisongs",
    },
});

module.exports = { knex };
