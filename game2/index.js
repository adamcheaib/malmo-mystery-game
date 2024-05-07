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
    if(document.getElementById("tryagainBtn")) document.getElementById("tryagainBtn").remove();

    //establish distances
    let distances = 
        {
            horseDistance: 0,
        };
    // bug
    document.getElementById("yourHorse").style = "transform: translateX(0px)";
    document.querySelectorAll(".enemy").forEach(enemy => {distances[enemy.id] = 0; enemy.style = "transform: translateX(0px)"});

    // own movement
    document.getElementById("wrapper").addEventListener("click", ownMovement);
    function ownMovement (e) {
        if(e.target !== e.currentTarget) return;
        if(distances["horseDistance"] >= goal) {whoWon("WON"); return};
        distances["horseDistance"] = horseMovement("yourHorse", distances["horseDistance"]);
    }

    // enemyMovement
    let intervalClear = false;
    const intervalId = setInterval(enemyMovement, 500, 0);

    
    function enemyMovement () {

        for (let i = 0; i < document.querySelectorAll(".enemy").length; i++) {
            let enemy = document.querySelectorAll(".enemy")[i];
            console.log(enemy.id);

            if(distances[enemy.id] >= goal) {intervalClear = true; console.log("WINNER:" + enemy.id); clearInterval(intervalId); whoWon("LOST"); break};
            
            if(!intervalClear) distances[enemy.id] = horseMovement(enemy.id, distances[enemy.id]);
        }

    }

    // win decider
    function whoWon (event) {
        // making everything stop
        clearInterval(intervalId); document.getElementById("wrapper").removeEventListener("click", ownMovement);
    
        console.log("YOU " + event);
        
        if(event == "LOST") {
            // try again
            const tryagainBtn = document.createElement("button");
            tryagainBtn.id = "tryagainBtn";
            tryagainBtn.textContent = "Try Again";
            tryagainBtn.addEventListener("click", startGame);
            document.getElementById("wrapper").append(tryagainBtn);
        }
    }



    function horseMovement (horseName, tracker) {
        let randomMove = randomSteps(horseName == "yourHorse" ? windowWidth / 30 : windowWidth / 8);
        (tracker + randomMove > goal) ? randomMove = goal - tracker : "" ;
        tracker += randomMove;
        
        document.getElementById(horseName).style = `transform: translateX(${tracker}px)`;
    
        return tracker;
    }
}

startGame();