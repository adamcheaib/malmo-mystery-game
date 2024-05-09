// fun variables wooho
const options = ["sten", "sax", "påse"];
const chart = 
{
    sten: 
    {
        weak: "påse",
        strong: "sax"
    },
    sax: 
    {
        weak: "sten",
        strong: "påse"
    },
    påse: 
    {
        weak: "sax",
        strong: "sten"
    },
}
let scoreCounter = 0;
let scoreCounter_op = 0;


// some functions woooohoo
function randomOption () {return options[Math.round(Math.random() * 2)];}

function winOrLose (cpu, player) {
    if(chart[player].weak == cpu) {scoreCounter_op++; return "FÖRLORAR"};
    if(chart[player].strong == cpu) {scoreCounter++; return "VINNER"};
    if(player == cpu) return "OAVGJORT";
}
function gameOver (result, timer = 10) {
    document.getElementById("result").textContent = `DU ${result} SPELET`;
    document.querySelectorAll("#options > button").forEach(button => button.disabled = true);
    
    if(result == "VANN") localStorage.setItem("close_iframe", true);

    if(result == "FÖRLORAR") 
    {
        const tryagain_btn = document.getElementById("tryagain");
        tryagain_btn.classList.remove("hidden");
        document.getElementById("cpu_player_move").textContent = "Lycka till nästa gång!";

        // timer time
        tryagain_btn.querySelector("span").textContent = `om ${timer}s`; tryagain_btn.disabled = true;
        let interval = setInterval(() => 
        {
            // if time is out
            timer--;
            if(timer == 0) {clearInterval(interval); localStorage.removeItem("timer"); tryagain_btn.disabled = false; tryagain_btn.querySelector("span").textContent = ""; return};
            tryagain_btn.querySelector("span").textContent = `om ${timer}s`;

            localStorage.setItem("timer", timer);
        }, 
        1000);
    };
}
// no reload cheating
if(localStorage.getItem("timer")) {
    gameOver("FÖRLORAR", Number(localStorage.getItem("timer")));
    document.getElementById("tryagain").disabled = true;
}

// the game(tm)
document.querySelectorAll("#options > button").forEach(button => {

    button.addEventListener("click", e => {
        // check if game is over
        if(scoreCounter == 3) {gameOver("VANN"); return};
        if(scoreCounter_op == 3) {gameOver("FÖRLORAR"); return};

        // retriving the moves
        const player_move = e.target.textContent;
        const cpu_player_move = randomOption();

        // rendering the result
        const result = winOrLose(cpu_player_move.toLowerCase(), player_move.toLowerCase());
        document.getElementById("cpu_player_move").textContent = "Motståndaren valde: " + cpu_player_move;
        document.getElementById("result").textContent = result == "OAVGJORT" ? result : `DU ${result}`;
    })

})

document.getElementById("tryagain").addEventListener("click", e => {
    // resets everything
    scoreCounter = 0; scoreCounter_op = 0;
    document.querySelectorAll("#options > button").forEach(button => button.disabled = false); document.getElementById("tryagain").disabled = true;
    document.getElementById("cpu_player_move").textContent = ""; document.getElementById("result").textContent = ""; document.querySelector("#tryagain span").textContent = "in 10s";
    e.target.classList.add("hidden");
})