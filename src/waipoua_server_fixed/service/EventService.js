'use strict';

/**
 * This is the DB setup for the "Event" Table
 **/
let sqlDb;
exports.eventDbSetup = function (connection) {
    sqlDb = connection;
    return sqlDb.schema.hasTable("Event")
        .then((exists) => {
            if (!exists) {
                console.log("The table you are searching for doesn't exist")
            } else {
                console.log("TABLE 'Event' EXISTS!");
            }
        })
        .catch(() => {
            console.log("Something gone wrong in the Connection with DB!")
        })
}


/**
 * List of events provided by the association
 *
 * eventId Long Id of the month
 * returns List
 **/
exports.eventSpecificGET = function (eventId) {
    return sqlDb("Event")
        .leftJoin("Service", "Service.ID_service", "Event.event_ID_service")
        .innerJoin("Person", "Person.ID_person", "Event.ID_contact_person")
        .where("ID_event", eventId)
        .then(data => {
            let v = data.map(e => {
                e.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                e.person = {
                    name: e.name,
                    surname: e.surname,
                    ID_person: e.ID_person,
                    description: e.description,
                    phone_number: e.phone_number,
                    email: e.email,
                    URI_image: e.URI_image,
                    ID_role: e.ID_role
                }
                e.service = {
                    ID_service: e.ID_service,
                    service_name: e.service_name,
                    service_presentation: e.service_presentation,
                    service_category: e.service_category
                }
                return e;
            })
            return v;
        })
}


/**
 * List of events provided by the association
 *
 * categoryId Long Month in which the event takes place
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.eventsByCateogoryGET = function (categoryId, limit, offset) {
    return sqlDb("Event")
        .limit(limit).offset(offset)
        .innerJoin("Event_Category", "Event.event_category", "Event_Category.ID_category")
        .where("event_category",categoryId)
        .then(data => {
            let v = data.map(e => {
                e.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                return e;
            })
            return v;
        })
}


/**
 * List of events provided by the association in a certain month
 *
 * month Long Month in which the event takes place
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.eventsByMonthGET = function (month, limit, offset) {
    return sqlDb("Event")
        .limit(limit).offset(offset)
        .where("month",month)
        .orderBy('year')
        .then(data => {
            let v = data.map(e => {
                e.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                return e;
            })
            return v;
        })
}


/**
 * List of events provided by the association
 *
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.eventsGET = function (limit, offset) {
    return sqlDb("Event").limit(limit).offset(offset)
        .then(data => {
            let v = data.map(e => {
                e.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                return e;
            })
            return v;
        })
}

