var services_queryString = decodeURIComponent(window.location.search);
services_queryString = services_queryString.substring(1);
var category_ID = services_queryString.split("=")[1];
console.log("passed category id" + category_ID)

/**
 * This script file manages manages the Introductory Page of "Services" filling the content of the list depending on the choice of the user
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
        document.getElementById("title_jumbo2").innerText = "All Services"

        fetch("../Services")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log(json)
                refresh()
                var begin;
                for (let i = 0; i < json.length; i++) {
                    if (i % 3 === 0 && i > 2) {
                        begin.append(
                            document.createElement("div")
                                .setAttribute("class", "d-flex flex-row bd-highlight mb-3 justify-content-center")
                        )
                    } else if (i === 0) {
                        begin = document.getElementById("begin-service")
                    }
                    let {ID_service, service_name, service_presentation, URI_image} = json[i];
                    if (i >= 0 && i <= 2)
                        begin.appendChild(fill(URI_image, service_name, ID_service))
                    if (i >= 3 && i <= 5)
                        begin
                            .nextElementSibling.appendChild(fill(URI_image, service_name, ID_service))
                    if (i >= 6 && i <= 8)
                        begin
                            .nextElementSibling.nextElementSibling
                            .appendChild(fill(URI_image, service_name, ID_service))
                    if (i >= 9 && i <= 11)
                        begin
                            .nextElementSibling.nextElementSibling.nextElementSibling
                            .appendChild(fill(URI_image, service_name, ID_service))
                }
            })
            .then(() => clicks(null))
    }
}
category_radio.onclick = function () {
    category_radio.parentElement.parentElement.append(menu);
    menu.innerHTML = content_menu;
    apply_btn.onclick = function () {
        var index = document.getElementById("select-category2").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo2").innerHTML = document.getElementById("select-category2").innerText.split("\n")[index];
            let momentum = document.getElementById("select-category2").value;
            console.log("categoria" + momentum)
            document.getElementById("select-category2").value = document.getElementById("select-category2").innerText.split("\n")[0];
            document.getElementById("service-menu").remove();

            if (momentum != null) {
                fetch("../Services/Category/" + momentum)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        console.log(json)
                        refresh()
                        var begin;
                        var category_passed = null;
                        for (let i = 0; i < json.length; i++) {
                            if (i % 3 === 0 && i > 2) {
                                begin.append(
                                    document.createElement("div")
                                        .setAttribute("class", "d-flex flex-row bd-highlight mb-3 justify-content-center")
                                )
                            } else if (i === 0) {
                                begin = document.getElementById("begin-service")
                            }
                            let {ID_service, service_name, service_presentation, URI_image, category} = json[i];
                            category_passed = category.category_name
                            console.log("category passed:" + category_passed)
                            if (i >= 0 && i <= 2)
                                begin.appendChild(fill(URI_image, service_name, ID_service))
                            if (i >= 3 && i <= 5)
                                begin
                                    .nextElementSibling.appendChild(fill(URI_image, service_name, ID_service))
                            if (i >= 6 && i <= 8)
                                begin
                                    .nextElementSibling.nextElementSibling
                                    .appendChild(fill(URI_image, service_name, ID_service))
                            if (i >= 9 && i <= 11)
                                begin
                                    .nextElementSibling.nextElementSibling.nextElementSibling
                                    .appendChild(fill(URI_image, service_name, ID_service))
                        }
                        return category_passed
                    })
                    .then(function (category) {
                        clicks(category)
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
}

function clicks(by_category) {
    var list1, list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12;
    var list = document.getElementsByClassName("card-body");
    var queryString;

    list1 = list[0];
    if (list1 != null) {
        list1.onclick = function () {
            var value1 = list1.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }

            window.location.href = "service" + queryString;
        }
    }
    list2 = list[1];
    if (list2 != null) {
        list2.onclick = function () {
            var value1 = list2.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }

            window.location.href = "service" + queryString;
        }
    }
    list3 = list[2];
    if (list3 != null) {
        list3.onclick = function () {
            var value1 = list3.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }

            window.location.href = "service" + queryString;
        }
    }
    list4 = list[3];
    if (list4 != null) {
        list4.onclick = function () {
            var value1 = list4.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list5 = list[4];
    if (list5 != null) {
        list5.onclick = function () {
            var value1 = list5.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list6 = list[5];
    if (list6 != null) {
        list6.onclick = function () {
            var value1 = list6.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list7 = list[6];
    if (list7 != null) {
        list7.onclick = function () {
            var value1 = list7.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list8 = list[7];
    if (list8 != null) {
        list8.onclick = function () {
            var value1 = list8.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list9 = list[8];
    if (list9 != null) {
        list9.onclick = function () {
            var value1 = list9.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list10 = list[9];
    if (list10 != null) {
        list10.onclick = function () {
            var value1 = list10.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list11 = list[10];
    if (list11 != null) {
        list11.onclick = function () {
            var value1 = list11.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
    list12 = list[11];
    if (list12 != null) {
        list12.onclick = function () {
            var value1 = list12.firstElementChild.getAttribute("id").split("-")[1];
            if (by_category != null) {
                queryString = "?id_service=" + value1 + "&category=" + by_category;
            } else {
                queryString = "?id_service=" + value1;
            }
            window.location.href = "service" + queryString;
        }
    }
}