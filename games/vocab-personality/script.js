const traits = [
    { word: "Simpático", type: "positivo" },
    { word: "Perezoso", type: "negativo" },
    { word: "Trabajador", type: "positivo" },
    { word: "Antipático", type: "negativo" },
    { word: "Inteligente", type: "positivo" },
    { word: "Tonto", type: "negativo" },
    { word: "Generoso", type: "positivo" }
];

let currentIdx = 0;
let points = 0;
let timeLeft = 100;

function updateWord() {
    if (currentIdx < traits.length) {
        document.getElementById('current-word').innerText = traits[currentIdx].word;
    } else {
        alert("SESSION COMPLETE! Score: " + points);
        window.location.href = "../../index.html";
    }
}

function sort(choice) {
    if (choice === traits[currentIdx].type) {
        points++;
        document.getElementById('points').innerText = points;
    }
    currentIdx++;
    updateWord();
}

// Simple timer countdown
setInterval(() => {
    if (timeLeft > 0) {
        timeLeft -= 0.5;
        document.getElementById('timer-fill').style.width = timeLeft + "%";
    } else {
        alert("TIME UP! Practice again.");
        location.reload();
    }
}, 100);

window.onload = updateWord;