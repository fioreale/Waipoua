'use strict';

/**
 * This is the DB setup for the "Person" Table
 **/
let sqlDb;
exports.serviceDbSetup = function (connection) {
    sqlDb = connection;
    return sqlDb.schema.hasTable("Service")
        .then((exists) => {
            if (!exists) {
                console.log("The table you are searching for doesn't exist")
            } else {
                console.log("TABLE 'Service' EXISTS!");
            }
        })
        .catch(() => {
            console.log("Something gone wrong in the Connection with DB!")
        })
}

/**
 * A specific service
 *
 * serviceId Long The id of the service
 * returns Service
 **/
exports.serviceSpecificGET = function (serviceId) {
    return sqlDb("Service")
        .where("ID_service", serviceId)
        .innerJoin("people_involved_in_services", "people_involved_in_services.ID_Service_inv", "Service.ID_service")
        .innerJoin("Person", "Person.ID_person", "people_involved_in_services.ID_Person_inv")
        .leftJoin("services_related_to_event", "services_related_to_event.ID_service_rel", "Service.ID_service")
        .leftJoin("Event", "Event.ID_event", "services_related_to_event.ID_event_rel")
        .innerJoin("Service_Category", "Service.service_category", "Service_Category.ID_category")
        .innerJoin("service_images", "service_images.ID_service_img", "Service.ID_service")
        .innerJoin("Image", "service_images.ID_image", "Image.ID_image")
        .then(data => {
            let images = filter_images(data)
            let people = filter_people(data)
            let events = filter_events(data)
            let newJson = {
                service_id: data[0]["ID_service"],
                name: data[0]["service_name"],
                presentation: data[0]["service_presentation"],
                image: images,
                category: {
                    category_id: data[0]["service_category"],
                    name: data[0]["category_name"]
                },
                people: people,
                events: events
            }
            return newJson
        })
}


/**
 * A specific service category
 *
 * categoryId Long The id of the cateogory
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.servicesByCategoryGET = function (categoryId, limit, offset) {
    return sqlDb("Service")
        .where("Service.service_category", categoryId)
        .innerJoin("Service_Category", "Service.service_category", "Service_Category.ID_category")
        .innerJoin("service_images", "service_images.ID_service_img", "Service.ID_service")
        .innerJoin("Image", "service_images.ID_image", "Image.ID_image")
        .then(data => {
            data = filter(data, limit, offset)
            return data.map(e => {
                let d = {}
                d.service_id = e["ID_service"]
                d.name = e["service_name"]
                d.presentation = e["service_presentation"]
                d.image = {
                    url: e["URI_image"]
                }
                d.category = {
                    category_id: e["ID_category"],
                    name: e["category_name"]
                }
                d.people = []
                d.events = []
                return d;
            })
        })
}


/**
 * List of services provided by the association
 *
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.servicesGET = function (limit, offset) {
    return sqlDb("Service")
        .innerJoin("Service_Category", "Service.service_category", "Service_Category.ID_category")
        .innerJoin("service_images", "service_images.ID_service_img", "Service.ID_service")
        .innerJoin("Image", "service_images.ID_image", "Image.ID_image")
        .then(data => {
            data = filter(data, limit, offset)
            return data.map(e => {
                let d = {}
                d.service_id = e["ID_service"]
                d.name = e["service_name"]
                d.presentation = e["service_presentation"]
                d.image = {
                    url: e["URI_image"]
                }
                d.category = {
                    category_id: e["ID_category"],
                    name: e["category_name"]
                }
                d.people = []
                d.events = []
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

function filter_images(dataset) {
    let newDataset = new Array(0);
    let found = false
    for (let i = 0; i < dataset.length; i++) {
        let {URI_image} = dataset[i]
        if (URI_image.includes("jumbotron")) {
            newDataset.push({url: dataset[i].URI_image})
            break
        }
    }
    for (let i = 0; i < dataset.length; i++) {
        let {URI_image} = dataset[i]
        if (!(URI_image.includes("jumbotron") || URI_image.includes("icon"))) {
            for (let j = 0; j < newDataset.length; j++) {
                if (newDataset[j].url === URI_image)
                    found = true
            }
            if (!found)
                newDataset.push({url: dataset[i].URI_image})
        }
        found = false
    }

    return newDataset
}

function filter_people(dataset) {
    let newDataset = new Array(0);
    let found = false
    for (let i = 0; i < dataset.length; i++) {
        let {ID_person} = dataset[i]
        for (let j = 0; j < newDataset.length; j++) {
            if (newDataset[j].person_id === ID_person)
                found = true
        }
        if (!found)
            newDataset
                .push({
                    person_id: dataset[i]["ID_person"],
                    name: dataset[i].name,
                    surname: dataset[i].surname
                })

        found = false
    }

    return newDataset
}

function filter_events(dataset) {
    let newDataset = new Array(0);
    let found = false
    for (let i = 0; i < dataset.length; i++) {
        let {ID_event} = dataset[i]
        for (let j = 0; j < newDataset.length; j++) {
            if (newDataset[j].event_id === ID_event)
                found = true
        }
        if (!found && ID_event != null)
            newDataset
                .push({
                    event_id: dataset[i]["ID_event"],
                    name: dataset[i]["event_name"]
                })

        found = false
    }

    return newDataset
}