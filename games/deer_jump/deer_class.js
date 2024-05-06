import {canvas_height, ctx} from "./index.js";

"use strict";


export class Deer {
    constructor(y) {
        this.height = 75;
        this.x = 0;
        this.y = y - this.height;
        this.width = 60;
        this.ground_y = y - this.height;
        this.jumping = false;
    }


    Draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
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