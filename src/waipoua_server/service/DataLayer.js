let {peopleDbSetup} = require("./PersonService");
let {serviceDbSetup} = require("./ServiceService");

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
    return peopleDbSetup(sqlDb)
        .then(() => {
            return serviceDbSetup(sqlDb);
        })
}

module.exports = {database: sqlDb, setupDataLayer}