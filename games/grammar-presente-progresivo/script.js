const canvas = document.getElementById('photo-canvas');
const targetDisplay = document.getElementById('target-action');
const scoreDisplay = document.getElementById('score');

let score = 0;
let currentGoal = null;

const actions = [
    { text: "Ella está bailando", emoji: "💃" },
    { text: "Él está corriendo", emoji: "🏃" },
    { text: "Nosotros estamos nadando", emoji: "🏊" },
    { text: "Ellos están comiendo", emoji: "🍕" },
    { text: "Yo estoy durmiendo", emoji: "😴" },
    { text: "Usted está cantando", emoji: "🎤" }
];

function spawnSubjects() {
    canvas.innerHTML = '';
    actions.forEach(action => {
        const div = document.createElement('div');
        div.className = 'subject';
        div.innerText = action.emoji;
        div.style.left = Math.random() * 700 + 'px';
        div.style.top = Math.random() * 400 + 'px';
        
        div.onclick = () => {
            if (action.text === currentGoal.text) {
                score += 100;
                scoreDisplay.innerText = score;
                flashCamera();
                newRound();
            } else {
                score = Math.max(0, score - 50);
                scoreDisplay.innerText = score;
                div.style.filter = "grayscale(1)";
            }
        };
        canvas.appendChild(div);
    });
}

function newRound() {
    currentGoal = actions[Math.floor(Math.random() * actions.length)];
    targetDisplay.innerText = currentGoal.text;
    spawnSubjects();
}

function flashCamera() {
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'white';
    flash.style.zIndex = '99';
    canvas.appendChild(flash);
    setTimeout(() => flash.remove(), 100);
}

// Simple "movement" loop
setInterval(() => {
    const subjects = document.querySelectorAll('.subject');
    subjects.forEach(s => {
        s.style.left = Math.random() * 700 + 'px';
        s.style.top = Math.random() * 400 + 'px';
    });
}, 3000);

newRound();