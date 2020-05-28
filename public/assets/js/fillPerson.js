let person_queryString = decodeURIComponent(window.location.search);
person_queryString = person_queryString.substring(1);
let queries = person_queryString.split("&");

let offset = queries[0].split("=")[1];

let person_id = queries[1].split("=")[1];
person_id = person_id.split(":")[0]
let role_id = null;

// group in which the person could be: role or all
let people_by_role = null;
let all_people = null;

// index to start within the group
let index_group = 0;

if (queries[2] != null) {
    role_id = queries[2].split("=")[1];
    role_id = role_id.split(":")[0]

    fetch("../../People/Roles/" + role_id + "/?limit=1000")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            people_by_role = json
            people_by_role = filter(people_by_role)
            find_index(person_id, people_by_role)
        }).then(() => fill(person_id))
} else {
    fetch("../../People/" + "?limit=1000")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            all_people = json;
            all_people = filter(all_people)
            find_index(person_id, all_people)
        }).then(() => fill(person_id))
}


function find_index(id, group) {
    for (let i = 0; i < group.length; i++) {
        if (group[i].ID_person === parseInt(id)) {
            index_group = i
            break
        }
    }
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

function fill(person_id) {
    fetch("../../People/" + person_id.toString())
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {

            let title = document.getElementById("person-name");
            let text = document.getElementById("description");
            let background = document.getElementById("background-person");
            let number = document.getElementById("number");
            let mail = document.getElementById("mail");
            let {person_id, name, surname, description, phone_number, email, image, role, services, events} = json;

            title.firstElementChild.innerHTML = name + " " + surname;
            text.innerText = description;
            number.innerText = phone_number;
            mail.innerText = email;
            background.style.backgroundImage = "url(" + "../../assets/" + image + ")"

            orientation_info(role_id, name + " " + surname)

            //filling the services (at least one)
            let el = document.getElementById("services-person");
            el.innerHTML = "";
            for (let i = 0; i < services.length; i++) {
                let name = services[i]["name"];
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "p-2 bd-highlight");
                let newA = document.createElement("a");
                newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                    "list-inline-item transition-link clickable-service");
                newA.setAttribute("href", "#");
                newA.setAttribute("service_id", services[i]["service_id"])
                newA.innerText = name;
                newDiv.appendChild(newA);
                el.appendChild(newDiv);
            }

            //filling the events (if any)
            let event_el = document.getElementById("event-person");
            event_el.innerHTML = "";
            if (events.event_id != null) {
                let event_name = events.name;
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "p-2 bd-highlight");
                let newA = document.createElement("a");
                newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                    "list-inline-item transition-link clickable-event");
                newA.setAttribute("href", "#");
                newA.setAttribute("event_id", events.event_id)
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
            clicks_listener(role.category_id)
        })
}


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
    if (info[0].children.length > 1) {
        info[0].lastElementChild.remove()
        info[0].appendChild(newEl)
    } else
        info[0].appendChild(newEl)
}

function clicks_listener(role) {
    let listener = document.getElementById("role-callback");

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

    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("nav-link landmark group-link prev-btn")[0];
    let listen_next = document.getElementsByClassName("nav-link landmark group-link next-btn")[0];

    // "max" changes depending in which way I accessed to the service
    let max_people_DB;
    if (queries[2] != null) {
        max_people_DB = people_by_role.length;
    } else max_people_DB = all_people.length;

    let prev, next;

    // setting next offset
    if (parseInt(index_group) === parseInt(max_people_DB) - 1)
        next = 0
    else next = index_group + 1

    // setting prev offset
    if (parseInt(index_group) === 0)
        prev = (Math.floor(parseInt(max_people_DB) - 1))
    else prev = index_group - 1

    listen_next.onclick = function () {
        index_group = next
        if (queries[2] != null)
            fill(people_by_role[index_group].ID_person)
        else fill(all_people[index_group].ID_person)
    }
    listen_prev.onclick = function () {
        index_group = prev
        if (queries[2] != null)
            fill(people_by_role[index_group].ID_person)
        else fill(all_people[index_group].ID_person)
    }
}