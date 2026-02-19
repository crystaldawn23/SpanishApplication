const subjectNode = document.getElementById('subject-node');
const verbRoot = document.getElementById('verb-root');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const verbs = [
    { sub: "ÉL", inf: "SERVIR", ans: "sirvió" },
    { sub: "ELLOS", inf: "DORMIR", ans: "durmieron" },
    { sub: "YO", inf: "PEDIR", ans: "pedí" }, // No change in 1st person
    { sub: "ELLA", inf: "REPETIR", ans: "repitió" },
    { sub: "NOSOTROS", inf: "PREFERIR", ans: "preferimos" }, // No change
    { sub: "USTEDES", inf: "MORIR", ans: "murieron" },
    { sub: "TÚ", inf: "SENTIR", ans: "sentiste" }, // No change
    { sub: "USTED", inf: "PEDIR", ans: "pidió" }
];

function nextFormula() {
    current = verbs[Math.floor(Math.random() * verbs.length)];
    subjectNode.innerText = current.sub;
    verbRoot.innerText = current.inf;
    userInput.value = "";
    feedback.innerText = "Recuerda: solo cambian en 3ª persona.";
    feedback.style.color = "#00ff41";
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (userInput.value.toLowerCase().trim() === current.ans) {
            score++;
            scoreVal.innerText = score;
            feedback.innerText = "¡CORRECTO!";
            feedback.style.color = "#00ff41";
            setTimeout(nextFormula, 800);
        } else {
            feedback.innerText = `ERROR. Intenta de nuevo.`;
            feedback.style.color = "#ff4141";
        }
    }
});

function addChar(char) {
    userInput.value += char;
    userInput.focus();
}

nextFormula();