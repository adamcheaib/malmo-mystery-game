// fun variables wooho
const options = ["rock", "paper", "scissors"];
const chart =
    {
        rock:
            {
                weak: "paper",
                strong: "scissors"
            },
        scissors:
            {
                weak: "rock",
                strong: "paper"
            },
        paper:
            {
                weak: "scissors",
                strong: "rock"
            },
    }
let scoreCounter = 0;
let scoreCounter_op = 0;


// some functions woooohoo
function randomOption() {
    return options[Math.round(Math.random() * 2)];
}

function winOrLose(cpu, player) {
    if (chart[player].weak == cpu) {
        scoreCounter_op++;
        return "LOSE"
    }
    ;
    if (chart[player].strong == cpu) {
        scoreCounter++;
        return "WIN"
    }
    ;
    if (player == cpu) return "TIE";
}

function gameOver(result) {
    document.getElementById("result").textContent = `YOU ${result} THE GAME`;
    document.querySelectorAll("#options > button").forEach(button => button.disabled = true);
    localStorage.setItem("close_iframe", true);

    if (result == "LOST") {
        const tryagain_btn = document.getElementById("tryagain");
        tryagain_btn.classList.remove("hidden");

        // timer time
        let timer = 9;
        let interval = setInterval(() => {
                // if time is out
                if (timer == 0) {
                    clearInterval(interval);
                    tryagain_btn.disabled = false;
                    tryagain_btn.querySelector("span").textContent = "";
                    return
                }

                tryagain_btn.querySelector("span").textContent = `in ${timer}s`;
                timer--;
            },
            1000);
    }
    ;
}

// the game(tm)
document.querySelectorAll("#options > button").forEach(button => {

    button.addEventListener("click", e => {
        // check if game is over
        if (scoreCounter == 3) {
            gameOver("WON");
            return
        }
        ;
        if (scoreCounter_op == 3) {
            gameOver("LOST");
            return
        }
        ;

        // retriving the moves
        const player_move = e.target.textContent;
        const cpu_player_move = randomOption();

        // rendering the result
        document.getElementById("cpu_player_move").textContent = "Opponent goes: " + randomOption();
        document.getElementById("result").textContent = "YOU " + winOrLose(player_move.toLowerCase(), cpu_player_move.toLowerCase());
    })

})

document.getElementById("tryagain").addEventListener("click", e => {
    // resets everything
    scoreCounter = 0;
    scoreCounter_op = 0;
    document.querySelectorAll("#options > button").forEach(button => button.disabled = false);
    document.getElementById("tryagain").disabled = true;
    document.getElementById("cpu_player_move").textContent = "";
    document.getElementById("result").textContent = "";
    document.querySelector("#tryagain span").textContent = "in 10s";
    e.target.classList.add("hidden");
})