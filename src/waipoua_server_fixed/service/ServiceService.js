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
        .leftJoin("Event", "Event.event_ID_service", "Service.ID_service")
        .innerJoin("service_images", "service_images.ID_service_img", "Service.ID_service")
        .innerJoin("Image", "service_images.ID_image", "Image.ID_image")
        .then(data => {
            let v = data.map(e => {
                e.person = {
                    name: e.name,
                    surname: e.surname,
                    ID_person: e.ID_person,
                    description: e.description,
                    phone_number: e.phone_number,
                    email: e.email,
                    ID_role: e.ID_role
                }
                e.event = {
                    ID_event: e.ID_event,
                    event_date: e.event_date,
                    event_presentation: e.event_presentation,
                    ID_contact_person: e.ID_contact_person,
                    event_ID_service: e.event_ID_service,
                    event_URI_image: e.event_URI_image,
                    event_name: e.event_name,
                    event_category: e.event_category,
                    location: e.location,
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
        .limit(limit).offset(offset)
        .then(data => {
            let v = data.map(e => {
                e.category = {ID_category: e.ID_category, category_name: e.category_name}
                return e;
            })
            return v;
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
        .innerJoin("service_images", "service_images.ID_service_img", "Service.ID_service")
        .innerJoin("Image", "service_images.ID_image", "Image.ID_image")
        .limit(limit).offset(offset)
        .then(data => {
            let v = data.map(e => {
                return e;
            })
            return v;
        })
}

