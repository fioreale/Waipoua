let {peopleDbSetup} = require("./PersonService");

const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    debug: true,
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Ziofester96',
        database: 'Waipoua'
    },
    ssl: true
})

function setupDataLayer() {
    return peopleDbSetup(sqlDb);
}

module.exports = {database: sqlDb, setupDataLayer}