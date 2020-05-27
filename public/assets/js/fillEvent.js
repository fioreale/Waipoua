let event_queryString = decodeURIComponent(window.location.search);
event_queryString = event_queryString.substring(1);
let queries = event_queryString.split("&");

let offset = queries[0].split("=")[1];

let event_id = queries[1].split("=")[1];
event_id = event_id.split(":")[0];
let category_id = null;
let month_value = null;

// group in which the person could be: role or all
let events_by_category = null;
let events_by_month = null;
let all_events = null;

// index to start within the group
let index_group = 0;

if (queries[2] != null) {

    let param = queries[2].split(("="))[0]
    if (param === "category") {
        category_id = queries[2].split("=")[1];
        category_id = category_id.split(":")[0];

        fetch("../../Events/Categories/" + category_id + "/?limit=1000")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                events_by_category = json
                events_by_category = filter(events_by_category)
                find_index(event_id, events_by_category)
            }).then(() => fill(event_id))
    } else {
        month_value = queries[2].split("=")[1];
        max_cat_el = month_value.split(":")[1]
        month_value = month_value.split(":")[0];

        fetch("../../Events/Months/" + month_value + "/?limit=1000")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                events_by_month = json
                events_by_month = filter(events_by_month)
                find_index(event_id, events_by_month)
            }).then(() => fill(event_id))
    }

} else {
    fetch("../../Events/" + "?limit=1000")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            all_events = json
            all_events = filter(all_events)
            find_index(event_id, all_events)
        }).then(() => fill(event_id))
}

window.history.pushState({}, document.title, "../event");

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

function fill(event_id) {
    fetch("../../Events/" + event_id.toString())
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let title = document.getElementsByClassName("title")[0];
            let text = document.getElementsByClassName("description")[0];
            let background = document.getElementsByClassName("jumbotron-background")[0];
            let event_date = document.getElementById("event_date");
            let event_time = document.getElementById("event-time");
            let event_location = document.getElementById("event-address");

            // filling the services (if any)
            let el = document.getElementById("services-event");
            el.innerHTML = "";

            let {service} = json[0];
            if (service.ID_service != null) {
                let name = service.service_name;
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "p-2 bd-highlight");
                let newA = document.createElement("a");
                newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                    "list-inline-item transition-link clickable-service");
                newA.setAttribute("href", "#");
                newA.setAttribute("id_service", service.ID_service)
                newA.innerText = name;
                newDiv.appendChild(newA);
                el.appendChild(newDiv);
            } else {
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "p-2 bd-highlight");
                let newA = document.createElement("p");
                newA.setAttribute("class", " display-4 content-contact");
                newA.innerText = "There is no associated service.";
                newDiv.appendChild(newA);
                el.appendChild(newDiv);
            }

            // filling the person
            let personEl = document.getElementById("event-person");
            personEl.innerHTML = "";
            let {person} = json[0];
            personEl.setAttribute("person_id", person.ID_person)
            personEl.innerText = person.name + " " + person.surname;

            //filling the rest
            let {event_presentation, event_URI_image, date, event_name, location} = json[0]

            title.innerText = event_name
            text.innerText = event_presentation;
            background.style.backgroundImage = "url(" + "../../assets/" + search_back(json) + ")"

            // orientation info
            if (category_id != null)
                orientation_info(category_id, null, event_name)
            else
                orientation_info(null, month_value, event_name)

            // date & location setting
            event_date.innerText = date.day + "/" + date.month + "/" + date.year;
            if (date.minute === 0)
                event_time.innerText = date.hour + ":00";
            else
                event_time.innerText = date.hour + ":" + date.minute;

            event_location.innerText = location;

            let array = new Array(2)
            if (category_id != null) {
                array[0] = category_id;
                array[1] = null;
                return array
            } else {
                array[0] = null;
                array[1] = month_value;
                return array
            }

        })
        .then(function (array) {
            clicks_listener(array[0], array[1])
        })
}

function orientation_info(category, month, name) {
    let info = document.getElementsByClassName("breadcrumb");
    let newEl = document.createElement("li")
    const cat_enum = {
        1: "Animal Protection",
        2: "Forest Protection",
        3: "Pollution",
        4: "Fund Raising",
        5: "Association Promotion"
    }
    const month_enum = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }
    if (month != null) {
        info[0].innerHTML = "";
        let roleEl = document.createElement("li")
        roleEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "role-callback")
        newA.innerText = month_enum[month];
        roleEl.appendChild(newA);
        info[0].appendChild(roleEl);
    } else if (category != null) {
        info[0].innerHTML = "";
        let roleEl = document.createElement("li")
        roleEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "role-callback")
        newA.innerText = cat_enum[category];
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

function clicks_listener(category, month) {
    let listener = document.getElementById("role-callback");

    if (listener != null) {
        listener.onclick = function () {
            let query_par
            if (category != null) {
                query_par = "?page=0" + "&category=" + category;
            } else if (month != null) {
                query_par = "?page=0" + "&month=" + month;
            } else
                query_par = "?page=0";

            window.location.href = "../../all_events/" + query_par;
        }
    }
    let listener_person = document.getElementById("event-person");
    let listener_service = document.getElementsByClassName("clickable-service")[0];

    if (listener_person != null) {
        listener_person.onclick = function () {
            let value1 = listener_person.getAttribute("person_id");
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_service != null) {
        listener_service.onclick = function () {
            let value1 = listener_service.getAttribute("id_service")
            let queryString = "?offset=0" + "&id_service=" + value1 + ":1";
            window.location.href = "../../all_services/service/" + queryString;
        }
    }

    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("prev-btn footer")[0];
    let listen_next = document.getElementsByClassName("nav-link landmark group-link next-btn")[0];

    // "max" changes depending in which way I accessed to the service
    let max_events_DB;
    if (events_by_category != null) {
        max_events_DB = events_by_category.length;
    } else if (events_by_month != null) {
        max_events_DB = events_by_month.length
    } else
        max_events_DB = all_events.length

    let next, prev;

    // setting next offset
    if (parseInt(index_group) === parseInt(max_events_DB) - 1)
        next = 0
    else next = index_group + 1

    // setting prev offset
    if (parseInt(index_group) === 0)
        prev = (Math.floor(parseInt(max_events_DB) - 1))
    else prev = index_group - 1

    listen_next.onclick = function () {
        index_group = next
        if (events_by_category != null) {
            fill(events_by_category[index_group].ID_event)
        } else if (events_by_month != null) {
            fill(events_by_month[index_group].ID_event)
        } else {
            fill(all_events[index_group].ID_event)
        }
    }

    listen_prev.onclick = function () {
        index_group = prev
        if (events_by_category != null) {
            fill(events_by_category[index_group].ID_event)
        } else if (events_by_month != null) {
            fill(events_by_month[index_group].ID_event)
        } else {
            fill(all_events[index_group].ID_event)
        }
    }
}