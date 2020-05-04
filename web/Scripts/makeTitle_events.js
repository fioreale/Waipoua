//this script manages the control of the applier, s.t. it automatically disable button columns not selected
var all_radio = document.getElementById("allRadio1");
var category_radio = document.getElementById("categoryRadio1");
var apply_btn = document.getElementById("apply-btn");
all_radio.onclick = function () {
    apply_btn.onclick = function () {
        document.getElementById("title_jumbo").innerText = "All Events"
    }
}
category_radio.onclick = function () {
    apply_btn.onclick = function () {
        var index = document.getElementById("select-category").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo").innerHTML = document.getElementById("select-category").innerText.split("\n")[index];
            document.getElementById("select-category").value = document.getElementById("select-category").innerText.split("\n")[0];
        }
    }
}