const itemIcon = document.getElementById('item-icon');
const itemLabel = document.getElementById('item-label');
const ownerHint = document.getElementById('owner-hint');
const answerSlot = document.getElementById('answer-slot');
const scoreVal = document.getElementById('score');
const grid = document.getElementById('possessive-grid');

let score = 0;
let current = null;

const trials = [
    { name: "EL RATÓN", owner: "YO", ans: "mío", icon: "🖱️", alts: ["mía", "míos"] },
    { name: "LA COMPUTADORA", owner: "TÚ", ans: "tuya", icon: "💻", alts: ["tuyo", "tuyas"] },
    { name: "LOS ARCHIVOS", owner: "NOSOTROS", ans: "nuestros", icon: "📁", alts: ["nuestro", "nuestra"] },
    { name: "LAS PANTALLAS", owner: "ELLOS", ans: "suyas", icon: "🖥️", alts: ["suyo", "suya"] },
    { name: "LA LLAVE", owner: "ÉL", ans: "suya", icon: "🔑", alts: ["suyo", "suyos"] },
    { name: "EL CARRO", owner: "NOSOTROS", ans: "nuestro", icon: "🚗", alts: ["nuestra", "nuestros"] }
];

function next() {
    current = trials[Math.floor(Math.random() * trials.length)];
    itemIcon.innerText = current.icon;
    itemLabel.innerText = current.name;
    ownerHint.innerText = `Dueño: ${current.owner}`;
    answerSlot.innerText = "_______";
    
    grid.innerHTML = '';
    const choices = [current.ans, ...current.alts].sort(() => Math.random() - 0.5);
    
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'pos-btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (choice === current.ans) {
                score++;
                scoreVal.innerText = score;
                answerSlot.innerText = choice;
                setTimeout(next, 1000);
            } else {
                answerSlot.style.color = "red";
                setTimeout(() => answerSlot.style.color = "#38bdf8", 500);
            }
        };
        grid.appendChild(btn);
    });
}

next();