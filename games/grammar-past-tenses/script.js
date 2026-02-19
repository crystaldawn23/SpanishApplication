const sentenceText = document.getElementById('sentence-text');
const contextHint = document.getElementById('context-hint');
const explanation = document.getElementById('explanation');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const trials = [
    { s: "Ayer, yo ____ (ir) al médico.", h: "Specific point in time", a: "pret", e: "Preterite is for specific completed events." },
    { s: "De niño, yo ____ (ir) al médico mucho.", h: "Habitual action", a: "impf", e: "Imperfect is for habits in the past." },
    { s: "____ (ser) las dos de la tarde.", h: "Time/Background", a: "impf", e: "Imperfect describes time, age, and weather." },
    { s: "De repente, me ____ (romper) el brazo.", h: "Sudden interruption", a: "pret", e: "Preterite interrupts the background flow." },
    { s: "La clínica ____ (ser) muy grande.", h: "Description", a: "impf", e: "Imperfect is for physical descriptions." },
    { s: "El doctor ____ (llegar) a las ocho.", h: "Specific start time", a: "pret", e: "Preterite marks the beginning or end of an action." }
];

function next() {
    current = trials[Math.floor(Math.random() * trials.length)];
    sentenceText.innerText = current.s;
    contextHint.innerText = current.h;
    document.getElementById('logic-explanation').innerText = "";
}

function checkChoice(choice) {
    if (choice === current.a) {
        score++;
        scoreVal.innerText = score;
        document.getElementById('logic-explanation').style.color = "#10b981";
        document.getElementById('logic-explanation').innerText = "¡Sí! " + current.e;
        setTimeout(next, 1500);
    } else {
        document.getElementById('logic-explanation').style.color = "#f43f5e";
        document.getElementById('logic-explanation').innerText = "No. " + current.e;
    }
}
next();