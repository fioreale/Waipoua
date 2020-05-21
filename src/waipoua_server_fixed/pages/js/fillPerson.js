var person_queryString = decodeURIComponent(window.location.search);
person_queryString = person_queryString.substring(1);
var queries = person_queryString.split("&");
console.log(queries)

var offset = queries[0].split("=")[1];

var person_id = queries[1].split("=")[1];
var max_all_el = person_id.split(":")[1]
person_id = person_id.split(":")[0]
let role_id = null

if (queries[2] != null) {
    role_id = queries[2].split("=")[1];
    var max_role_el = role_id.split(":")[1]
    role_id = role_id.split(":")[0]
    console.log(max_role_el)
}

fetch("../../People/" + person_id)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        let title = document.getElementById("person-name");
        let text = document.getElementById("description");
        let background = document.getElementById("background-person");
        let number = document.getElementById("number");
        let mail = document.getElementById("mail");
        console.log(json)
        let {ID_person, name, surname, description, phone_number, email, URI_image, role} = json[0];

        title.firstElementChild.innerHTML = name + " " + surname;
        text.innerText = description;
        number.innerText = phone_number;
        mail.innerText = email;
        background.style.backgroundImage = "url(" + URI_image + ")"

        orientation_info(role_id, name + " " + surname)

        //filling the services (at least one)
        let el = document.getElementById("services-person");
        el.innerHTML = "";
        for (let i = 0; i < json.length; i++) {
            let {service} = json[i];
            let name = service.service_name;
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("a");
            newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                "list-inline-item transition-link clickable-service");
            newA.setAttribute("href", "#");
            newA.setAttribute("service_id", service.ID_Service_inv)
            newA.innerText = name;
            newDiv.appendChild(newA);
            el.appendChild(newDiv);
        }

        //filling the events (if any)
        let event_el = document.getElementById("event-person");
        event_el.innerHTML = "";
        let {event} = json[0];
        if (event.ID_event != null) {
            let event_name = event.event_name;
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("a");
            newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                "list-inline-item transition-link clickable-event");
            newA.setAttribute("href", "#");
            newA.setAttribute("event_id", event.ID_event)
            newA.innerText = event_name;
            newDiv.appendChild(newA);
            event_el.appendChild(newDiv);
        } else {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("p");
            newA.setAttribute("class", " display-4 content-contact");
            newA.innerText = "There is no associated event.";
            newDiv.appendChild(newA);
            event_el.appendChild(newDiv);
        }
        return role.ID_role
    })
    .then(function (role) {
        clicks_listener(role)
    })

function orientation_info(role, name) {
    let role_enum = {
        1: "Chief",
        2: "Vice",
        3: "Treasurer",
        4: "Vets",
        5: "Biologists",
        6: "Chemists",
        7: "Recycle Experts",
        8: "Volunteers"
    }
    let info = document.getElementsByClassName("breadcrumb");
    let newEl = document.createElement("li")
    if (role != null) {
        info[0].innerHTML = "";
        let roleEl = document.createElement("li")
        roleEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "role-callback")
        newA.innerText = role_enum[role];
        roleEl.appendChild(newA);
        info[0].appendChild(roleEl);
    }
    newEl.setAttribute("class", "breadcrumb-item active")
    newEl.setAttribute("aria-current", "page")
    newEl.innerText = name;
    info[0].appendChild(newEl)
}

function clicks_listener(role) {
    var listener = document.getElementById("role-callback");

    if (listener != null) {
        listener.onclick = function () {
            let query_par
            if (role != null) {
                query_par = "?page=0" + "&id_role=" + role;
            } else
                query_par = "?page=0";

            window.location.href = "../../all_people/" + query_par;
        }
    }

    let listener_event = document.getElementsByClassName("clickable-event")
    let listener_services = document.getElementsByClassName("clickable-service")

    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("prev-btn footer")[0];
    let listen_next = document.getElementsByClassName("next-btn")[0];

    // "max" changes depending in which way I accessed to the service
    let max_people_DB;
    if (queries[2] != null) {
        max_people_DB = max_role_el;
    } else max_people_DB = max_all_el;

    let next, prev;

    // setting next offset
    if (offset === max_people_DB.toString())
        next = 0
    else next = (Math.floor(parseInt(offset) + 1)).toString()

    // setting prev offset
    if (offset === "0")
        prev = (Math.floor(parseInt(max_people_DB) - 1)).toString()
    else prev = (Math.floor(parseInt(offset) - 1)).toString()

    if (isNaN(next))
        next = 0
    if (isNaN(prev))
        prev = 0

    // Listeners services[max 3]
    if (listener_services[0] != null) {
        listener_services[0].onclick = function () {
            let value1 = listener_services[0].getAttribute("service_id")
            let queryString = "?offset=0" + "&id_service=" + value1 + ":1";
            window.location.href = "../../all_services/service/" + queryString;
        }
    }
    if (listener_services[1] != null) {
        listener_services[1].onclick = function () {
            let value1 = listener_services[1].getAttribute("service_id")
            let queryString = "?offset=0" + "&id_service=" + value1 + ":1";
            window.location.href = "../../all_services/service/" + queryString;
        }
    }
    if (listener_services[2] != null) {
        listener_services[2].onclick = function () {
            let value1 = listener_services[2].getAttribute("service_id")
            let queryString = "?offset=0" + "&id_service=" + value1 + ":1";
            window.location.href = "../../all_services/service/" + queryString;
        }
    }

    // Listeners event
    if (listener_event[0] != null) {
        listener_event[0].onclick = function () {
            let value1 = listener_event[0].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }

    listen_next.onclick = function () {

        if (queries[2] != null) {
            fetch("../../People/Roles/" + role_id + "/?limit=1" + "&offset=" + next)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + next + "&id_person=" + ID_service + "&role=" + role_id + ":" + max_role_el;
                    window.location.href = "../person/" + newQuery;
                })
        } else {
            fetch("../../People/" + "?limit=1" + "&offset=" + next)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + next + "&id_person=" + ID_service + ":" + max_all_el;
                    console.log(newQuery)
                    window.location.href = "../person/" + newQuery;
                })
        }
    }
    listen_prev.onclick = function () {
        if (queries[2] != null) {
            fetch("../../People/Roles/" + role_id + "/?limit=1" + "&offset=" + prev)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + prev + "&id_person=" + ID_service + "&role=" + role_id + ":" + max_role_el;
                    window.location.href = "../person/" + newQuery;
                })
        } else {
            fetch("../../People/" + "?limit=1" + "&offset=" + prev)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    let {ID_service} = json[0];
                    let newQuery = "?offset=" + prev + "&id_person=" + ID_service + ":" + max_all_el;
                    window.location.href = "../person/" + newQuery;
                })
        }

    }
}