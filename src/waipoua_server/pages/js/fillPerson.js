var person_queryString = decodeURIComponent(window.location.search);
person_queryString = person_queryString.substring(1);
var queris = person_queryString.split("&");
console.log(queris)
var person_id = queris[0].split("=")[1];
if (queris[1] != null) {
    var role_name = queris[1].split("=")[1];
}

// TODO fill the next and prev buttons depending on the visited group of people

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

        orientation_info(role_name, name + " " + surname)

        //filling the services (at least one)
        let el = document.getElementById("services-person");
        el.innerHTML = "";
        for (let i = 0; i < json.length; i++) {
            let {service} = json[i];
            let name = service.service_name;
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "p-2 bd-highlight");
            let newA = document.createElement("a");
            newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success list-inline-item transition-link");
            newA.setAttribute("href", "#");
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
            newA.setAttribute("class", "tooltip-base badge-pill btn btn-outline-success list-inline-item transition-link");
            newA.setAttribute("href", "#");
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
        orientation_role_click(role)
    })

function orientation_info(role, name) {
    let info = document.getElementsByClassName("breadcrumb");
    let newEl = document.createElement("li")
    if (role != null) {
        let roleEl = document.createElement("li")
        roleEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "role-callback")
        newA.innerText = role;
        roleEl.appendChild(newA);
        info[0].appendChild(roleEl);
    }
    newEl.setAttribute("class", "breadcrumb-item active")
    newEl.setAttribute("aria-current", "page")
    newEl.innerText = name;
    info[0].appendChild(newEl)
}

function orientation_role_click(role) {
    var listener = document.getElementById("role-callback");
    listener.onclick = function () {
        let query_par = "?id_role=" + role;
        window.location.href = "../../all_people" + query_par;
    }
}