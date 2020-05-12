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
            } else {
                console.log("TABLE 'Person' EXISTS!");
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
    return sqlDb("Person")
        .innerJoin("Role","Role.ID_role","Person.ID_role")
        .where("Person.ID_role", category_id)
        .then(data => {
            let v = data.map(e => {
                e.role = {ID_role: e.ID_role, role_name: e.role_name}
                return e;
            })
            return v;
        })
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
    return sqlDb("Person")
        .innerJoin("people_involved_in_services", "people_involved_in_services.ID_Person_inv", "Person.ID_person")
        .innerJoin("Service", "Service.ID_service", "people_involved_in_services.ID_Service_inv")
        .innerJoin("Role", "Person.ID_role", "Role.ID_role")
        .leftJoin("Event", "Event.ID_contact_person", "Person.ID_person")
        .where("ID_person", personId)
        .then(data => {
            let v = data.map(e => {
                e.role = {ID_role: e.ID_role, role_name: e.role_name}
                e.service = {
                    ID_Service_inv: e.ID_Service_inv,
                    service_name: e.service_name,
                    service_presentation: e.service_presentation,
                    service_category: e.service_category
                }
                e.event = {
                    ID_event: e.ID_event,
                    event_date: e.event_date,
                    event_presentation: e.event_presentation,
                    event_ID_service: e.event_ID_service,
                    event_URI_image: e.event_URI_image,
                    event_name: e.event_name,
                    event_category: e.event_category,
                    location: e.location
                }
                return e;
            })
            return v;
        })
}