var people_queryString = decodeURIComponent(window.location.search);
people_queryString = people_queryString.substring(1);

var queries = people_queryString.split("&");

let page
let role_ID = null

let context = 1;

if (queries[0] != null) {
    page = queries[0].split("=")[1];

    if (queries[1] != null)
        role_ID = queries[1].split("=")[1];
} else page = 0

window.history.pushState({}, document.title, "../all_people");

function evaluate_offset() {
    let offset_page;
    if (isNaN(parseInt(page) * 12))
        offset_page = 0
    else offset_page = parseInt(page) * 12
    return offset_page
}


/**
 * This script manages the Introductory Page of "People" filling the content of the list depending on the choice of the user
 * @type {HTMLElement}
 */

var all_radio = document.getElementById("allRadio3");
var role_radio = document.getElementById("categoryRadio3");
var apply_btn = document.getElementById("apply-btn3");
var menu = document.getElementById("people-menu");
var content_menu = menu.innerHTML;

if (role_ID != null) {
    window.onload = function () {
        role_radio.click()
        document.getElementById("select-category3").value = role_ID
        apply_btn.click()
    }
} else {
    window.onload = function () {
        all_radio.click();
        apply_btn.click();
    }
}


all_radio.onclick = function () {
    if (document.getElementById("people-menu") != null) {
        document.getElementById("people-menu").remove();
    }
    apply_btn.onclick = function () {
        let offset_page = evaluate_offset();
        let max_all_people;
        if (context === 2) {
            page = 0
            context = 1
        }
        document.getElementById("title_jumbo3").innerText = "All People";
        fetch("../People/?limit=1000")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                max_all_people = json.length
            })
            .then(function () {
                fetch("../People/" + "?offset=" + offset_page)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        console.log(json)
                        refresh()
                        fadeIn(document.getElementById("begin-people").parentElement)
                        var begin = document.getElementById("begin-people")
                        for (let i = 0; i < json.length; i++) {
                            if (i % 3 === 0 && i > 0) {
                                let newRow = document.createElement("div")
                                newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                                    "justify-content-center");
                                begin.parentElement.appendChild(newRow)
                                begin = begin.nextElementSibling
                            }
                            let {ID_person, name, surname, description, phone_number, email, URI_image, role} = json[i];
                            begin.appendChild(fill(URI_image, name + " " + surname, ID_person))
                        }
                    })
                    .then(() => clicks(null, max_all_people, null))
            })
    }
}
role_radio.onclick = function () {
    let max_role_el;
    role_radio.parentElement.parentElement.append(menu);
    menu.innerHTML = content_menu;
    apply_btn.onclick = function () {
        let offset_page = evaluate_offset();
        if (context === 1) {
            page = 0
            context = 2
        }
        var index = document.getElementById("select-category3").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo3").innerHTML = document.getElementById("select-category3").innerText.split("\n")[index];
            let momentum = document.getElementById("select-category3").value;
            document.getElementById("select-category3").value = document.getElementById("select-category3").innerText.split("\n")[0];
            document.getElementById("people-menu").remove();

            if (momentum != null) {
                fetch("../People/Roles/" + momentum + "/?limit=1000")
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        max_role_el = json.length;
                    })
                    .then(function () {
                        fetch("../People/Roles/" + momentum + "?offset=" + offset_page)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (json) {
                                console.log(json)
                                refresh()
                                fadeIn(document.getElementById("begin-people").parentElement)
                                var role_passed = null;
                                var begin = document.getElementById("begin-people")
                                for (let i = 0; i < json.length; i++) {
                                    if (i % 3 === 0 && i > 0) {
                                        let newRow = document.createElement("div")
                                        newRow.setAttribute("class", "d-flex flex-row bd-highlight mb-3 " +
                                            "justify-content-center");
                                        begin.parentElement.appendChild(newRow)
                                        begin = begin.nextElementSibling
                                    }
                                    let {ID_person, name, surname, description, phone_number, email, URI_image, role} = json[i];
                                    role_passed = role.ID_role;
                                    begin.appendChild(fill(URI_image, name + " " + surname, ID_person))
                                }
                                return role_passed
                            })
                            .then(function (role) {
                                clicks(role, null, max_role_el)
                            })
                    })
            }
        }
    }
}

function fill(image_url, name, person_id) {
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
    newA.setAttribute("id", "person-" + person_id)
    newA.innerText = name;

    newPiece_in_div.appendChild(newA);
    newPiece_in.appendChild(newPiece_in_im);
    newPiece_in.appendChild(newPiece_in_div);
    newPiece.appendChild(newPiece_in);

    return newPiece;
}

function refresh() {
    var el = document.getElementById("begin-people")
    el.innerHTML = "";
    while (el.nextElementSibling) {
        el.nextElementSibling.remove()
    }
}

function clicks(by_role, max_all, max_cat) {
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
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list2 = list[1];
    if (list2 != null) {
        let offset = 1 + parseInt(page) * 12;
        list2.onclick = function () {
            var value1 = list2.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list3 = list[2];
    if (list3 != null) {
        let offset = 2 + parseInt(page) * 12;
        list3.onclick = function () {
            var value1 = list3.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list4 = list[3];
    if (list4 != null) {
        let offset = 3 + parseInt(page) * 12;
        list4.onclick = function () {
            var value1 = list4.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list5 = list[4];
    if (list5 != null) {
        let offset = 4 + parseInt(page) * 12;
        list5.onclick = function () {
            var value1 = list5.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list6 = list[5];
    if (list6 != null) {
        let offset = 5 + parseInt(page) * 12;
        list6.onclick = function () {
            var value1 = list6.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list7 = list[6];
    if (list7 != null) {
        let offset = 6 + parseInt(page) * 12;
        list7.onclick = function () {
            var value1 = list7.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list8 = list[7];
    if (list8 != null) {
        let offset = 7 + parseInt(page) * 12;
        list8.onclick = function () {
            var value1 = list8.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list9 = list[8];
    if (list9 != null) {
        let offset = 8 + parseInt(page) * 12;
        list9.onclick = function () {
            var value1 = list9.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list10 = list[9];
    if (list10 != null) {
        let offset = 9 + parseInt(page) * 12;
        list10.onclick = function () {
            var value1 = list10.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list11 = list[10];
    if (list11 != null) {
        let offset = 10 + parseInt(page) * 12;
        list11.onclick = function () {
            var value1 = list11.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }
    list12 = list[11];
    if (list12 != null) {
        let offset = 11 + parseInt(page) * 12;
        list12.onclick = function () {
            var value1 = list12.firstElementChild.getAttribute("id").split("-")[1];
            if (by_role != null) {
                queryString = "?offset=" + offset + "&id_person=" + value1 + "&role=" + by_role + ":" + max_cat;
            } else {
                queryString = "?offset=" + offset + "&id_person=" + value1 + ":" + max_all;
            }

            window.location.href = "person/" + queryString;
        }
    }

    // Group Navigation clicks
    let listen_prev = document.getElementsByClassName("nav-link landmark group-link prev-btn")[0];
    let listen_next = document.getElementsByClassName("nav-link landmark group-link next-btn")[0];
    let next, prev;

    console.log(max_all + " " + max_cat)

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
            let newQuery = "?page=" + next + "&id_role=" + by_role

            window.location.href = "../all_people" + newQuery;
        }
        listen_prev.onclick = function () {
            let newQuery = "?page=" + prev + "&id_role=" + by_role
            window.location.href = "../all_people" + newQuery;
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
            window.location.href = "../all_people/" + newQuery;
        }
        listen_prev.onclick = function () {
            let newQuery = "?page=" + prev
            window.location.href = "../all_people/" + newQuery;
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