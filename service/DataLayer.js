let {peopleDbSetup} = require("./PersonService");
let {serviceDbSetup} = require("./ServiceService");
let {eventDbSetup} = require("./EventService")

const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    debug: true,
    connection: process.env.DATABASE_URL,
    ssl: true
})

function setupDataLayer() {
    return peopleDbSetup(sqlDb)
        .then(() => {
            return serviceDbSetup(sqlDb);
        })
        .then(() => {
            return eventDbSetup(sqlDb)
        })
}

module.exports = {database: sqlDb, setupDataLayer}