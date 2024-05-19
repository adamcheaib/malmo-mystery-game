const width = 50;
const windowWidth = window.innerWidth;
const goal = windowWidth - width;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomSteps (max) {
    return Math.round(Math.random() * max);
}

function startGame () {
    // remove stuff
    if(document.getElementById("tryagainBtn")) document.getElementById("tryagainBtn").remove();
    document.getElementById("result").textContent = "";
    document.getElementById("infoPage").style = "display: none";

    //establish distances
    let distances = 
        {
            horseDistance: 0,
        };
    // bug
    document.getElementById("yourHorse").style = "transform: translateX(0px)";
    document.querySelectorAll(".enemy").forEach(enemy => {distances[enemy.id] = 0; enemy.style = "transform: translateX(0px)"});

    // own movement
    document.addEventListener("touchstart", ownMovement);
    function ownMovement (e) {
        // start with some if + returns
        if(e.touches.length > 1) return; if(e.target.id == "tryagainBtn") return;
        if(distances["horseDistance"] >= goal) {whoWon("VANN"); return};

        distances["horseDistance"] = horseMovement("yourHorse", distances["horseDistance"]);
    }

    // enemyMovement
    let intervalClear = false;
    const intervalId = setInterval(enemyMovement, 500, 0);

    
    function enemyMovement () {

        for (let i = 0; i < document.querySelectorAll(".enemy").length; i++) {
            let enemy = document.querySelectorAll(".enemy")[i];

            if(distances[enemy.id] >= goal) {intervalClear = true; console.log("WINNER:" + enemy.id); clearInterval(intervalId); whoWon("FÖRLORA"); break};
            
            if(!intervalClear) distances[enemy.id] = horseMovement(enemy.id, distances[enemy.id]);
        }

    }

    // win decider
    function whoWon (event) {
        // making everything stop
        clearInterval(intervalId); document.removeEventListener("touchstart", ownMovement);
    
        document.getElementById("result").textContent = "DU " + event;

        if(event == "VANN") {localStorage.setItem("close_iframe", true); localStorage.setItem("completed", true);}
        if(event == "FÖRLORA") {
            // try again
            const tryagainBtn = document.createElement("button");
            tryagainBtn.id = "tryagainBtn";
            tryagainBtn.textContent = "Försök igen";
            tryagainBtn.addEventListener("touchstart", startGame);
            document.getElementById("wrapper").append(tryagainBtn);
        }
    }



    function horseMovement (horseName, tracker) {
        let randomMove = randomSteps(horseName == "yourHorse" ? windowWidth / 20 : windowWidth / 7);
        (tracker + randomMove > goal) ? randomMove = goal - tracker : "" ;
        tracker += randomMove;
        
        document.getElementById(horseName).style = `transform: translateX(${tracker}px)`;
    
        return tracker;
    }
}

document.querySelector("#infoPage > button").addEventListener("click", startGame);