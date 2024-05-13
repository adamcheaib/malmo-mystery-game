

let riddleData = {};
let currentRiddleIndex = -1;

function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            riddleData = data;
            console.log('Riddle data loaded:', riddleData);
        })
        .catch(error => console.error('Error loading riddle data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupButtons();
});

/* function setupButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const action = button.getAttribute('onclick');
        if (action) {
            button.removeAttribute('onclick');
            button.addEventListener('click', () => {
                if (action.includes('showRiddle')) {
                    const index = action.match(/\d+/)[0];
                    showRiddle(parseInt(index, 10));
                } else if (action.includes('submitAnswer')) {
                    submitAnswer();
                } else if (action.includes('tryAgain')) {
                    tryAgain();
                } else if (action.includes('closePopup')) {
                    closePopup();
                }
            });
        }
    });
} */

function setupButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const action = button.getAttribute('onclick');
        if (action) {
            button.removeAttribute('onclick');
            const eventHandler = () => {
                if (action.includes('showRiddle')) {
                    const index = action.match(/\d+/)[0];
                    showRiddle(parseInt(index, 10));
                } else if (action.includes('submitAnswer')) {
                    submitAnswer();
                } else if (action.includes('tryAgain')) {
                    tryAgain();
                } else if (action.includes('closePopup')) {
                    closePopup();
                }
            };
            button.addEventListener('click', eventHandler);
            button.addEventListener('touchend', eventHandler);
        }
    });
}

function showRiddle(index) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('riddlePopup').style.display = 'flex';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('userAnswer').value = '';
    document.getElementById('userAnswer').style.display = 'block';
    document.getElementById('sendButton').style.display = 'block';
    document.getElementById('riddleText').style.display = 'block';

    const riddle = riddleData.riddle_coordinates[index];
    console.log("Current riddle:", riddle);
    if (!riddle.found) {
        document.getElementById('riddleText').innerText = riddle.riddle;
        document.getElementById('feedbackText').innerText = '';
        document.getElementById('riddlePopup').style.display = 'flex';
        currentRiddleIndex = index;
    } else {
        document.getElementById('feedbackText').innerText = `Du har redan hittat ${riddle.name}.`;
        document.getElementById('userAnswer').style.display = 'none';
        document.getElementById('sendButton').style.display = 'none';
    }
}

function submitAnswer() {
    const riddle = riddleData.riddle_coordinates[currentRiddleIndex];
    const userAnswer = document.getElementById('userAnswer').value;

    if (userAnswer.toLowerCase() === riddle.answer.toLowerCase()) {
        riddle.found = true;
        document.getElementById('feedbackText').innerText = 'Rätt svar!';
        document.getElementById('userAnswer').style.display = 'none';
        document.getElementById('sendButton').style.display = 'none';
        document.getElementById('riddleText').style.display = 'none';
        document.getElementById('tryAgainBtn').classList.add('hidden');
        document.getElementById('finishBtn').classList.remove('hidden');
        addToInventory(riddle.name);
        checkAllRiddlesSolved();
    } else {
        document.getElementById('feedbackText').innerText = 'Fel svar, försök igen!';
        document.getElementById('userAnswer').style.display = 'none';
        document.getElementById('sendButton').style.display = 'none';
        document.getElementById('riddleText').style.display = 'none'; // Optionally hide riddle text on wrong answer
        document.getElementById('tryAgainBtn').classList.remove('hidden');
        document.getElementById('finishBtn').classList.add('hidden');
    }
}

function tryAgain() {
    document.getElementById('riddleText').style.display = 'block';
    document.getElementById('userAnswer').style.display = 'block';
    document.getElementById('sendButton').style.display = 'block';
    document.getElementById('riddlePopup').style.display = 'flex';

    document.getElementById('userAnswer').value = '';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('tryAgainBtn').classList.add('hidden');
}


function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('riddlePopup').style.display = 'none';
    document.getElementById('userAnswer').value = '';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('tryAgainBtn').classList.add('hidden');
    document.getElementById('finishBtn').classList.add('hidden');
}

function addToInventory(itemName) {
    const inventory = document.getElementById('inventory');
    const img = document.createElement('img');
    img.src = `images/${itemName}.png`;
    img.alt = itemName;
    img.className = 'inventory-item';
    inventory.appendChild(img);
}

function checkAllRiddlesSolved() {
    if (riddleData.riddle_coordinates.every(r => r.found)) {
        transformPageForCompletion();
    }
}


function transformPageForCompletion() {
    setTimeout(() => {
        // Trigger a vibration pattern: vibrate for 500ms, pause for 200ms, then vibrate for 500ms again
        if (navigator.vibrate) {
            navigator.vibrate([500, 200, 500]);
        }

        document.body.innerHTML = "<h1>Grattis! <br> du har nu befriat Tungasinnet</h1>";
        document.body.style.backgroundColor = "#97C75A";
        document.body.style.fontFamily = "'Jolly Lodger', cursive";
        document.body.style.fontSize = "18px";
        document.body.style.textAlign = "center";
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh";


        localStorage.setItem("riddleGameCompleted", true);
    }, 2000);
}


