import {Deer} from "./deer_class.js";
import {Obstacle} from "./obstacle_class.js";

"use strict"

let lives = 5;

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const canvas_height = window.innerHeight - 10;
const canvas_width = window.innerWidth;
const jumping_sound = document.getElementById("jumping_sound");

canvas.width = canvas_width;
canvas.height = canvas_height;

const ground_level = canvas.height * .80;
const deer = new Deer(ground_level);
const obstacle = new Obstacle(ground_level);


canvas.ontouchstart = () => {
    canvas.style.pointerEvents = "none";
    setTimeout(() => canvas.style.pointerEvents = "all", 300); // This is to control so that the player cannot spam the jump button.
    deer.Jump(canvas_height);
    jumping_sound.play();
};

function init_game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    obstacle.Draw();
    obstacle.Move();
    deer.Draw();
    ctx.beginPath();
    ctx.moveTo(0, ground_level);
    ctx.lineTo(canvas.width, ground_level);
    ctx.stroke();

    if (deer.jumping === false && (deer.y + deer.height) !== ground_level) {
        deer.y += 12;
    }

    if (obstacle.x < -125) obstacle.Respawn();

    if (deer.x + deer.width - 20 >= obstacle.x &&
        obstacle.x + obstacle.width - 15 >= deer.x &&
        deer.y + deer.height - 25 >= obstacle.y &&
        obstacle.y + obstacle.height - 20 >= deer.y) {
        lives--;

        if (lives < 0) {
            cancelAnimationFrame(init_game);
            document.body.innerHTML = "<h1>Du har förlorat! Försök igen!</h1>";
            return null;
        }

        document.querySelector("span").textContent = lives;
        obstacle.Respawn(50);


    }
    requestAnimationFrame(init_game);
}

init_game();