"use strict"


// Takes an object literal as an argument.
function show_dialogue() {
    state.dialogue_index = 0;
    const dialogue_container = document.getElementById("dialogue_container");
    const first_dialogue_line = statues_data[state.current_statue]
        .statue_dialogues[state.current_statue]
        .dialogue_lines[0];

    animate_text(first_dialogue_line);
    state.dialogue_index++;

    dialogue_container.classList.toggle("hidden");
}

function animate_text(str) {
    const text_box = document.getElementById("current_text");
    let interval;
    let str_index = 0;
    text_box.textContent = "";

    interval = setInterval(() => {
        if (str[str_index] === undefined) {
            clearInterval(interval);
            return null;
        }

        text_box.textContent += str[str_index];
        str_index++;
    }, 20)
}

function display_dialogue_line(dialogue_index, phase_index, statue_id) {
    const dialogue_container = document.getElementById("dialogue_container");
    let statue_dialogues = statues_data[statue_id].statue_dialogues;
    let current_phase = statue_dialogues[phase_index];
    let dialogue_lines = current_phase.dialogue_lines;


    if (dialogue_lines[dialogue_index] !== undefined) {
        const text_to_write = dialogue_lines[state.dialogue_index];
        animate_text(text_to_write);
        state.dialogue_index++;
        return null;
    }

    if (dialogue_lines[dialogue_index] === undefined) dialogue_container.classList.toggle("hidden");


}

window.onclick = () => trigger_game(statues_data[0]); // Delete this line later on.

function trigger_game(statue_data, height = 50) {
    const current_phase = state.current_phase;
    const dialog = document.getElementById("game_dialog");
    let iframe_src = statue_data.statue_challenges[current_phase].iframe_src;
    dialog.innerHTML = `<iframe src=${iframe_src} width=100% height=100%></iframe>`;
    dialog.showModal();
    dialog.style.height = `${height}%`;

    let closing_interval = setInterval(() => {
        if (localStorage.getItem("close_iframe") !== null && localStorage.getItem("close_iframe") !== undefined) {
            clearInterval(closing_interval);
            localStorage.removeItem("close_iframe");
            dialog.innerHTML = "";
            dialog.close();
        }
    }, 1000)

}

// adolf: {latitude: 55.606749499890064, longitude: 13.000073510709273, color: "red"},
// gass: {latitude: 55.602315039588795, longitude: 12.98734215319501, color: "green"},
// katt: {latitude: 55.60132802122993, longitude: 13.000414613334193, color: "blue"},
// tungsinnet: {latitude: 55.603156508261634, longitude: 13.00720665598558, color: "yellow"},
// frans: {latitude: 55.607391899774534, longitude: 12.99839459721525, color: "orange"},
// radjur: {latitude: 55.60371767788408, longitude: 12.992158258580288, color: "purple"},
