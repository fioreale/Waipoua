var event_queryString = decodeURIComponent(window.location.search);
event_queryString = event_queryString.substring(1);
var queries = event_queryString.split("&");
console.log(queries)
var event_id = queries[0].split("=")[1];
if (queries[1] != null) {
    let param = queries[1].split(("="))[0]
    if (param === "category")
        var category_name = queries[1].split("=")[1];
    else
        var month_value = queries[1].split("=")[1];
}

fetch("../../Events/" + event_id)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        console.log(json)
        let text = document.getElementsByClassName("description")[0];
        let background = document.getElementsByClassName("jumbotron-background")[0];
        let event_date = document.getElementById("event_date");
        let event_time = document.getElementById("event-time");
        let event_location = document.getElementById("event-address");

        // filling the services (if any)
        let el = document.getElementById("services-event");
        el.innerHTML = "";

        let {service} = json[0];
        if (service != null) {
            let name = service.service_name;
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("a");
            newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success " +
                "list-inline-item transition-link");
            newA.setAttribute("href", "#");
            newA.innerText = name;
            newDiv.appendChild(newA);
            el.appendChild(newDiv);
        } else {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("p");
            newA.setAttribute("class", " display-4 content-contact");
            newA.innerText = "There is no associated event.";
            newDiv.appendChild(newA);
            el.appendChild(newDiv);
        }

        // filling the person
        let personEl = document.getElementById("event-person");
        el.innerHTML = "";
        let {person} = json[0];
        personEl.innerText = person.name + " " + person.surname;

        //filling the rest
        let {event_presentation, event_URI_image, date} = json[0]
        text.innerText = event_presentation;
        background.style.backgroundImage = "url(" + event_URI_image + ")"
    })

function orientation_info(group, name) {
    let info = document.getElementsByClassName("breadcrumb");
    let newEl = document.createElement("li")
    if (group != null) {
        info[0].innerHTML = "";
        let roleEl = document.createElement("li")
        roleEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "role-callback")
        newA.innerText = group;
        roleEl.appendChild(newA);
        info[0].appendChild(roleEl);
    }
    newEl.setAttribute("class", "breadcrumb-item active")
    newEl.setAttribute("aria-current", "page")
    newEl.innerText = name;
    info[0].appendChild(newEl)
}

function orientation_role_click(group) {
    var listener = document.getElementById("role-callback");
    listener.onclick = function () {
        let query_par = "?id_role=" + group;
        window.location.href = "../../all_people" + query_par;
    }
}
