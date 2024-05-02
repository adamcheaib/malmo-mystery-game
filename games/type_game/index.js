const data = [
    "civilisation", "revolution", "kejsare", "koloni", "dynasti", "fördrag", "krig", "fred",
    "upptäckt", "uppror", "monarki", "republik", "teokrati", "vasall", "förbund", "arkeologi",
    "reformation", "guldålder", "imperium", "invasion", "migration", "kultur", "aristokrati",
    "doktrin", "allians", "traktat", "härskare", "skepp", "krönika", "feodalism", "helgon",
    "hov", "ritual", "konstitution", "edikt", "legion", "rebell", "stat", "tribut", "vapenvila"
];

// data.forEach((word) => {
//     const span = document.createElement("span");
//     span.textContent = word;
//     span.className = "queuedWord";
//     document.getElementById("wordQueue").appendChild(span);
// });

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
            alert("Du är ju smart!!");
        }, 100);
    } else {
        setTimeout(() => {
            alert("Du behöver öva lite mer...!!");
        }, 100);
    }
    document.body.innerHTML = "";
    localStorage.setItem("close_iframe", true);
    console.log(localStorage);
}

let score = 0;
let index = 0;

display_current_word(index);
// let fullList = document.querySelectorAll(".queuedWord");
// let selectedWord = fullList[index];
// selectedWord.classList.add("selected");

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

        // selectedWord.classList.remove("selected");
        // if (textarea.value.replace(" ", "").toLowerCase() === selectedWord.textContent) {
        //     selectedWord.style.color = "green";
        //     selectedWord.classList.add("done");
        //     selectedWord.classList.add("correct");
        //     textarea.value = "";
        //     score += 5;
        //     document.getElementById("score").textContent = score;
        // } else {
        //     selectedWord.classList.add("done");
        //     selectedWord.classList.add("wrong");
        //     textarea.value = "";
        //     selectedWord.style.color = "red";
        //     score -= 8;
        //     document.getElementById("score").textContent = score;
        // }

        // index++;

        //     if (document.querySelectorAll(".done").length === fullList.length) {
        //         console.log("DOne length: " + document.querySelectorAll(".done").length);
        //         console.log(fullList.length);
        //         alert("You won!");
        //         clearInterval(timeInterval);
        //     }
        //
        //     selectedWord = fullList[index];
        //     if (selectedWord !== undefined) {
        //         selectedWord.classList.add("selected");
        //     }
        // }
    }

// textarea.addEventListener("keydown", (event) => {
// alert(event.keyCode);
// alert(event.which);
// event.preventDefault();
// selectedWord.classList.remove("selected");
// if (textarea.value === selectedWord.textContent) {
//   selectedWord.style.color = "green";
//   selectedWord.classList.add("done");
//   textarea.value = "";
//   score += 5;
//   document.getElementById("score").textContent = score;
// } else {
//   selectedWord.classList.add("done");
//   textarea.value = "";
//   selectedWord.style.color = "red";
// }
// index++;
// if (document.querySelectorAll(".done").length === fullList.length) {
//   console.log("DOne length: " + document.querySelectorAll(".done").length);
//   console.log(fullList.length);
//   alert("You won!");
//   clearInterval(timeInterval);
// }
// selectedWord = fullList[index];
// if (selectedWord !== undefined) {
//   selectedWord.classList.add("selected");
// }
// });
}