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
        let title = document.getElementsByClassName("title")[0];
        let text = document.getElementsByClassName("description")[0];
        let background = document.getElementsByClassName("jumbotron-background")[0];
        let event_date = document.getElementById("event_date");
        let event_time = document.getElementById("event-time");
        let event_location = document.getElementById("event-address");

        // filling the services (if any)
        var el = document.getElementById("services-event");
        el.innerHTML = "";

        let {service} = json[0];
        if (service.ID_service != null) {
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
        personEl.innerHTML = "";
        let {person} = json[0];
        personEl.innerText = person.name + " " + person.surname;

        //filling the rest
        let {event_presentation, event_URI_image, date, event_name, location} = json[0]

        title.innerText = event_name
        text.innerText = event_presentation;
        background.style.backgroundImage = "url(" + event_URI_image + ")"

        // orientation info
        if (category_name != null)
            orientation_info(category_name, event_name)
        else
            orientation_info(month_value, event_name)

        // date & location setting
        event_date.innerText = date.day + "/" + date.month + "/" + date.year;
        if (date.minute === 0)
            event_time.innerText = date.hour + ":00";
        else
            event_time.innerText = date.hour + ":" + date.minute;

        event_location.innerText = location;

        let array = new Array(2)
        if (category_name != null) {
            array[0] = category_name;
            array[1] = null;
            return array
        } else{
            array[0] = null;
            array[1] = month_value;
            return array
        }

    })
    .then(function (array) {
        orientation_role_click(array[0], array[1])
    })

function orientation_info(group, name) {
    let info = document.getElementsByClassName("breadcrumb");
    let newEl = document.createElement("li")
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

    if (group != null) {
        info[0].innerHTML = "";
        let roleEl = document.createElement("li")
        roleEl.setAttribute("class", "breadcrumb-item non-active")
        let newA = document.createElement("a")
        newA.setAttribute("href", "#")
        newA.setAttribute("id", "role-callback")
        newA.innerText = month_enum[group];
        roleEl.appendChild(newA);
        info[0].appendChild(roleEl);
    }
    newEl.setAttribute("class", "breadcrumb-item active")
    newEl.setAttribute("aria-current", "page")
    newEl.innerText = name;
    info[0].appendChild(newEl)
}

function orientation_role_click(category, month) {
    var listener = document.getElementById("role-callback");
    if (category != null){
        listener.onclick = function () {
            let query_par = "?category=" + category;
            window.location.href = "../../all_events" + query_par;
        }
    }
    else {
        listener.onclick = function () {
            let query_par = "?month=" + month;
            window.location.href = "../../all_events" + query_par;
        }
    }

}
