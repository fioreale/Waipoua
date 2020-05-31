let name = document.getElementById("validationServer01")
let surname = document.getElementById("validationServer02")
let mail = document.getElementById("validationServerMail")
let subject = document.getElementById("validationServerSubject")
let text = document.getElementById("validationTextarea")

let submit = document.getElementsByClassName("btn btn-primary")[0]

window.onload = function () {
    refresh()
}

submit.onclick = function () {
    let ok = true

    document.getElementsByClassName("begin-form")[0].removeAttribute("novalidate")

    let name_text = name.value
    if (checkName(name_text)) {
        name.setAttribute("class", "form-control is-valid")
    } else {
        name.value = ""
        name.setAttribute("class", "form-control is-invalid")
        ok = false
    }

    let last_text = surname.value
    if (checkName(last_text)) {
        surname.setAttribute("class", "form-control is-valid")
    } else {
        surname.value = ""
        surname.setAttribute("class", "form-control is-invalid")
        ok = false
    }

    let mail_text = mail.value
    if (checkMail(mail_text)) {
        mail.setAttribute("class", "form-control is-valid")
    } else {
        mail.value = ""
        mail.setAttribute("class", "form-control is-invalid")
        ok = false
    }

    let subject_text = subject.value
    if (subject_text.length > 0) {
        subject.setAttribute("class", "form-control is-valid")
    } else {
        subject.value = ""
        subject.setAttribute("class", "form-control is-invalid")
        ok = false
    }

    let textarea = text.value
    if (textarea.length > 0) {
        text.setAttribute("class", "form-control is-valid")
    } else {
        text.value = ""
        text.setAttribute("class", "form-control is-invalid")
        ok = false
    }

    submit.nextElementSibling.innerHTML = ""

    if (!ok) {
        let newAlert = document.createElement("div")
        newAlert.setAttribute("class", "alert alert-danger")
        newAlert.setAttribute("role", "alert")
        newAlert.innerText = "Missed some requirement in insertion"
        submit.nextElementSibling.appendChild(newAlert)
    } else {
        let newAlert = document.createElement("div")
        newAlert.setAttribute("class", "alert alert-success")
        newAlert.setAttribute("role", "alert")
        newAlert.innerText = "Your message is been sent correctly!"
        submit.nextElementSibling.appendChild(newAlert)
        postSubmit()
    }

}

function checkName(text) {
    let letters = /^[a-zA-Z]+$/
    if (text.match(letters)) {
        return true
    }
    return false
}

function checkMail(text) {
    if (text.includes("@")) {
        let first = text.split("@")[0]
        let second = text.split("@")[1]

        if (!(first.includes(" "))) {
            if (!(second.includes(" "))) {
                if (second.includes(".")) {
                    let add1 = second.split(".")[0]
                    let add2 = second.split(".")[1]
                    if (checkName(add1) && checkName(add2))
                        return true
                }
            }
        }
    }
    return false
}

function refresh() {
    name.value = ""
    name.setAttribute("class", "form-control")
    surname.value = ""
    surname.setAttribute("class", "form-control")
    mail.value = ""
    mail.setAttribute("class", "form-control")
    subject.value = ""
    subject.setAttribute("class", "form-control")
    text.value = ""
    text.setAttribute("class", "form-control")
}

function postSubmit() {
    name.value = ""
    name.setAttribute("class", "form-control")
    surname.value = ""
    surname.setAttribute("class", "form-control")
    mail.value = ""
    mail.setAttribute("class", "form-control")
    subject.value = ""
    subject.setAttribute("class", "form-control")
    text.value = ""
    text.setAttribute("class", "form-control")
    document.getElementsByClassName("begin-form")[0].setAttribute("novalidate","")
}