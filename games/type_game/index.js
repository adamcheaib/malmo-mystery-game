const data = [
    "civilisation", "revolution", "kejsare", "koloni", "dynasti", "fördrag", "krig", "fred",
    "upptäckt", "uppror", "monarki", "republik", "teokrati", "vasall", "förbund", "arkeologi",
    "reformation", "guldålder", "imperium", "invasion", "migration", "kultur", "aristokrati",
    "doktrin", "allians", "traktat", "härskare", "skepp", "krönika", "feodalism", "helgon",
    "hov", "ritual", "konstitution", "edikt", "legion", "rebell", "stat", "tribut", "vapenvila"
];

data.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.className = "queuedWord";
    document.getElementById("wordQueue").appendChild(span);
});

let score = 0;
let index = 0;
let fullList = document.querySelectorAll(".queuedWord");
let selectedWord = fullList[index];
selectedWord.classList.add("selected");

let time = 40;

let timeInterval = setInterval(() => {
    time--;
    document.getElementById("seconds").textContent = time;

    if (time === 0) {
        document.getElementById("seconds").textContent = 0;
        clearInterval(timeInterval);

        if (score >= 85) {
            setTimeout(() => {
                alert("Du är ju smart!!");
            }, 100)
        } else {
            setTimeout(() => {
                alert("Du behöver öva lite mer...!!");
            }, 100)
        }
    }
}, 1000);

const textarea = document.getElementById("playerInput");

textarea.oninput = (event) => {
    if (event.data === " ") {
        event.preventDefault();
        selectedWord.classList.remove("selected");
        if (textarea.value.replace(" ", "").toLowerCase() === selectedWord.textContent) {
            selectedWord.style.color = "green";
            selectedWord.classList.add("done");
            selectedWord.classList.add("correct");
            textarea.value = "";
            score += 5;
            document.getElementById("score").textContent = score;
        } else {
            selectedWord.classList.add("done");
            selectedWord.classList.add("wrong");
            textarea.value = "";
            selectedWord.style.color = "red";
            score -= 8;
            document.getElementById("score").textContent = score;
        }

        index++;

        if (document.querySelectorAll(".done").length === fullList.length) {
            console.log("DOne length: " + document.querySelectorAll(".done").length);
            console.log(fullList.length);
            alert("You won!");
            clearInterval(timeInterval);
        }

        selectedWord = fullList[index];
        if (selectedWord !== undefined) {
            selectedWord.classList.add("selected");
        }
    }
};

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
