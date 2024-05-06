import {Deer} from "./deer_class.js";

"use strict"


const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const canvas_height = window.innerHeight - 10;
const canvas_width = window.innerWidth;

canvas.width = canvas_width;
canvas.height = canvas_height;

const ground_level = canvas.height * .80;
const deer = new Deer(ground_level);

canvas.onclick = () => deer.Jump(canvas_height);

function init_game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    deer.Draw();
    ctx.beginPath();
    ctx.moveTo(0, ground_level);
    ctx.lineTo(canvas.width, ground_level);
    ctx.stroke();

    if (deer.jumping === false && (deer.y + deer.height) !== ground_level) {
        deer.y += 12;
    }
    requestAnimationFrame(init_game);
}

init_game()