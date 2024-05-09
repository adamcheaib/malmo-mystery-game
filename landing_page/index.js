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

    inpt_passwordRepeat.classList.toggle("hidden");

    if (event.target.classList.contains("login")) {
        btn_submit.textContent = "Logga in";
        form_title.textContent = "INLOGGNING";
        switch_log_reg.textContent = "Skapa konto!";
    } else {
        btn_submit.textContent = "Registrera"
        form_title.textContent = "REGISTRERING";
        switch_log_reg.textContent = "Klicka för att logga in!";

    }
}


// Toggle fetch here when attempting to register or login.
function submit_func(event) {
    event.preventDefault();
    const notification = document.getElementById("notification");
    notification.textContent = "Ditt konto har skapats!";
    notification.className = "success";
}

async function fetch_attempt() {
    try {
        const body = {
            user_id: 3,
            game_progress: {
                cleared_statues: [1, 2],
                current_statue: 0,
                current_phase: 0,
                dialogue_index: 0
            },
        };

        const options = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        };

        const response = await fetch("./game_data.php", options);

        if (response.ok) {
            const resource = await response.json();
            console.log(resource);
            // window.localStorage.setItem("username", resource.username);
            // window.localStorage.setItem("game_progress", JSON.stringify(resource.game_progress));
            // window.localStorage.setItem("user_id", resource.user_id);
            // window.location.href = resource.redirect;
        }

    } catch (error) {
        alert(error.message);
    }
}

// fetch_attempt();