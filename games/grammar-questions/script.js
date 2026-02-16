const levels = [
    { correct: ["¿", "Hablas", "tú", "español", "?"], scrambled: ["español", "¿", "Hablas", "?", "tú"] },
    { correct: ["¿", "Estudian", "ustedes", "mucho", "?"], scrambled: ["mucho", "Estudian", "ustedes", "?", "¿"] },
    { correct: ["¿", "Baila", "él", "bien", "?"], scrambled: ["bien", "Baila", "?", "él", "¿"] }
];

let currentLevel = 0;
let playerSelection = [];

function loadLevel() {
    const bank = document.getElementById('word-bank');
    const track = document.getElementById('sentence-track');
    bank.innerHTML = '';
    track.innerHTML = '';
    playerSelection = [];

    levels[currentLevel].scrambled.forEach(word => {
        const tile = document.createElement('div');
        tile.className = 'word-tile';
        tile.innerText = word;
        tile.onclick = () => selectWord(word, tile);
        bank.appendChild(tile);
    });
}

function selectWord(word, element) {
    playerSelection.push(word);
    document.getElementById('sentence-track').appendChild(element);
    element.onclick = null; // Prevent double clicking
    element.style.opacity = "0.6";
}

function resetWeaver() {
    loadLevel();
}

function checkSentence() {
    const isCorrect = JSON.stringify(playerSelection) === JSON.stringify(levels[currentLevel].correct);
    
    if (isCorrect) {
        currentLevel++;
        if (currentLevel < levels.length) {
            alert("¡Muy bien!");
            loadLevel();
        } else {
            alert("MASTER WEAVER! You've mastered question formation.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("Not quite. Remember the upside-down question mark comes first!");
        resetWeaver();
    }
}

window.onload = loadLevel;