var service_queryString = decodeURIComponent(window.location.search);
service_queryString = service_queryString.substring(1);
var queries = service_queryString.split("&");
console.log(queries)

var offset = queries[0].split("=")[1];

var service_id = queries[1].split("=")[1];
var max_all_el = service_id.split(":")[1]
service_id = service_id.split(":")[0]
let category_ID = null;

if (queries[2] != null) {
    category_ID = queries[2].split("=")[1];
    var max_category_el = category_ID.split(":")[1]
    category_ID = category_ID.split(":")[0]
    console.log(max_category_el)
}

fetch("../../Services/" + service_id)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        let text = document.getElementById("service-description");
        let carousel = document.getElementsByClassName("carousel-inner")[0];
        let title = document.getElementsByClassName("display-1 title")[0];
        let background = document.getElementsByClassName("jumbotron-background")[0];
        let begin;
        console.log(json)

        let {service_name, service_presentation, service_category, URI_image} = json[0]
        title.innerText = service_name;
        text.innerText = service_presentation;
        background.style.backgroundImage = "url(" + URI_image + ")"

        // setting images in the carousel
        for (let i = 1; i < json.length; i++) {
            let {URI_image} = json[i];
            let newDiv = document.createElement("div");
            if (i === 0)
                newDiv.setAttribute("class", "carousel-item active")
            else
                newDiv.setAttribute("class", "carousel-item")

            let newIm = document.createElement("img");
            newIm.setAttribute("class", "d-block img-fluid");
            newIm.setAttribute("src", URI_image);
            newIm.setAttribute("alt", "...");
            newDiv.appendChild(newIm);
            carousel.appendChild(newDiv);
        }

        // setting the practical information
        // CARDS
        let personEl = document.getElementById("service-involved-people");
        for (let i = 0; i < json.length; i++) {
            let {person} = json[i];
            let name = person.name + " " + person.surname;
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("a");
            newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                "list-inline-item transition-link clickable-person");
            newA.setAttribute("href", "#");
            newA.setAttribute("person_id", person.ID_person)
            newA.innerText = name;
            newDiv.appendChild(newA);
            personEl.appendChild(newDiv);
        }

        //Events
        let no_event = true;
        let el = document.getElementById("service-associated-events");
        for (let i = 0; i < json.length; i++) {
            let {event} = json[i];
            if (event.ID_event != null) {
                no_event = false
                let name = event.event_name;
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "p-2 bd-highlight");
                let newA = document.createElement("a");
                newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                    "list-inline-item transition-link clickable-event");
                newA.setAttribute("href", "#");
                newA.setAttribute("event_id", event.ID_event);
                newA.innerText = name;
                newDiv.appendChild(newA);
                el.appendChild(newDiv);
            }

        }
        if (no_event === true) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("p");
            newA.setAttribute("class", " display-4 content-contact");
            newA.innerText = "There is no associated event.";
            newDiv.appendChild(newA);
            el.appendChild(newDiv);
        }

        orientation_info(category_ID, service_name)

        return service_category
    })
    .then(function (category) {
        clicks_listener(category);
    })

function fill_person_card(image_url, name, service_id) {
    let newPiece = document.createElement("div")
    newPiece.setAttribute("class", "p-2 bd-highlight")
    let newPiece_in = document.createElement("div")
    newPiece_in.setAttribute("class", "card");
    let newPiece_in_im = document.createElement("img")
    newPiece_in_im.setAttribute("src", image_url)
    newPiece_in_im.setAttribute("class", "card-img-top img-fluid")
    newPiece_in_im.setAttribute("alt", "...")
    let newPiece_in_div = document.createElement("div")
    newPiece_in_div.setAttribute("class", "card-body link-color")
    let newA = document.createElement("a");
    newA.setAttribute("href", "#");
    newA.setAttribute("class", "card-link");
    newA.setAttribute("id", "person-" + service_id)
    newA.innerText = name;

    newPiece_in_div.appendChild(newA);
    newPiece_in.appendChild(newPiece_in_im);
    newPiece_in.appendChild(newPiece_in_div);
    newPiece.appendChild(newPiece_in);

    return newPiece
}

function orientation_info(category, name) {
    let category_enum = {
        1: "Animal Protection",
        2: "Forest Protection",
        3: "Pollution"
    }
    let info = document.getElementsByClassName("breadcrumb");
    let newEl = document.createElement("li")
    if (category != null) {
        info[0].innerHTML = "";
        let categoryEl = document.createElement("li")
        categoryEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "category-callback")
        newA.innerText = category_enum[category];
        categoryEl.appendChild(newA);
        info[0].appendChild(categoryEl);
    }
    newEl.setAttribute("class", "breadcrumb-item active")
    newEl.setAttribute("aria-current", "page")
    newEl.innerText = name;
    info[0].appendChild(newEl)
}

function clicks_listener(category) {
    // Orientation Info clicks
    var listener = document.getElementById("category-callback");

    if (listener != null) {
        listener.onclick = function () {
            let query_par
            if (category != null) {
                query_par = "?page=0" + "?id_category=" + category;
            } else
                query_par = "?page=0"
            window.location.href = "../../all_services/" + query_par;
        }
    }

    let listener_people = document.getElementsByClassName("clickable-person")
    let listener_event = document.getElementsByClassName("clickable-event")
    
    //listeners for people[max 5]
    if (listener_people[0]!=null){
        listener_people[0].onclick = function(){
            let value1 = listener_people[0].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[1]!=null){
        listener_people[1].onclick = function(){
            let value1 = listener_people[1].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[2]!=null){
        listener_people[2].onclick = function(){
            let value1 = listener_people[2].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[3]!=null){
        listener_people[3].onclick = function(){
            let value1 = listener_people[3].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[4]!=null){
        listener_people[4].onclick = function(){
            let value1 = listener_people[4].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    
    //listeners for events[max 12]
    if (listener_event[0]!=null){
        listener_event[0].onclick = function () {
            let value1 = listener_event[0].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[1]!=null){
        listener_event[1].onclick = function () {
            let value1 = listener_event[1].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[2]!=null){
        listener_event[2].onclick = function () {
            let value1 = listener_event[2].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[3]!=null){
        listener_event[3].onclick = function () {
            let value1 = listener_event[3].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[4]!=null){
        listener_event[4].onclick = function () {
            let value1 = listener_event[4].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[5]!=null){
        listener_event[5].onclick = function () {
            let value1 = listener_event[5].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[6]!=null){
        listener_event[6].onclick = function () {
            let value1 = listener_event[6].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[7]!=null){
        listener_event[7].onclick = function () {
            let value1 = listener_event[7].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[8]!=null){
        listener_event[8].onclick = function () {
            let value1 = listener_event[8].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[9]!=null){
        listener_event[9].onclick = function () {
            let value1 = listener_event[9].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[10]!=null){
        listener_event[10].onclick = function () {
            let value1 = listener_event[10].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[11]!=null){
        listener_event[11].onclick = function () {
            let value1 = listener_event[11].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    
    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("prev-btn footer")[0];
    let listen_next = document.getElementsByClassName("next-btn")[0];

    // "max" changes depending in which way I accessed to the service
    let max_services_DB;
    if (queries[2] != null) {
        max_services_DB = max_category_el;
    } else max_services_DB = max_all_el;

    let next, prev;

    // setting next offset
    if (offset === max_services_DB.toString())
        next = 0
    else next = (Math.floor(parseInt(offset) + 1)).toString()

    // setting prev offset
    if (offset === "1")
        prev = (Math.floor(parseInt(max_services_DB) - 1)).toString()
    else prev = (Math.floor(parseInt(offset) - 1)).toString()

    if (isNaN(next))
        next = 0
    if (isNaN(prev))
        prev = 0

    listen_next.onclick = function () {

        if (queries[2] != null) {
            fetch("../../Services/Category/" + category_ID + "/?limit=1" + "&offset=" + next)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + next + "&id_service=" + ID_service + "&category=" + category_ID + ":" + max_category_el;
                    window.location.href = "../service/" + newQuery;
                })
        } else {
            fetch("../../Services/" + "?limit=1" + "&offset=" + next)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + next + "&id_service=" + ID_service + ":" + max_all_el;
                    window.location.href = "../service/" + newQuery;
                })
        }
    }
    listen_prev.onclick = function () {
        if (queries[2] != null) {
            fetch("../../Services/Category/" + category_ID + "/?limit=1" + "&offset=" + prev)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + prev + "&id_service=" + ID_service + "&category=" + category_ID + ":" + max_category_el;
                    window.location.href = "../service/" + newQuery;
                })
        } else {
            fetch("../../Services/" + "?limit=1" + "&offset=" + prev)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + prev + "&id_service=" + ID_service + ":" + max_all_el;
                    window.location.href = "../service/" + newQuery;
                })
        }
    }


}