let {peopleDbSetup} = require("./PersonService");
let {serviceDbSetup} = require("./ServiceService");
let {eventDbSetup} = require("./EventService")

const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    debug: true,
    // connection: {
    //     host: 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
    //     user: 'ixkloqfnqbtpky',
    //     password: 'c3fc388e2e05b38ec9c9e3a1bccbc9f69bcd1f40afb9415ac0b967d1a050ae65',
    //     database: 'dekkcknthtr2it'
    // },
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