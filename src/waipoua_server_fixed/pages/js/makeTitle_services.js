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

function evaluate_offset() {
    let offset_page;
    if (isNaN(parseInt(page) * 12))
        offset_page = 0
    else offset_page = parseInt(page) * 12
    return offset_page
}


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
        let offset_page = evaluate_offset();
        let max_all_services;
        if (context === 2) {
            page = 0
            context = 1
        }
        document.getElementById("title_jumbo2").innerText = "All Services"
        fetch("../Services/?limit=1000")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                max_all_services = json.length
            })
            .then(function () {
                fetch("../Services/" + "?offset=" + offset_page)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        console.log(json)
                        refresh()
                        var begin = document.getElementById("begin-service")
                        for (let i = 0; i < json.length; i++) {
                            if (i % 3 === 0 && i > 0) {
                                let newRow = document.createElement("div")
                                newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                                    "justify-content-center");
                                begin.parentElement.appendChild(newRow)
                                begin = begin.nextElementSibling
                            }
                            let {ID_service, service_name, service_presentation, URI_image} = json[i];
                            begin.appendChild(fill(URI_image, service_name, ID_service))
                        }
                    })
                    .then(() => clicks(null, max_all_services, null))
            })
    }
}
category_radio.onclick = function () {
    let max_category_el;
    category_radio.parentElement.parentElement.append(menu);
    menu.innerHTML = content_menu;
    apply_btn.onclick = function () {
        if (context === 1) {
            page = 0
            context = 2
        }
        let offset_page = evaluate_offset();
        var index = document.getElementById("select-category2").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo2").innerHTML = document.getElementById("select-category2").innerText.split("\n")[index];
            let momentum = document.getElementById("select-category2").value;
            document.getElementById("select-category2").value = document.getElementById("select-category2").innerText.split("\n")[0];
            document.getElementById("service-menu").remove();

            if (momentum != null) {
                fetch("../Services/Category/" + momentum + "/?limit=1000")
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        max_category_el = json.length;
                    })
                    .then(function () {
                        fetch("../Services/Category/" + momentum + "?offset=" + offset_page)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (json) {
                                console.log(json)
                                refresh()
                                var category_passed = null;
                                var begin = document.getElementById("begin-service")
                                for (let i = 0; i < json.length; i++) {
                                    if (i % 3 === 0 && i > 0) {
                                        let newRow = document.createElement("div")
                                        newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                                            "justify-content-center");
                                        begin.parentElement.appendChild(newRow)
                                        begin = begin.nextElementSibling
                                    }
                                    let {ID_service, service_name, service_presentation, URI_image, category} = json[i];
                                    category_passed = category.ID_category
                                    begin.appendChild(fill(URI_image, service_name, ID_service))
                                }
                                return category_passed
                            })
                            .then(function (category) {
                                clicks(category, null, max_category_el)
                            })
                    })
            }
        }
    }
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
    var list = document.getElementsByClassName("card-body");
    var queryString;

    if (isNaN(page))
        page = 0

    list1 = list[0];
    if (list1 != null) {
        let offset = parseInt(page) * 12;
        if (isNaN(offset))
            offset = 0
        list1.onclick = function () {
            var value1 = list1.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list2 = list[1];
    if (list2 != null) {
        let offset = 1 + parseInt(page) * 12;
        list2.onclick = function () {
            var value1 = list2.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list3 = list[2];
    if (list3 != null) {
        let offset = 2 + parseInt(page) * 12;
        list3.onclick = function () {
            var value1 = list3.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list4 = list[3];
    if (list4 != null) {
        let offset = 3 + parseInt(page) * 12;
        list4.onclick = function () {
            var value1 = list4.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list5 = list[4];
    if (list5 != null) {
        let offset = 4 + parseInt(page) * 12;
        list5.onclick = function () {
            var value1 = list5.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list6 = list[5];
    if (list6 != null) {
        let offset = 5 + parseInt(page) * 12;
        list6.onclick = function () {
            var value1 = list6.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list7 = list[6];
    if (list7 != null) {
        let offset = 6 + parseInt(page) * 12;
        list7.onclick = function () {
            var value1 = list7.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list8 = list[7];
    if (list8 != null) {
        let offset = 7 + parseInt(page) * 12;
        list8.onclick = function () {
            var value1 = list8.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list9 = list[8];
    if (list9 != null) {
        let offset = 8 + parseInt(page) * 12;
        list9.onclick = function () {
            var value1 = list9.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list10 = list[9];
    if (list10 != null) {
        let offset = 9 + parseInt(page) * 12;
        list10.onclick = function () {
            var value1 = list10.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list11 = list[10];
    if (list11 != null) {
        let offset = 10 + parseInt(page) * 12;
        list11.onclick = function () {
            var value1 = list11.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }
    list12 = list[11];
    if (list12 != null) {
        let offset = 11 + parseInt(page) * 12;
        list12.onclick = function () {
            var value1 = list12.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?offset=" + offset + "&id_service=" + value1 + "&category=" + by_category + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_service=" + value1 + ":" + max_all;
            }

            window.location.href = "service/" + queryString;
        }
    }

    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("prev-btn footer")[0];
    let listen_next = document.getElementsByClassName("next-btn")[0];
    let next, prev;

    if (max_cat != null) {

        if (parseInt(page) === Math.floor(parseInt(max_cat) / 12))
            next = 0
        else next = (Math.floor(parseInt(page) + 1)).toString()

        if (parseInt(page) === 0) {
            prev = Math.floor(parseInt(max_cat) / 12).toString()
        } else prev = (Math.floor(parseInt(page) - 1)).toString()

        if (isNaN(next))
            next = 0
        if (isNaN(prev))
            prev = 0

        listen_next.onclick = function () {
            let newQuery = "?page=" + next + "&id_category" + by_category
            window.location.href = "../all_services/" + newQuery;
        }
        listen_prev.onclick = function () {
            let newQuery = "?page=" + prev + "&id_category" + by_category
            window.location.href = "../all_services/" + newQuery;
        }
    } else {

        if (parseInt(page) === Math.floor(parseInt(max_all) / 12))
            next = 0
        else next = (Math.floor(parseInt(page) + 1)).toString()

        if (parseInt(page) === 0) {
            prev = Math.floor(parseInt(max_all) / 12).toString()
        } else prev = (Math.floor(parseInt(page) - 1)).toString()

        if (isNaN(next))
            next = 0
        if (isNaN(prev))
            prev = 0

        listen_next.onclick = function () {
            let newQuery = "?page=" + next
            window.location.href = "../all_services/" + newQuery;
        }
        listen_prev.onclick = function () {
            let newQuery = "?page=" + prev
            window.location.href = "../all_services/" + newQuery;
        }
    }
}