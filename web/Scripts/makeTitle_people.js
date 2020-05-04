//this script manages the control of the applier, s.t. it automatically disable button columns not selected
var all_radio = document.getElementById("allRadio3");
var role_radio = document.getElementById("categoryRadio3");
var apply_btn = document.getElementById("apply-btn3");
all_radio.onclick = function () {
    apply_btn.onclick = function () {
        document.getElementById("title_jumbo3").innerText = "All People"
    }
}
role_radio.onclick = function () {
    apply_btn.onclick = function () {
        var index = document.getElementById("select-category3").selectedIndex
        if (index > 0) {
            document.getElementById("title_jumbo3").innerHTML = document.getElementById("select-category3").innerText.split("\n")[index];
            document.getElementById("select-category3").value = document.getElementById("select-category3").innerText.split("\n")[0];
        }
    }
}