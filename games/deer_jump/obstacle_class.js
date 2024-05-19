import {canvas, ctx, ground_level, deer_ground_level, generate_random_y_pos, canvas_height} from "./index.js";

// KOLLA HUR MAN STRETCHAR BILDERNA SÅ ATT DE INTE ÄR SUPER SMALA!!!

const images = [
    "img_stone_2",
    "img_stone_1",
];

export class Obstacle {

    constructor() {
        this.y = 400;
        this.x = canvas.width + 500;
        this.width = 65;  // Subject to change. Make this dynamic.
        this.height = deer_ground_level - this.y; // Subject to change. Make this dynamic.
        this.img = document.getElementById(images[Math.floor(Math.random() * images.length)]);
        this.increasing = false;
    }


    Update_y_coords() {
        this.y = Math.floor(Math.random() * 100 + 375);
        this.height = deer_ground_level - this.y;
    }

    Respawn(distance = 0) {
        let random_image = images[Math.floor(Math.random() * images.length)];
        this.img = document.getElementById(random_image);
        this.x = canvas.width + Math.floor(Math.random() * 50 + distance); // Moves the obstacle back far back just to generate randomly.
        this.Update_y_coords();
    }

    Draw() {
        if (this.increasing !== true) ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    Move(speed) {
        this.x -= speed;
    }
}
