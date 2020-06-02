var services_queryString = decodeURIComponent(window.location.search);
services_queryString = services_queryString.substring(1);

var queries = services_queryString.split("&");

let page = 0;
let category_ID = null;

let context = 1;

if (queries[0] != null) {
    page = 0 + queries[0].split("=")[1];

    if (queries[1] != null)
        category_ID = queries[1].split("=")[1];
}

window.history.pushState({}, document.title, "../all_services");


/**
 * This script file manages manages the Introductory Page of "Services" filling the content of the list depending on the
 * choice of the user
 * @type {HTMLElement}
 */

var all_radio = document.getElementById("allRadio2");
var category_radio = document.getElementById("categoryRadio2");
var apply_btn = document.getElementById("apply-btn2");
var menu = document.getElementById("service-menu");
var content_menu = menu.innerHTML;

let dataset = null;
let index = 0;

if (category_ID != null) {
    window.onload = function () {
        category_radio.click()
        document.getElementById("select-category2").value = category_ID
        apply_btn.click()
    }
} else {
    window.onload = function () {
        all_radio.click();
        apply_btn.click();
    }
}

all_radio.onclick = function () {
    if (document.getElementById("service-menu") != null) {
        document.getElementById("service-menu").remove();
    }
    apply_btn.onclick = function () {
        if (context === 2) {
            page = 0
            index = 0
            context = 1
        }
        document.getElementById("title_jumbo2").innerText = "All Services"
        fetch("../Services/?limit=1000")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                dataset = json;
            })
            .then(DataChange)
    }
}
category_radio.onclick = function () {
    category_radio.parentElement.parentElement.append(menu);
    menu.innerHTML = content_menu;
    apply_btn.onclick = function () {
        if (context === 1) {
            page = 0
            index = 0
            context = 2
        }
        var selectedIndex = document.getElementById("select-category2").selectedIndex
        if (selectedIndex > 0) {
            document.getElementById("title_jumbo2").innerHTML = document.getElementById("select-category2")
                .innerText.split("\n")[selectedIndex];
            let momentum = document.getElementById("select-category2").value;
            document.getElementById("select-category2").value = document.getElementById("select-category2")
                .innerText.split("\n")[0];
            document.getElementById("service-menu").remove();

            if (momentum != null) {
                fetch("../Services/Category/" + momentum + "/?limit=1000")
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        dataset = json;
                    })
                    .then(DataChange)
            }
        }
    }
}

function DataChange() {
    refresh()
    fadeIn(document.getElementById("begin-service").parentElement)

    let passed_category;
    let max = Math.min(12, dataset.length - index);

    let newEl = document.createElement("div");
    let currentRow;
    for (let i = index; i < index + max; i++) {
        if (i % 3 === 0) {
            let newRow = document.createElement("div")
            newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                "justify-content-center");
            newEl.appendChild(newRow)
            currentRow = newRow
        }
        let {service_id, name, presentation, image, category} = dataset[i];
        if (context === 2)
            passed_category = category.ID_category

        currentRow.appendChild(fill("assets/" + image.url, name, service_id))
    }

    newEl.firstElementChild.setAttribute("id", "begin-service")
    document.getElementById("begin-service").parentElement.innerHTML = newEl.innerHTML

    if (context === 2) {
        clicks(passed_category, null, dataset.length)
    } else
        clicks(null, dataset.length, null)
}

function fill(image_url, name, service_id) {
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

    return newPiece;
}

function refresh() {
    var el = document.getElementById("begin-service")
    el.innerHTML = "";
    while (el.nextElementSibling) {
        el.nextElementSibling.remove()
    }
}

function clicks(by_category, max_all, max_cat) {
    var list1, list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12;
    var list = document.getElementsByClassName("card");
    var queryString;

    if (isNaN(page))
        page = 0

    list1 = list[0];
    if (list1 != null) {
        let offset = parseInt(page) * 12;
        if (isNaN(offset))
            offset = 0
        list1.onclick = function () {
            var value1 = list1.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list2 = list[1];
    if (list2 != null) {
        let offset = 1 + parseInt(page) * 12;
        list2.onclick = function () {
            var value1 = list2.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list3 = list[2];
    if (list3 != null) {
        let offset = 2 + parseInt(page) * 12;
        list3.onclick = function () {
            var value1 = list3.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list4 = list[3];
    if (list4 != null) {
        let offset = 3 + parseInt(page) * 12;
        list4.onclick = function () {
            var value1 = list4.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list5 = list[4];
    if (list5 != null) {
        let offset = 4 + parseInt(page) * 12;
        list5.onclick = function () {
            var value1 = list5.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list6 = list[5];
    if (list6 != null) {
        let offset = 5 + parseInt(page) * 12;
        list6.onclick = function () {
            var value1 = list6.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list7 = list[6];
    if (list7 != null) {
        let offset = 6 + parseInt(page) * 12;
        list7.onclick = function () {
            var value1 = list7.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list8 = list[7];
    if (list8 != null) {
        let offset = 7 + parseInt(page) * 12;
        list8.onclick = function () {
            var value1 = list8.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list9 = list[8];
    if (list9 != null) {
        let offset = 8 + parseInt(page) * 12;
        list9.onclick = function () {
            var value1 = list9.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list10 = list[9];
    if (list10 != null) {
        let offset = 9 + parseInt(page) * 12;
        list10.onclick = function () {
            var value1 = list10.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list11 = list[10];
    if (list11 != null) {
        let offset = 10 + parseInt(page) * 12;
        list11.onclick = function () {
            var value1 = list11.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }
    list12 = list[11];
    if (list12 != null) {
        let offset = 11 + parseInt(page) * 12;
        list12.onclick = function () {
            var value1 = list12.lastElementChild.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "../all_services/service/" + queryString;
        }
    }

    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("nav-link landmark group-link prev-btn")[0];
    let listen_next = document.getElementsByClassName("nav-link landmark group-link next-btn")[0];

    if (max_cat != null) {

        listen_next.onclick = function () {
            if (parseInt(page) === Math.floor(parseInt(max_cat) / 12)) {
                index = 0
                page = 0
                DataChange()
            } else {
                index += 12
                page += 1
                DataChange()
            }
        }

        listen_prev.onclick = function () {
            if (parseInt(page) === 0) {
                index = Math.floor(parseInt(max_cat) / 12) * 12
                page = Math.floor(parseInt(max_cat) / 12)
                DataChange()
            } else {
                index -= 12
                page -= 1
                DataChange()
            }
        }

    } else {

        listen_next.onclick = function () {
            if (parseInt(page) === Math.floor(parseInt(max_all) / 12)) {
                index = 0
                page = 0
                DataChange()
            } else {
                index += 12
                page += 1
                DataChange()
            }
        }

        listen_prev.onclick = function () {
            if (parseInt(page) === 0) {
                index = Math.floor(parseInt(max_all) / 12) * 12
                page = Math.floor(parseInt(max_all) / 12)
                DataChange()
            } else {
                index -= 12
                page -= 1
                DataChange()
            }
        }
    }
}

// fade out

function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

// fade in

function fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .02) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}