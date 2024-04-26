"use strict"

const hamburger_btn = document.getElementById("hamburger_menu");

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

hamburger_btn.onclick = load_phone_menu;

function render_play_page() {

}

