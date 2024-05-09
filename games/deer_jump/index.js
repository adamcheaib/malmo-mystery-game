import {Deer} from "./deer_class.js";
import {Obstacle} from "./obstacle_class.js";

"use strict"

export function generate_random_y_pos() {
    return Math.floor(Math.random() * 50 + 100);
}

let lives = 5;

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const canvas_height = window.innerHeight - 10;
const canvas_width = window.innerWidth;

canvas.width = canvas_width;
canvas.height = canvas_height;

export const ground_level = canvas.height * .7;
console.log(ground_level)
const deer = new Deer(ground_level);
const obstacle = new Obstacle();
let velocity = 1;
let game_speed = 7;


canvas.ontouchstart = () => {
    canvas.style.pointerEvents = "none";
    setTimeout(() => canvas.style.pointerEvents = "all", 650); // This is to control so that the player cannot spam the jump button.
    deer.Jump();
};

// Default function.
function init_game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(0, ground_level + deer.height - 5);
    ctx.lineTo(canvas.width, ground_level + deer.height - 5);
    ctx.stroke();
    deer.Draw();

    // DEER SECTION START!
    // Controls whether the deer is jumping or not.
    if (deer.jumping) {
        deer.y -= 5 + velocity;
        velocity++; // Velocity is incremented to simulate jump speed.
    }

    // Sets the jump limit.
    if (deer.y <= 200) {
        deer.jumping = false;
        velocity = 1;
    }


    if (deer.jumping === false && deer.y !== ground_level) {
        if (deer.y >= ground_level) deer.y = ground_level; // Makes sure the deer is always on ground level.
        deer.y += 5 + velocity;
        velocity += 2; // Velocity is incremented to simulate fall speed.

        if (deer.y > ground_level) {
            deer.y = ground_level; // To make sure the deer lands on the ground.
            velocity = 1; // Resets the velocity to default value.
        }
    }
    // DEER SECTION END!

    // OBSTACLE SECTION START!
    obstacle.Draw();
    obstacle.Move(game_speed);
    if (obstacle.x < -150) obstacle.Respawn();

    // OBSTACLE SECTION END


    // Collision code block.
if (deer.x + deer.width - 20 >= obstacle.x &&
    obstacle.x + obstacle.width - 15 >= deer.x &&
    deer.y + deer.height - 25 >= obstacle.y &&
    obstacle.y + obstacle.height - 20 >= deer.y) {
    obstacle.Respawn();
    lives--;
    document.getElementById("lives").textContent = lives;

    if (lives < 0) {
        cancelAnimationFrame(init_game);
        document.body.innerHTML = "<h1>Du har förlorat!</h1>";
        return null;
    }
}

    requestAnimationFrame(init_game);
}

init_game();