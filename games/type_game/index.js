const data = ["civilisation", "revolution", "kejsare", "koloni", "dynasti", "fördrag", "krig", "fred", "upptäckt", "uppror", "monarki", "republik", "teokrati", "vasall", "förbund", "arkeologi", "reformation", "guldålder", "imperium", "invasion", "migration", "kultur", "aristokrati", "doktrin", "allians", "traktat", "härskare", "skepp", "krönika", "feodalism", "helgon", "hov", "ritual", "konstitution", "edikt", "legion", "rebell", "stat", "tribut", "vapenvila"];

function display_current_word(index) {
    const word = data[index];
    const span = document.createElement("span");
    span.textContent = word;
    span.className = "selected";
    document.getElementById("wordQueue").appendChild(span);
}

function trigger_win_lose_screen() {
    clearInterval(timeInterval);
    if (score >= 65) {
        setTimeout(() => {
            document.body.innerHTML = "<h1>Bra jobbat!</h1>";
            document.querySelector("h1").style.fontSize = "30px";
            document.querySelector("h1").style.textAlign = "center";
        }, 100);
    } else {
        setTimeout(() => {
            document.body.innerHTML = "<h1>Du är för seg!</h1>";
            document.querySelector("h1").style.fontSize = "30px";
            document.querySelector("h1").style.textAlign = "center";
        }, 100);
    }

    setTimeout(() => localStorage.setItem("close_iframe", true), 1500);
}

let score = 0;
let index = 0;

display_current_word(index);

let time = 58;

let timeInterval = setInterval(() => {
    time--;
    document.getElementById("seconds").textContent = time;

    if (time === 0) {
        document.getElementById("seconds").textContent = 0;

        trigger_win_lose_screen();
    }
}, 1000);

const textarea = document.getElementById("playerInput");

textarea.oninput = (event) => {
    if (event.data === " ") {
        event.preventDefault();
        const current_word = document.querySelector(".selected");
        if (textarea.value.replace(" ", "").toLowerCase() === current_word.textContent.toLowerCase()) {
            score += 5;
        } else {
            score -= 8;
        }


        current_word.className = "queuedWord";
        textarea.value = "";
        index++;
        if (data[index] === undefined) {
            trigger_win_lose_screen();
            return null;
        }

        display_current_word(index);
        document.getElementById("score").textContent = score;

    }
}