//this script manages the control of the applier, s.t. it automatically disable button columns not selected
var all_radio = document.getElementById("allRadio1");
var month_radio = document.getElementById("monthRadio1");
var category_radio = document.getElementById("categoryRadio1");
var apply_btn = document.getElementById("apply-btn");
var months = document.getElementById("month-menu");
var content_months = months.innerHTML;
var events = document.getElementById("events-menu");
var content_events = events.innerHTML;

document.getElementById("month-menu").remove();
document.getElementById("events-menu").remove();

all_radio.onclick = function () {
    if (document.getElementById("month-menu") != null) {
        document.getElementById("month-menu").remove();
    }
    if (document.getElementById("events-menu") != null) {
        document.getElementById("events-menu").remove();
    }
    apply_btn.onclick = function () {
        document.getElementById("title_jumbo").innerText = "All Events";
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
            document.getElementById("select-category").value = document.getElementById("select-category").innerText.split("\n")[0];
            document.getElementById("events-menu").remove();
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
            document.getElementById("select-month").value = document.getElementById("select-month").innerText.split("\n")[0];
            document.getElementById("month-menu").remove();
        }
    }
}