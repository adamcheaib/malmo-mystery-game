"use strict"

const mouse = document.querySelector("#mouse");
// mouse.style.left = Math.floor(Math.random() * window.innerWidth);
let max_right_position = window.innerWidth - mouse.clientWidth;
let max_bottom_position = window.innerHeight - mouse.clientHeight;

mouse.style.left = Math.floor(Math.random() * max_right_position) + "px";
mouse.style.top = Math.floor(Math.random() * max_bottom_position) + "px";

let interval = setInterval(() => {
    mouse.style.left = Math.floor(Math.random() * max_right_position) + "px";
    mouse.style.top = Math.floor(Math.random() * max_bottom_position) + "px";
}, 500)

const colors = ["rgb(196, 196, 196)", "rgb(133, 133, 133)", "rgb(93, 93, 93)", "rgb(53, 53, 53)", "rgb(44, 44, 44)", "rgb(30, 30, 30)", "black"];
let color_index = 0;
let score = 0;

mouse.ontouchstart = () => {
    document.body.style.backgroundColor = colors[color_index];
    color_index++;
    score++;
    document.querySelector("span").textContent = `${score}/8`;

    if (colors[color_index] === undefined) color_index = 0;

    if (score === 8) {
        clearInterval(interval);
        document.body.innerHTML = "<h1>Bra Jobbat!</h1>";
        document.body.style.backgroundColor = "white";
        document.body.id = "winning_screen";
        setTimeout(() => {
                localStorage.setItem("completed", true); // Changes the value of the state.
                localStorage.setItem("close_iframe", true);
            }
            , 500);
    }
}