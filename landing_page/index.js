"use strict"

const hamburger_btn = document.getElementById("hamburger_menu");
const form = document.querySelector("form");
const log_to_reg = document.getElementById("switch_log_reg");

hamburger_btn.onclick = load_phone_menu;
log_to_reg.onclick = toggle_log_reg;
form.onsubmit = submit_func;

function load_phone_menu(event) {
    event.target.style.pointerEvents = "none";
    const container = document.createElement("div");
    const menu_btns_container = document.createElement("div");
    const close_space = document.createElement("div");

    container.id = "hamburger_menu_shown";
    menu_btns_container.id = "menu_btns_container";
    close_space.id = "hamburger_menu_close";

    menu_btns_container.innerHTML = `
        <h3 style="color: white; border-bottom: solid 1px white">Meny</h3>
        <div class="menu_btn">Spela</div>
        <div class="menu_btn">Info</div>
        <div class="menu_btn">Guide</div>`;

    container.appendChild(menu_btns_container);
    container.appendChild(close_space);


    document.body.prepend(container);
    close_space.onclick = () => container.remove();

    setTimeout(() => {
        container.style.left = "50%"
    }, 30);
    setTimeout(() => {
        close_space.style.opacity = "1";
    }, 230);

    setTimeout(() => {
        event.target.style.pointerEvents = "all"
    }, 400);

}


function toggle_log_reg(event) {
    event.preventDefault();
    event.target.classList.toggle("login");
    event.target.classList.toggle("register");

    const btn_submit = document.getElementById("submit");
    const inpt_passwordRepeat = document.getElementById("passwordRepeat");
    const form_title = document.getElementById("form_title");
    const switch_log_reg = document.getElementById("switch_log_reg");
    const form = document.querySelector("form");
    const notification = document.getElementById("notification");

    inpt_passwordRepeat.classList.toggle("hidden");
    notification.textContent = "";

    if (event.target.classList.contains("login")) {
        btn_submit.textContent = "Logga in";
        form_title.textContent = "INLOGGNING";
        switch_log_reg.textContent = "Skapa konto!";
        form.id = "login_form";
    } else {
        btn_submit.textContent = "Registrera"
        form_title.textContent = "REGISTRERING";
        switch_log_reg.textContent = "Klicka för att logga in!";
        form.id = "register_form";
    }
}


// Toggle fetch here when attempting to register or login.
async function submit_func(event) {
    event.preventDefault();
    const notification = document.getElementById("notification");
    const request_body = {};

    // Selects all the input elements that do not have the class "hidden".
    const all_inputs = document.querySelectorAll("input:not(.hidden)");
    all_inputs.forEach(inputField => request_body[inputField.getAttribute("name")] = inputField.value);

    const options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(request_body)
    }

    const response = await fetch("./login_handler.php", options);
    const resource = await response.json();
    notification.textContent = resource.response;

    if (response.ok) {
        notification.className = "success";
        const user_info = resource.user_info;
        if (user_info !== undefined) {


            for (let key in user_info) {
                if (key !== "redirect") {
                    if (typeof user_info[key] === "object") {
                        window.localStorage.setItem(key, JSON.stringify(user_info[key]));
                    } else {
                        window.localStorage.setItem(key, user_info[key]);
                    }

                }
            }

            console.log(window.localStorage);

        }
    } else {
        notification.className = "error";
    }
}