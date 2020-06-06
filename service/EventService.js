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
        .innerJoin("Person", "Person.ID_person", "Event.ID_contact_person")
        .innerJoin("Event_Category", "Event.event_category", "Event_Category.ID_category")
        .innerJoin("services_related_to_event", "services_related_to_event.ID_event_rel",
            "Event.ID_event")
        .leftJoin("Service", "Service.ID_service", "services_related_to_event.ID_service_rel")
        .innerJoin("Event_images", "Event.event_category", "Event_images.ID_event_category")
        .innerJoin("Image", "Event_images.ID_image", "Image.ID_image")
        .then(data => {
            let jumbotron = search_back(data)
            let events = filter_services(data)
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
                image: {
                    url: jumbotron
                },
                relativeTo: events,
                contact: {
                    person_id: data[0]["ID_contact_person"],
                    name: data[0]["name"],
                    surname: data[0]["surname"],
                }
            }
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
        .then(data => {
            data = filter(data, limit, offset)
            return data.map(e => {
                let d = {}
                d.event_id = e["ID_event"]
                d.name = e["event_name"]
                d.presentation = e["event_presentation"]
                d.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                d.image = {
                    url: e["URI_image"]
                }
                d.category = {
                    category_id: e["event_category"],
                    name: e["event_category_name"]
                }
                d.location = e.location
                d.relativeTo = []
                d.contact = {}
                return d;
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
        .innerJoin("Event_Category", "Event.event_category", "Event_Category.ID_category")
        .innerJoin("Event_images", "Event.event_category", "Event_images.ID_event_category")
        .innerJoin("Image", "Event_images.ID_image", "Image.ID_image")
        .then(data => {
            data = filter(data, limit, offset)
            return data.map(e => {
                let d = {}
                d.event_id = e["ID_event"]
                d.name = e["event_name"]
                d.presentation = e["event_presentation"]
                d.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                d.image = {
                    url: e["URI_image"]
                }
                d.category = {
                    category_id: e["event_category"],
                    name: e["event_category_name"]
                }
                d.location = e.location
                d.relativeTo = []
                d.contact = {}
                return d;
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
        .innerJoin("Event_Category", "Event.event_category", "Event_Category.ID_category")
        .orderBy("Event.year")
        .orderBy("Event.month")
        .orderBy("Event.day")
        .then(data => {
            data = filter(data, limit, offset)
            return data.map(e => {
                let d = {}
                d.event_id = e["ID_event"]
                d.name = e["event_name"]
                d.presentation = e["event_presentation"]
                d.date = {
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    hour: e.hour,
                    minute: e.minute
                }
                d.image = {
                    url: e["URI_image"]
                }
                d.category = {
                    category_id: e["event_category"],
                    name: e["event_category_name"]
                }
                d.location = e.location
                d.relativeTo = []
                d.contact = {}
                return d;
            })
        })
}

function filter_interval(data, limit, offset) {
    let newData = new Array(0)
    for (let i = offset; i < offset + limit && i < data.length; i++) {
        newData.push(data[i])
    }
    return newData
}

function filter(dataset, limit, offset) {
    let newDataset = new Array(0);
    for (let i = 0; i < dataset.length; i++) {
        let {URI_image} = dataset[i]
        if (URI_image.includes("icon"))
            newDataset.push(dataset[i])
    }
    newDataset = filter_interval(newDataset, limit, offset)
    return newDataset
}

function search_back(dataset) {
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].URI_image.includes("jumbotron"))
            return dataset[i].URI_image
    }
    return "";
}

function filter_services(dataset) {
    let newDataset = new Array(0);
    let found = false
    for (let i = 0; i < dataset.length; i++) {
        let {ID_service} = dataset[i]
        for (let j = 0; j < newDataset.length; j++) {
            if (newDataset[j].service_id === ID_service)
                found = true
        }
        if (!found)
            newDataset
                .push({
                    service_id: dataset[i]["ID_service"],
                    name: dataset[i]["service_name"]
                })

        found = false
    }

    return newDataset
}