var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var person_id = queryString.split("=")[1];

fetch("http://localhost:8080/People/" + person_id)
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
        let {ID_person, name, surname, description, phone_number, email, URI_image, ID_role} = json[0];

        title.firstElementChild.innerHTML = name + " " + surname;
        text.innerText = description;
        number.innerText = phone_number;
        mail.innerText = email;
        background.style.backgroundImage = "url(" + URI_image + ")"

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
    })
