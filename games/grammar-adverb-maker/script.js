const scenarioText = document.getElementById('scenario-text');
const adverbInput = document.getElementById('adverb-input');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const trials = [
    { adj: "lento", adv: "lentamente", scene: "🐢", text: "El doctor camina de manera <b>lenta</b>." },
    { adj: "rápido", adv: "rápidamente", scene: "🏃‍♂️", text: "La enfermera corre de manera <b>rápida</b>." },
    { adj: "frecuente", adv: "frecuentemente", scene: "📅", text: "El paciente tose de manera <b>frecuente</b>." },
    { adj: "paciente", adv: "pacientemente", scene: "🧘", text: "Esperamos al dentista de manera <b>paciente</b>." },
    { adj: "alegre", adv: "alegremente", scene: "😊", text: "El niño sale de la clínica <b>alegre</b>." },
    { adj: "cuidadoso", adv: "cuidadosamente", scene: "🔍", text: "La doctora revisa la radiografía <b>cuidadosa</b>." }
];

function nextTrial() {
    current = trials[Math.floor(Math.random() * trials.length)];
    scenarioText.innerHTML = current.text;
    document.getElementById('medical-scene').innerText = current.scene;
    adverbInput.value = "";
}

adverbInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (adverbInput.value.toLowerCase().trim() === current.adv) {
            score++;
            scoreVal.innerText = score;
            adverbInput.style.borderBottomColor = "#22c55e";
            setTimeout(() => {
                adverbInput.style.borderBottomColor = "#38bdf8";
                nextTrial();
            }, 800);
        } else {
            adverbInput.style.borderBottomColor = "#ef4444";
            setTimeout(() => {
                adverbInput.style.borderBottomColor = "#38bdf8";
            }, 500);
        }
    }
});

nextTrial();