var events_queryString = decodeURIComponent(window.location.search);
events_queryString = events_queryString.substring(1);
var queries = events_queryString.split("&");
let param = queries[0].split(("="))[0];
let category_ID = null;
let month = null;
if (param === "category")
    category_ID = queries[0].split("=")[1];
else
    month = queries[0].split("=")[1];

console.log("passed category_ID" + category_ID)
console.log("passed month id" + month)

/**
 * This script file manages manages the Introductory Page of "Events" filling the content of the list depending on the
 * choice of the user
 * @type {HTMLElement}
 */

var all_radio = document.getElementById("allRadio1");
var month_radio = document.getElementById("monthRadio1");
var category_radio = document.getElementById("categoryRadio1");
var apply_btn = document.getElementById("apply-btn");
var months = document.getElementById("month-menu");
var content_months = months.innerHTML;
var events = document.getElementById("events-menu");
var content_events = events.innerHTML;

if (category_ID != null) {
    window.onload = function () {
        category_radio.click()
        document.getElementById("select-category").value = category_ID
        apply_btn.click()
    }
} else if (month != null) {
    window.onload = function () {
        month_radio.click()
        document.getElementById("select-month").value = month
        apply_btn.click()
    }
} else {
    window.onload = function () {
        all_radio.click();
        apply_btn.click();
    }
}


all_radio.onclick = function () {
    if (document.getElementById("month-menu") != null) {
        document.getElementById("month-menu").remove();
    }
    if (document.getElementById("events-menu") != null) {
        document.getElementById("events-menu").remove();
    }
    apply_btn.onclick = function () {
        document.getElementById("title_jumbo").innerText = "All Events";

        fetch("../Events")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log(json)
                refresh()
                var begin = document.getElementById("begin-events")
                for (let i = 0; i < json.length; i++) {
                    if (i % 3 === 0 && i > 0) {
                        let newRow = document.createElement("div")
                        newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                            "justify-content-center");
                        begin.removeAttribute("id");
                        newRow.setAttribute("id", "begin-events");
                        begin = document.getElementById("begin-events")
                        begin.parentElement.appendChild(newRow);
                    }
                    let {ID_event, event_name, event_presentation, event_URI_image} = json[i];
                    begin.appendChild(fill(event_URI_image, event_name, ID_event))
                }
            })
            .then(() => clicks(null, null))
    }
}

category_radio.onclick = function () {
    if (document.getElementById("month-menu") != null) {
        document.getElementById("month-menu").remove();
    }
    category_radio.parentElement.parentElement.append(events);
    events.innerHTML = content_events;
    apply_btn.onclick = function () {
        var index = document.getElementById("select-category").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo").innerHTML = document.getElementById("select-category").innerText.split("\n")[index];
            let momentum = document.getElementById("select-category").value;
            document.getElementById("select-category").value = document.getElementById("select-category").innerText.split("\n")[0];
            document.getElementById("events-menu").remove();

            if (momentum != null) {
                fetch("../Events/Categories/" + momentum)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        console.log(json)
                        refresh()
                        var category_passed = null;
                        var begin = document.getElementById("begin-events")
                        for (let i = 0; i < json.length; i++) {
                            if (i % 3 === 0 && i > 0) {
                                let newRow = document.createElement("div")
                                newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                                    "justify-content-center");
                                begin.removeAttribute("id");
                                newRow.setAttribute("id", "begin-events");
                                begin = document.getElementById("begin-events")
                                begin.parentElement.appendChild(newRow);
                            }
                            let {ID_event, event_name, event_presentation, event_URI_image, category} = json[i];
                            category_passed = category.category_name;
                            begin.appendChild(fill(event_URI_image, event_name, ID_event))
                        }
                        return category_passed
                    })
                    .then(function (category) {
                        clicks(category, null)
                    })
            }
        }
    }
}

month_radio.onclick = function () {
    if (document.getElementById("events-menu") != null) {
        document.getElementById("events-menu").remove();
    }
    month_radio.parentElement.parentElement.append(months);
    months.innerHTML = content_months;
    apply_btn.onclick = function () {
        var index = document.getElementById("select-month").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo").innerHTML = document.getElementById("select-month").innerText.split("\n")[index];
            let momentum = document.getElementById("select-month").value
            console.log(momentum)
            document.getElementById("select-month").value = document.getElementById("select-month").innerText.split("\n")[0];
            document.getElementById("month-menu").remove();

            if (momentum != null) {
                fetch("../Events/Months/" + momentum)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        console.log(json)
                        refresh()
                        var month_passed = null;
                        var begin = document.getElementById("begin-events")
                        for (let i = 0; i < json.length; i++) {
                            if (i % 3 === 0 && i > 0) {
                                let newRow = document.createElement("div")
                                newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                                    "justify-content-center");
                                begin.removeAttribute("id");
                                newRow.setAttribute("id", "begin-events");
                                begin = document.getElementById("begin-events")
                                begin.parentElement.appendChild(newRow);
                            }
                            let {ID_event, event_name, event_presentation, event_URI_image, date} = json[i];
                            month_passed = date.month;
                            begin.appendChild(fill(event_URI_image, event_name, ID_event))
                        }
                        return month_passed
                    })
                    .then(function (month) {
                        clicks(null, month)
                    })
            }
        }
    }
}

function fill(image_url, name, event_id) {
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
    newA.setAttribute("id", "event-" + event_id)
    newA.innerText = name;

    newPiece_in_div.appendChild(newA);
    newPiece_in.appendChild(newPiece_in_im);
    newPiece_in.appendChild(newPiece_in_div);
    newPiece.appendChild(newPiece_in);

    return newPiece;
}

function refresh() {
    var el = document.getElementById("begin-events")
    el.innerHTML = "";
}

function clicks(by_category, by_month) {
    var list1, list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12;
    var list = document.getElementsByClassName("card-body");
    var queryString;

    list1 = list[0];
    if (list1 != null) {
        list1.onclick = function () {
            var value1 = list1.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }

            window.location.href = "event" + queryString;
        }
    }
    list2 = list[1];
    if (list2 != null) {
        list2.onclick = function () {
            var value1 = list2.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }

            window.location.href = "event" + queryString;
        }
    }
    list3 = list[2];
    if (list3 != null) {
        list3.onclick = function () {
            var value1 = list3.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }

            window.location.href = "event" + queryString;
        }
    }
    list4 = list[3];
    if (list4 != null) {
        list4.onclick = function () {
            var value1 = list4.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list5 = list[4];
    if (list5 != null) {
        list5.onclick = function () {
            var value1 = list5.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list6 = list[5];
    if (list6 != null) {
        list6.onclick = function () {
            var value1 = list6.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list7 = list[6];
    if (list7 != null) {
        list7.onclick = function () {
            var value1 = list7.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list8 = list[7];
    if (list8 != null) {
        list8.onclick = function () {
            var value1 = list8.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list9 = list[8];
    if (list9 != null) {
        list9.onclick = function () {
            var value1 = list9.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list10 = list[9];
    if (list10 != null) {
        list10.onclick = function () {
            var value1 = list10.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list11 = list[10];
    if (list11 != null) {
        list11.onclick = function () {
            var value1 = list11.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
    list12 = list[11];
    if (list12 != null) {
        list12.onclick = function () {
            var value1 = list12.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_event=" + value1 + "&category=" + by_category;
            } else if (by_month != null) {
                queryString = "?id_event=" + value1 + "&month=" + by_month;
            } else {
                queryString = "?id_event=" + value1;
            }
            window.location.href = "event" + queryString;
        }
    }
}