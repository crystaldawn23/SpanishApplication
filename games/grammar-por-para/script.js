const display = document.getElementById('sentence-display');
const scoreVal = document.getElementById('score-val');
let score = 0;
let current = null;

const trials = [
    { s: "Estudio ___ el examen.", a: "para" },
    { s: "Gracias ___ el regalo.", a: "por" },
    { s: "Salgo ___ la escuela.", a: "para" },
    { s: "Hablamos ___ teléfono.", a: "por" },
    { s: "Este libro es ___ ti.", a: "para" },
    { s: "Camino ___ la playa.", a: "por" }
];

function next() {
    current = trials[Math.floor(Math.random() * trials.length)];
    display.innerText = current.s;
}

function checkChoice(choice) {
    if (choice === current.a) {
        score++;
        scoreVal.innerText = score;
        next();
    } else {
        display.style.backgroundColor = "#450a0a";
        setTimeout(() => display.style.backgroundColor = "#1e293b", 300);
    }
}
next();
