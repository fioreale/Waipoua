var service_queryString = decodeURIComponent(window.location.search);
service_queryString = service_queryString.substring(1);
var queries = service_queryString.split("&");
console.log(queries)
var service_id = queries[0].split("=")[1];
if (queries[1] != null) {
    var category_name = queries[1].split("=")[1];
}

fetch("../../Services/" + service_id)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        let text = document.getElementById("service-description");
        let carousel = document.getElementsByClassName("carousel-inner")[0];
        let title = document.getElementsByClassName("display-1 title")[0];
        let begin;
        console.log(json)

        let {service_name, service_presentation, service_category} = json[0]
        title.innerText = service_name;
        text.innerText = service_presentation;

        // setting images in the carousel
        for (let i = 0; i < json.length; i++) {
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
        // TODO listeners for such links
        // CARDS
        for (let i = 0; i < json.length; i++) {
            if (i === 0) {
                begin = document.getElementById("service-involved-people");
            }
            let {person} = json[i];
            if (person != null) {
                begin.appendChild(fill_person_card(person.URI_image, person.name + " " + person.surname, person.ID_person))
            }
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
                newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success list-inline-item transition-link");
                newA.setAttribute("href", "#");
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

        orientation_info(category_name, service_name)

        return service_category
    })
    .then(function (category) {
        orientation_category_click(category);
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
    let info = document.getElementsByClassName("breadcrumb");
    let newEl = document.createElement("li")
    if (category != null) {
        let categoryEl = document.createElement("li")
        categoryEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "category-callback")
        newA.innerText = category;
        categoryEl.appendChild(newA);
        info[0].appendChild(categoryEl);
    }
    newEl.setAttribute("class", "breadcrumb-item active")
    newEl.setAttribute("aria-current", "page")
    newEl.innerText = name;
    info[0].appendChild(newEl)
}

function orientation_category_click(category) {
    var listener = document.getElementById("category-callback");
    listener.onclick = function () {
        let query_par = "?id_category=" + category;
        window.location.href = "../../all_services" + query_par;
    }
}