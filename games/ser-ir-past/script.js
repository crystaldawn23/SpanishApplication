const phraseDisplay = document.getElementById('current-phrase');
const scoreVal = document.getElementById('score-val');

let score = 0;
let currentTarget = null;

const trials = [
    { text: "Yo fui al cine con amigos.", type: "ir" },
    { text: "La fiesta fue muy divertida.", type: "ser" },
    { text: "Nosotros fuimos a la playa.", type: "ir" },
    { text: "Ellos fueron estudiantes buenos.", type: "ser" },
    { text: "Tú fuiste al gimnasio ayer.", type: "ir" },
    { text: "El examen fue muy difícil.", type: "ser" },
    { text: "Yo fui el capitán del equipo.", type: "ser" },
    { text: "Ustedes fueron a Madrid en tren.", type: "ir" },
    { text: "Mi abuelo fue médico.", type: "ser" }
];

function nextTrial() {
    currentTarget = trials[Math.floor(Math.random() * trials.length)];
    phraseDisplay.innerText = currentTarget.text;
    
    // Reset colors
    phraseDisplay.parentElement.style.borderColor = "white";
}

function checkChoice(choice) {
    if (choice === currentTarget.type) {
        score += 100;
        phraseDisplay.parentElement.style.borderColor = "#4ade80";
        setTimeout(nextTrial, 500);
    } else {
        score = Math.max(0, score - 50);
        phraseDisplay.parentElement.style.borderColor = "#ef4444";
    }
    scoreVal.innerText = score;
}

nextTrial();