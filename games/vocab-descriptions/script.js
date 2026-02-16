const targets = [
    { clue: "pelo rubio y ojos azules", emoji: "👱‍♂️", traits: "Rubio / Azules" },
    { clue: "pelo castaño y ojos verdes", emoji: "👨‍🦰", traits: "Castaño / Verdes" },
    { clue: "pelo negro y gafas", emoji: "🧔", traits: "Negro / Gafas" },
    { clue: "pelo canoso y ojos marrones", emoji: "👴", traits: "Canoso / Marrones" }
];

let currentIndex = 0;
let level = 1; // Looking for the match for index 1 (Castaño)

function changeCard(step) {
    currentIndex += step;
    if (currentIndex >= targets.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = targets.length - 1;
    updateDisplay();
}

function updateDisplay() {
    const card = targets[currentIndex];
    document.getElementById('character-emoji').innerText = card.emoji;
    document.getElementById('character-features').innerText = card.traits;
}

function verifyMatch() {
    if (currentIndex === level) {
        alert("¡OBJETIVO LOCALIZADO! Good work, detective.");
        level++; // Move to next level target
        if (level >= targets.length) {
            alert("Case Closed! You know your descriptions.");
            window.location.href = "../../index.html";
        } else {
            document.getElementById('description-text').innerHTML = `Busco a una persona con... <br><strong>${targets[level].clue}</strong>`;
            currentIndex = 0;
            updateDisplay();
        }
    } else {
        alert("NOT A MATCH. Keep searching.");
    }
}

window.onload = updateDisplay;