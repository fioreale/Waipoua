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
        .where("ID_event", eventId)
        .leftJoin("Service", "Service.ID_service", "Event.event_ID_service")
        .innerJoin("Person", "Person.ID_person", "Event.ID_contact_person")
        .innerJoin("Event_Category", "Event.event_category", "Event_Category.ID_category")
        .innerJoin("Event_images", "Event.event_category", "Event_images.ID_event_category")
        .innerJoin("Image", "Event_images.ID_image", "Image.ID_image")
        .then(data => {
            let jumbotron = search_back(data)
            let newJson = {
                event_id: data[0]["ID_event"],
                name: data[0]["event_name"],
                presentation: data[0]["event_presentation"],
                category: {
                    ID_category: data[0]["ID_category"],
                    category_name: data[0]["event_category_name"],
                },
                location: data[0]["location"],
                date: {
                    day: data[0]["day"],
                    month: data[0]["month"],
                    year: data[0]["year"],
                    hour: data[0]["hour"],
                    minute: data[0]["minute"],
                },
                image: jumbotron,
                relativeTo: {
                    service_id: data[0]["event_ID_service"],
                    name: data[0]["service_name"],
                },
                contact: {
                    person_id: data[0]["ID_contact_person"],
                    name: data[0]["name"],
                    surname: data[0]["surname"],
                }
            }
            console.log(newJson)
            return newJson
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
        .where("event_category", categoryId)
        .innerJoin("Event_Category", "Event.event_category", "Event_Category.ID_category")
        .innerJoin("Event_images", "Event.event_category", "Event_images.ID_event_category")
        .innerJoin("Image", "Event_images.ID_image", "Image.ID_image")
        .limit(limit).offset(offset)
        .then(data => {
            data = filter(data, "icon")
            return data.map(e => {
                e.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                e.category = {
                    ID_category: e.ID_category,
                    category_name: e.category_name
                }
                delete e.day
                delete e.month
                delete e.year
                delete e.hour
                delete e.minute
                delete e.ID_category
                delete e.category_name
                return e;
            })
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
        .where("month", month)
        .orderBy('year')
        .innerJoin("Event_images", "Event.event_category", "Event_images.ID_event_category")
        .innerJoin("Image", "Event_images.ID_image", "Image.ID_image")
        .limit(limit).offset(offset)
        .then(data => {
            data = filter(data, "icon")
            return data.map(e => {
                e.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                delete e.day
                delete e.month
                delete e.year
                delete e.hour
                delete e.minute
                return e;
            })
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
    return sqlDb("Event")
        .innerJoin("Event_images", "Event.event_category", "Event_images.ID_event_category")
        .innerJoin("Image", "Event_images.ID_image", "Image.ID_image")
        .orderBy("Event.year")
        .orderBy("Event.month")
        .orderBy("Event.day")
        .limit(limit).offset(offset)
        .then(data => {
            data = filter(data, "icon")
            return data.map(e => {
                e.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                delete e.day
                delete e.month
                delete e.year
                delete e.hour
                delete e.minute
                return e;
            })
        })
}

function filter(dataset) {
    let newDataset = new Array(0);
    for (let i = 0; i < dataset.length; i++) {
        let {URI_image} = dataset[i]
        if (URI_image.includes("icon"))
            newDataset.push(dataset[i])
    }
    return newDataset
}

function search_back(dataset) {
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].URI_image.includes("jumbotron"))
            return dataset[i].URI_image
    }
    return "";
}