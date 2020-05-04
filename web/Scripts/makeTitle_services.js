//this script manages the control of the applier, s.t. it automatically disable button columns not selected
var all_radio = document.getElementById("allRadio2");
var category_radio = document.getElementById("categoryRadio2");
var apply_btn = document.getElementById("apply-btn2");
var menu = document.getElementById("service-menu");
var content_menu = menu.innerHTML;

document.getElementById("service-menu").remove();

all_radio.onclick = function () {
    if (document.getElementById("service-menu") != null) {
        document.getElementById("service-menu").remove();
    }
    apply_btn.onclick = function () {
        document.getElementById("title_jumbo2").innerText = "All Services"
    }
}
category_radio.onclick = function () {
    category_radio.parentElement.parentElement.append(menu);
    menu.innerHTML = content_menu;
    apply_btn.onclick = function () {
        var index = document.getElementById("select-category2").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo2").innerHTML = document.getElementById("select-category2").innerText.split("\n")[index];
            document.getElementById("select-category2").value = document.getElementById("select-category2").innerText.split("\n")[0];
            document.getElementById("service-menu").remove();
        }
    }
}