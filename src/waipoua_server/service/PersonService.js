'use strict';

/**
 * This is the DB setup for the "Person" Table
 **/
let sqlDb;
exports.peopleDbSetup = function (connection) {
    sqlDb = connection;
    return sqlDb.schema.hasTable("Person")
        .then((exists) => {
            if (!exists) {
                console.log("The table you are searching for doesn't exist")
                return sqlDb.schema.createTable("Person", table => {
                    table.increments();
                    table.integer("ID-person");
                    table.text("name");
                    table.text("surname");
                    table.text("description");
                    table.text("phone_number");
                    table.text("email");
                    table.text("URI_image");
                    table.integer("ID_role");
                })
            } else {
                console.log("TABLE EXISTS!");
            }
        })
        .catch(() => {
            console.log("Something gone wrong in the Connection with DB!")
        })
}

/**
 * Find list of person by role
 *
 * category_id Long The id of the role
 * returns List
 **/
exports.peopleByRoleGET = function (category_id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = [{
            "image": {
                "url": "url"
            },
            "role": {
                "category_id": 9,
                "name": "name"
            },
            "surname": "surname",
            "name": "name",
            "description": "description",
            "phone_number": "phone_number",
            "email": "email",
            "person_id": 3
        }, {
            "image": {
                "url": "url"
            },
            "role": {
                "category_id": 9,
                "name": "name"
            },
            "surname": "surname",
            "name": "name",
            "description": "description",
            "phone_number": "phone_number",
            "email": "email",
            "person_id": 3
        }];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * List of the people that joined the association
 *
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.peopleGET = function (limit, offset) {
    return sqlDb("Person").limit(limit).offset(offset)
        .then(data => {
            let v = data.map(e => {
                e.image = {url: e.url};
                e.role = {category_id: e.category_id, name: e.name};
                return e;
            })
            return v;
        })
}

/**
 * Find person by Id
 *
 * personId Long The id of a person
 * returns Person
 **/

exports.peopleSpecificGET = function (personId) {
    return sqlDb("Person").where("ID_person", personId)
        .then(data => {
            console.log(data)
            let v = data.map(e => {
                return e;
            })
            return v;
        })
}

    // .innerJoin("people_involved_in_services", "Person.ID_person", "people_involved_in_services.ID_person")
    // .innerJoin("Event", "Person.ID_person", "Event.ID_contact_person")
    //