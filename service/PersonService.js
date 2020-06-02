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
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.peopleByRoleGET = function (category_id, limit, offset) {
    return sqlDb("Person")
        .where("Person.ID_role", category_id)
        .innerJoin("person_images", "Person.ID_person", "person_images.ID_person_img")
        .innerJoin("Image", "person_images.ID_image", "Image.ID_image")
        .innerJoin("Role", "Role.ID_role", "Person.ID_role")
        .limit(limit).offset(offset)
        .then(data => {
            data = filter(data)
            return data.map(e => {
                e.person_id = e["ID_person"]
                delete e["ID_person"]
                e.image = {
                    url: e["URI_image"]
                }
                delete e["URI_image"]
                e.role = {
                    category_id: e["ID_role"],
                    name: e["role_name"]
                }
                delete e["ID_role"]
                delete e["role_name"]
                return e;
            })
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
    return sqlDb("Person")
        .limit(limit).offset(offset)
        .innerJoin("person_images", "Person.ID_person", "person_images.ID_person_img")
        .innerJoin("Image", "person_images.ID_image", "Image.ID_image")
        .innerJoin("Role", "Role.ID_role", "Person.ID_role")
        .then(data => {
            data = filter(data)
            return data.map(e => {
                e.person_id = e["ID_person"]
                delete e["ID_person"]
                e.image = {
                    url: e["URI_image"]
                }
                delete e["URI_image"]
                e.role = {
                    category_id: e["ID_role"],
                    name: e["role_name"]
                }
                delete e["ID_person_img"]
                delete e["ID_image"]
                delete e["ID_role"]
                delete e["role_name"]
                console.log(e)
                return e;
            })
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
        .where("Person.ID_person", personId)
        .leftJoin("Event", "Event.ID_contact_person", "Person.ID_person")
        .innerJoin("Role", "Person.ID_role", "Role.ID_role")
        .innerJoin("people_involved_in_services", "Person.ID_person", "people_involved_in_services.ID_Person_inv")
        .innerJoin("Service", "people_involved_in_services.ID_Service_inv", "Service.ID_service")
        .innerJoin("person_images", "Person.ID_person", "person_images.ID_person_img")
        .innerJoin("Image", "person_images.ID_image", "Image.ID_image")
        .then(data => {
            let jumbotron = search_back(data)
            let services = filter_services(filter(data))
            let events = filter_events(filter(data))
            let newJson = {
                person_id: data[0]["ID_person"],
                name: data[0]["name"],
                surname: data[0]["surname"],
                image: jumbotron,
                description: data[0]["description"],
                role: {
                    category_id: data[0]["ID_role"],
                    name: data[0]["role_name"]
                },
                phone_number: data[0]["phone_number"],
                email: data[0]["email"],
                services: services,
                events: events,
            }
            console.log(newJson)
            return newJson
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
        if (dataset[i]["URI_image"].includes("jumbotron"))
            return dataset[i]["URI_image"]
    }
    return "";
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

