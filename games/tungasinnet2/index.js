// Use const for variables that don't change
const riddleData = {};
let currentRiddleIndex = -1;

// Use async/await for better readability
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        riddleData = data;
        console.log('Riddle data loaded:', riddleData);
    } catch (error) {
        console.error('Error loading riddle data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupButtons();
});

// Use a more descriptive variable name
function setupButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const actionAttribute = button.getAttribute('onclick');
        if (actionAttribute) {
            button.removeAttribute('onclick');
            const eventHandler = () => {
                // Use a switch statement for better readability
                switch (true) {
                    case actionAttribute.includes('showRiddle'):
                        const index = actionAttribute.match(/\d+/)[0];
                        showRiddle(parseInt(index, 10));
                        break;
                    case actionAttribute.includes('submitAnswer'):
                        submitAnswer();
                        break;
                    case actionAttribute.includes('tryAgain'):
                        tryAgain();
                        break;
                    case actionAttribute.includes('closePopup'):
                        closePopup();
                        break;
                    default:
                        console.error(`Unknown action: ${actionAttribute}`);
                }
            };
            button.addEventListener('click', eventHandler);
            button.addEventListener('touchend', eventHandler);
        }
    });
}

// Use a more descriptive variable name
function showRiddle(index) {
    const overlay = document.getElementById('overlay');
    const riddlePopup = document.getElementById('riddlePopup');
    const feedbackText = document.getElementById('feedbackText');
    const userAnswer = document.getElementById('userAnswer');
    const sendButton = document.getElementById('sendButton');
    const riddleText = document.getElementById('riddleText');

    overlay.style.display = 'block';
    riddlePopup.style.display = 'flex';
    feedbackText.innerText = '';
    userAnswer.value = '';
    userAnswer.style.display = 'block';
    sendButton.style.display = 'block';
    riddleText.style.display = 'block';

    const riddle = riddleData.riddle_coordinates[index];
    console.log("Current riddle:", riddle);
    if (!riddle.found) {
        riddleText.innerText = riddle.riddle;
        feedbackText.innerText = '';
        riddlePopup.style.display = 'flex';
        currentRiddleIndex = index;
    } else {
        feedbackText.innerText = `Du har redan hittat ${riddle.name}.`;
        userAnswer.style.display = 'none';
        sendButton.style.display = 'none';
    }
}

// Use a more descriptive variable name
function submitAnswer() {
    const riddle = riddleData.riddle_coordinates[currentRiddleIndex];
    const userAnswerValue = document.getElementById('userAnswer').value;

    if (userAnswerValue.toLowerCase() === riddle.answer.toLowerCase()) {
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
        document.getElementById('riddleText').style.display = 'none';
        document.getElementById('tryAgainBtn').classList.remove('hidden');
        document.getElementById('finishBtn').classList.add('hidden');
    }
}

// Use a more descriptive variable name
function tryAgain() {
    const riddleText = document.getElementById('riddleText');
    const userAnswer = document.getElementById('userAnswer');
    const sendButton = document.getElementById('sendButton');
    const riddlePopup = document.getElementById('riddlePopup');

    riddleText.style.display = 'block';
    userAnswer.style.display = 'block';
    sendButton.style.display = 'block';
    riddlePopup.style.display = 'flex';

    userAnswer.value = '';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('tryAgainBtn').classList.add('hidden');
}

// Use a more descriptive variable name
function closePopup() {
    const overlay = document.getElementById('overlay');
    const riddlePopup = document.getElementById('riddlePopup');
    const userAnswer = document.getElementById('userAnswer');
    const feedbackText = document.getElementById('feedbackText');

    overlay.style.display = 'none';
    riddlePopup.style.display = 'none';
    userAnswer.value = '';
    feedbackText.innerText = '';
    document.getElementById('tryAgainBtn').classList.add('hidden');
    document.getElementById('finishBtn').classList.add('hidden');
}

// Use a more descriptive variable name
function addToInventory(itemName) {
    const inventory = document.getElementById('inventory');
    const img = document.createElement('img');
    img.src = `images/${itemName}.png`;
    img.alt = itemName;
    img.className = 'inventory-item';
    inventory.appendChild(img);
}

// Use a more descriptive variable name
function checkAllRiddlesSolved() {
    if (riddleData.riddle_coordinates.every(r => r.found)) {
        transformPageForCompletion();
    }
}

// Use a more descriptive variable name
function transformPageForCompletion() {
    setTimeout(() => {
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
    }, 3000);
}