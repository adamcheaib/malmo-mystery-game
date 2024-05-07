import {ctx} from "./index.js";

"use strict";

export class Deer {
    constructor(y) {
        this.height = 100;
        this.x = 10;
        this.y = y - this.height;
        this.width = 80;
        this.ground_y = y - this.height;
        this.jumping = false;
        this.img = document.getElementById("img_deer");
    }


    Draw() {
        ctx.fillStyle = "black";

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    Jump(canvas_height) {
        if (this.y <= canvas_height * 0.4) {
            this.jumping = false;
            return null;
        } else if (this.y === this.ground_y) {
            this.jumping = true;
        }

        if (this.jumping) {
            this.y -= 12;
            requestAnimationFrame(() => this.Jump(canvas_height));
        }
    }

}