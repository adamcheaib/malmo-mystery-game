import {canvas, canvas_height, ctx} from "./index.js";

const colors = ["gray", "brown", "green", "red"];

export class Obstacle {
    constructor(y) {
        this.width = Math.floor(Math.random() * 80 + 30);
        this.height = Math.floor((Math.random() * 50) + 110);
        this.x = canvas.width + this.width + Math.floor(Math.random() * 100);
        this.y = y - this.height;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    Respawn(extra_x = 0) {
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.width = Math.floor(Math.random() * 80 + 50);
        this.x = canvas.width + this.width + Math.floor(Math.random() * 50 + extra_x);
    }

    Draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    Move() {
        this.x -= 10;
    }
}