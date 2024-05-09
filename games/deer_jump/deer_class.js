import {ctx, ground_level} from "./index.js";

"use strict";

export class Deer {
    constructor(ground_y) {
        this.x = 0;
        this.y = ground_y;
        this.width = 65; // Subject to change.
        this.height = 75; // Subject to change.
        this.img = document.getElementById("img_deer");
        this.jumping = false;
    }


    Draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    Jump() {
        if (this.y <= ground_level) this.jumping = true;
    }

}