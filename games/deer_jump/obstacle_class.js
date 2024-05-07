import {canvas, ctx} from "./index.js";

// KOLLA HUR MAN STRETCHAR BILDERNA SÅ ATT DE INTE ÄR SUPER SMALA!!!

const images = [
    "img_stone_1",
    "img_stone_2",
    "img_stump",
];

export class Obstacle {
    constructor(y) {
        this.width = Math.floor(Math.random() * 80 + 10);
        this.height = Math.floor((Math.random() * 50) + 100);
        this.x = canvas.width + this.width + Math.floor(Math.random() * 100);
        this.y = y - this.height;
        this.color = images[Math.floor(Math.random() * images.length)];
        this.img = document.getElementById(images[Math.floor(Math.random() * images.length)]);
    }

    Respawn(extra_x = 0) {
        this.img = document.getElementById(images[Math.floor(Math.random() * images.length)]);
        this.width = Math.floor(Math.random() * 80 + 10);
        this.x = canvas.width + this.width + Math.floor(Math.random() * 50 + extra_x);
    }

    Draw() {
        ctx.fillStyle = this.color;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    Move() {
        this.x -= 10;
    }
}