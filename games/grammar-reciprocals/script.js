const scenarioDesc = document.getElementById('scenario-desc');
const sentencePreview = document.getElementById('sentence-preview');
const feedback = document.getElementById('feedback-log');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const scenarios = [
    { desc: "Marta y Luis / Escribir", preview: "Ellos ______ escriben.", ans: "se" },
    { desc: "Tú y yo / Ver (videochat)", preview: "Nosotros ______ vemos.", ans: "nos" },
    { desc: "Mis amigos / Ayudar (con la tarea)", preview: "Ellos ______ ayudan.", ans: "se" },
    { desc: "Mi novia y yo / Llamar", preview: "Nosotros ______ llamamos.", ans: "nos" },
    { desc: "Los mecánicos / Hablar", preview: "Ellos ______ hablan.", ans: "se" },
    { desc: "Tú y yo / Escuchar", preview: "Nosotros ______ escuchamos.", ans: "nos" }
];

function next() {
    current = scenarios[Math.floor(Math.random() * scenarios.length)];
    scenarioDesc.innerText = current.desc;
    sentencePreview.innerText = current.preview;
    feedback.innerText = "Establece la conexión...";
    feedback.style.color = "#94a3b8";
}

function check(choice) {
    if (choice === current.ans) {
        score++;
        scoreVal.innerText = score;
        feedback.innerText = "¡CONEXIÓN EXITOSA!";
        feedback.style.color = "#22c55e";
        setTimeout(next, 1000);
    } else {
        feedback.innerText = "ERROR DE PROTOCOLO";
        feedback.style.color = "#ef4444";
    }
}

next();