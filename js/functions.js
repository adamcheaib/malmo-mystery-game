import {all_statues_data} from "../data/data.js";
import {game_progress} from "../index.js";

"use strict"

export function show_dialogue() {
    game_progress.dialogue_index = 0;
    const dialogue_container = document.getElementById("dialogue_container");
    const first_dialogue_line = all_statues_data[game_progress.current_statue]
        .statue_dialogues[game_progress.current_phase]
        .dialogue_lines[0];

    animate_text(first_dialogue_line);
    game_progress.dialogue_index++;

    dialogue_container.classList.toggle("hidden");
}

function animate_text(str) {
    const text_box = document.getElementById("current_text");
    const next_text_btn = document.getElementById("next_text");
    next_text_btn.style.pointerEvents = "none";
    let interval;
    let str_index = 0;
    text_box.textContent = "";

    interval = setInterval(() => {
        if (str[str_index] === undefined) { // Ends the interval for the text animation.
            next_text_btn.style.pointerEvents = "all";
            clearInterval(interval);
            return null;
        }

        text_box.textContent += str[str_index];
        str_index++;
    }, 20)
}

export function display_dialogue_line(dialogue_index, phase_index, statue_id) {
    const dialogue_container = document.getElementById("dialogue_container");
    let statue_dialogues = all_statues_data[statue_id].statue_dialogues;
    let current_phase = statue_dialogues[phase_index];
    let dialogue_lines = current_phase.dialogue_lines;


    if (dialogue_lines[dialogue_index] !== undefined) {
        const text_to_write = dialogue_lines[game_progress.dialogue_index];
        animate_text(text_to_write);
        game_progress.dialogue_index++;
        return null;
    }

    if (dialogue_lines[dialogue_index] === undefined) {
        dialogue_container.classList.toggle("hidden");

        if (current_phase.challenge_attached) {
            if (current_phase.fullSize !== false) trigger_game(all_statues_data[game_progress.current_statue], 100);
            else trigger_game(all_statues_data[game_progress.current_statue])// The value of challange_attached
        }
    }
}

async function trigger_game(statue_data, height = 50) {
    const current_phase = game_progress.current_phase;
    const dialog_container = document.getElementById("dialog_modal_container");
    const dialog = document.getElementById("game_dialog");
    let iframe_src = statue_data.statue_challenges[current_phase].iframe_src;

    dialog.innerHTML = `<iframe src=${iframe_src} width=100% height=100%></iframe>`;
    dialog_container.className = "";
    dialog.showModal();
    dialog.style.height = `${height}%`;

    let closing_interval = setInterval(() => {
        if (localStorage.getItem("close_iframe") !== null && localStorage.getItem("close_iframe") !== undefined) {
            console.log(window.localStorage);
            clearInterval(closing_interval);
            localStorage.removeItem("close_iframe");

            if (window.localStorage.getItem("completed") !== null || window.localStorage.getItem("completed") !== undefined) {
                game_progress.current_phase++;
                if (current_phase === 2) { // The 2 indicates the total amount of challenges each statue has.
                    game_progress.cleared_statues.push(game_progress.current_statue);
                    game_progress.current_phase = 0;
                    game_progress.current_statue = null;

                    if (game_progress.cleared_statues.length === 6) {
                        alert("YOU HAVE FINISHED THE FUCKING GAME");
                    }
                }

                const body = {
                    user_id: localStorage.getItem("user_id"),
                    game_progress: game_progress
                };

                const options = {
                    method: "PATCH",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body)
                }

                const request = new Request("./landing_page/game_data.php", options);
                update_game_progress(request);
            }

            localStorage.removeItem("completed");
            dialog.innerHTML = "";
            dialog_container.className = "hidden";
            dialog.close();
        }
    }, 2000)
}


async function update_game_progress(request) {
    try {
        const response = await fetch(request);
        const resource = await response.json();

        if (response.ok) {
            localStorage.setItem("game_progress", JSON.stringify(game_progress));
        } else {
            alert(resource.response);
        }

    } catch (e) {
        console.log("Ooops... something went wrong!");
        update_game_progress(request);
    }
}