let service_queryString = decodeURIComponent(window.location.search);
service_queryString = service_queryString.substring(1);
let queries = service_queryString.split("&");

let offset = queries[0].split("=")[1];

let service_id = queries[1].split("=")[1];
service_id = service_id.split(":")[0]
let category_ID = null;

// group in which the person could be: role or all
let services_by_category = null;
let all_services = null;

// index to start within the group
let index_group = 0;

if (queries[2] != null) {
    category_ID = queries[2].split("=")[1];
    category_ID = category_ID.split(":")[0]

    fetch("../../Services/Category/" + category_ID + "/?limit=1000")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            services_by_category = json;
            services_by_category = filter(services_by_category)
            find_index(service_id, services_by_category)
        }).then(() => fill(service_id))
} else {
    fetch("../../Services/" + "?limit=1000")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            all_services = json
            all_services = filter(all_services)
            find_index(service_id, all_services)
        }).then(() => fill(service_id))
}


function find_index(id, group) {
    for (let i = 0; i < group.length; i++) {
        if (group[i].service_id === parseInt(id)) {
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

function refresh() {
    document.getElementsByClassName("carousel-inner")[0]
        .innerHTML = ""
    document.getElementById("service-involved-people")
        .innerHTML = ""
    document.getElementById("service-associated-events")
        .innerHTML = ""

}

function fill(service_id) {
    fetch("../../Services/" + service_id.toString())
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let text = document.getElementById("service-description");
            let carousel = document.getElementsByClassName("carousel-inner")[0];
            let title = document.getElementsByClassName("display-4 title")[0];
            let background = document.getElementsByClassName("jumbotron-background")[0];

            let {name, presentation, image, category, people, events} = json
            title.innerText = name;
            text.innerText = presentation;

            background.style.backgroundImage = "url(" + "../../assets/" + image[0]["url"] + ")"

            refresh()

            // setting images in the carousel
            // let images = filter_carousel(json)
            for (let i = 1; i < image.length; i++) {
                let newDiv = document.createElement("div");
                if (i === 1)
                    newDiv.setAttribute("class", "carousel-item active")
                else
                    newDiv.setAttribute("class", "carousel-item")

                let newIm = document.createElement("img");
                newIm.setAttribute("class", "d-block img-fluid");
                newIm.setAttribute("src", "../../assets/" + image[i]["url"]);
                newIm.setAttribute("alt", "...");
                newDiv.appendChild(newIm);
                carousel.appendChild(newDiv);
            }

            // setting the practical information
            // People
            // let people = filter_people(json)
            let personEl = document.getElementById("service-involved-people");
            for (let i = 0; i < people.length; i++) {
                let name = people[i]["name"] + " " + people[i]["surname"];
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "p-md-2 bd-highlight");
                let newA = document.createElement("a");
                newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                    "list-inline-item transition-link clickable-person");
                newA.setAttribute("href", "#");
                newA.setAttribute("person_id", people[i]["person_id"])
                newA.innerText = name;
                newDiv.appendChild(newA);
                personEl.appendChild(newDiv);
            }

            // Events
            // let events = filter_events(json)
            let el = document.getElementById("service-associated-events");
            for (let i = 0; i < events.length; i++) {
                if (i % 4 === 0 && i > 0) {
                    let newRow = document.createElement("div")
                    newRow.setAttribute("class", "d-md-flex flex-md-row bd-highlight mb-md-4")
                    el.parentElement.appendChild(newRow)
                    el = newRow
                }
                if (events[i]["event_id"] != null) {
                    let name = events[i]["name"];
                    let newDiv = document.createElement("div");
                    newDiv.setAttribute("class", "p-md-2 bd-highlight");
                    let newA = document.createElement("a");
                    newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                        "list-inline-item transition-link clickable-event");
                    newA.setAttribute("href", "#");
                    newA.setAttribute("event_id",events[i]["event_id"]);
                    newA.innerText = name;
                    newDiv.appendChild(newA);
                    el.appendChild(newDiv);
                }

            }
            if (events.length === 0) {
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "p-2 bd-highlight");
                let newA = document.createElement("p");
                newA.setAttribute("class", " display-4 content-contact");
                newA.innerText = "There is no associated event.";
                newDiv.appendChild(newA);
                el.appendChild(newDiv);
            }

            orientation_info(category_ID, name)

            return category.category_id
        })
        .then(function (category) {
            clicks_listener(category);
        })
}

/*function fill_person_card(image_url, name, service_id) {
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
}*/

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
    if (info[0].children.length > 1) {
        info[0].lastElementChild.remove()
        info[0].appendChild(newEl)
    } else
        info[0].appendChild(newEl)
}

function clicks_listener(category) {
    // Orientation Info clicks
    let listener = document.getElementById("category-callback");

    if (listener != null) {
        listener.onclick = function () {
            let query_par
            if (category != null) {
                query_par = "?page=0" + "&id_category=" + category;
            } else
                query_par = "?page=0"
            window.location.href = "../../all_services/" + query_par;
        }
    }

    let listener_people = document.getElementsByClassName("clickable-person")
    let listener_event = document.getElementsByClassName("clickable-event")

    //listeners for people[max 5]
    if (listener_people[0] != null) {
        listener_people[0].onclick = function () {
            let value1 = listener_people[0].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[1] != null) {
        listener_people[1].onclick = function () {
            let value1 = listener_people[1].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[2] != null) {
        listener_people[2].onclick = function () {
            let value1 = listener_people[2].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[3] != null) {
        listener_people[3].onclick = function () {
            let value1 = listener_people[3].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }
    if (listener_people[4] != null) {
        listener_people[4].onclick = function () {
            let value1 = listener_people[4].getAttribute("person_id")
            let queryString = "?offset=0" + "&id_person=" + value1 + ":1";
            window.location.href = "../../all_people/person/" + queryString;
        }
    }

    //listeners for events[max 12]
    if (listener_event[0] != null) {
        listener_event[0].onclick = function () {
            let value1 = listener_event[0].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[1] != null) {
        listener_event[1].onclick = function () {
            let value1 = listener_event[1].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[2] != null) {
        listener_event[2].onclick = function () {
            let value1 = listener_event[2].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[3] != null) {
        listener_event[3].onclick = function () {
            let value1 = listener_event[3].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[4] != null) {
        listener_event[4].onclick = function () {
            let value1 = listener_event[4].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[5] != null) {
        listener_event[5].onclick = function () {
            let value1 = listener_event[5].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[6] != null) {
        listener_event[6].onclick = function () {
            let value1 = listener_event[6].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[7] != null) {
        listener_event[7].onclick = function () {
            let value1 = listener_event[7].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[8] != null) {
        listener_event[8].onclick = function () {
            let value1 = listener_event[8].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[9] != null) {
        listener_event[9].onclick = function () {
            let value1 = listener_event[9].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[10] != null) {
        listener_event[10].onclick = function () {
            let value1 = listener_event[10].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }
    if (listener_event[11] != null) {
        listener_event[11].onclick = function () {
            let value1 = listener_event[11].getAttribute("event_id")
            let queryString = "?offset=0" + "&id_event=" + value1 + ":1";
            window.location.href = "../../all_events/event/" + queryString;
        }
    }

    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("nav-link landmark group-link prev-btn")[0];
    let listen_next = document.getElementsByClassName("nav-link landmark group-link next-btn")[0];

    // "max" changes depending in which way I accessed to the service
    let max_services_DB;
    if (queries[2] != null) {
        max_services_DB = services_by_category.length;
    } else max_services_DB = all_services.length;

    let next, prev;

    // setting next offset
    if (parseInt(index_group) === parseInt(max_services_DB) - 1)
        next = 0
    else next = index_group + 1

    // setting prev offset
    if (parseInt(index_group) === 0)
        prev = (Math.floor(parseInt(max_services_DB) - 1))
    else prev = index_group - 1

    listen_next.onclick = function () {
        document.getElementById("intro-tab").click()
        index_group = next
        if (services_by_category != null)
            fill(services_by_category[index_group].ID_service)
        else
            fill(all_services[index_group].ID_service)
    }
    listen_prev.onclick = function () {
        document.getElementById("intro-tab").click()
        index_group = prev
        if (services_by_category != null)
            fill(services_by_category[index_group].ID_service)
        else
            fill(all_services[index_group].ID_service)
    }
}