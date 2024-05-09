import {canvas, ctx, ground_level, generate_random_y_pos, canvas_height} from "./index.js";

// KOLLA HUR MAN STRETCHAR BILDERNA SÅ ATT DE INTE ÄR SUPER SMALA!!!

const images = [
    "img_stone_2",
    "img_stump",
];

function generate_random_width(min_width) {
    return min_width + Math.floor(Math.random() * 60);
}


export class Obstacle {
    ada

    constructor() {
        this.y = 400;
        this.x = canvas.width + 500;
        this.width = 65;  // Subject to change. Make this dynamic.
        this.height = 400; // Subject to change. Make this dynamic.
        this.img = document.getElementById(images[Math.floor(Math.random() * images.length)]);
    }


    Update_y_coord() {
        this.y = Math.floor(Math.random() * 100 + 375);
    }

    Respawn() {
        let random_image = images[Math.floor(Math.random() * images.length)];
        this.img = document.getElementById(random_image);
        this.x = canvas.width + 200 + Math.floor(Math.random() * 400); // Moves the obstacle back far back just to generate randomly.
        this.Update_y_coord();
    }

    Draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    Move(speed) {
        this.x -= speed;
    }
}
