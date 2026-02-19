const targetWordEl = document.getElementById('target-word');
const grid = document.getElementById('selection-grid');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const vocab = [
    { name: "el despacho", icon: "💼" }, { name: "el sótano", icon: "📉" },
    { name: "el altillo", icon: "📦" }, { name: "el pasillo", icon: "🚪" },
    { name: "el barrio", icon: "🏘️" }, { name: "las afueras", icon: "🌳" },
    { name: "el alquiler", icon: "💰" }, { name: "la vivienda", icon: "🏠" }
];

function next() {
    current = vocab[Math.floor(Math.random() * vocab.length)];
    targetWordEl.innerText = current.name;
    
    grid.innerHTML = '';
    const choices = [current.name, ...getAlts(current.name)];
    choices.sort(() => Math.random() - 0.5).forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'vivienda-btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (choice === current.name) {
                score++;
                scoreVal.innerText = score;
                next();
            } else {
                targetWordEl.style.color = "red";
                setTimeout(() => { targetWordEl.style.color = "#38bdf8"; }, 300);
            }
        };
        grid.appendChild(btn);
    });
}

function getAlts(correct) {
    return vocab.map(v => v.name).filter(n => n !== correct).sort(() => 0.5 - Math.random()).slice(0, 2);
}

next();