const starfield = document.getElementById('starfield');
const sentenceDisplay = document.getElementById('current-sentence');
const scoreDisplay = document.getElementById('score-val');

let score = 0;
let currentCorrect = "";

const challenges = [
    { s: "Juan compra flores para <span>mí</span>.", a: "me", opts: ["me", "te", "le", "nos"] },
    { s: "Doy el regalo a <span>ella</span>.", a: "le", opts: ["le", "la", "me", "les"] },
    { s: "Ellos escriben a <span>nosotros</span>.", a: "nos", opts: ["nos", "os", "les", "me"] },
    { s: "Traigo la comida para <span>ti</span>.", a: "te", opts: ["te", "le", "me", "os"] },
    { s: "El camarero sirve a <span>los clientes</span>.", a: "les", opts: ["les", "le", "nos", "los"] },
    { s: "Mamá lee un libro a <span>mi hermano</span>.", a: "le", opts: ["le", "me", "te", "la"] }
];

function spawnAliens() {
    starfield.innerHTML = '';
    const round = challenges[Math.floor(Math.random() * challenges.length)];
    sentenceDisplay.innerHTML = round.s;
    currentCorrect = round.a;

    round.opts.forEach((opt, index) => {
        const alien = document.createElement('div');
        alien.className = 'alien';
        alien.innerText = opt;
        alien.style.left = (index * 140 + 50) + 'px';
        alien.style.top = '20px';
        
        alien.onclick = () => {
            if (opt === currentCorrect) {
                score += 100;
                scoreDisplay.innerText = score;
                alien.style.background = "#22c55e";
                setTimeout(spawnAliens, 500);
            } else {
                score = Math.max(0, score - 50);
                scoreDisplay.innerText = score;
                alien.style.background = "#ef4444";
            }
        };
        starfield.appendChild(alien);
    });
}

// Simple descending animation
setInterval(() => {
    const aliens = document.querySelectorAll('.alien');
    aliens.forEach(a => {
        let top = parseInt(a.style.top);
        if (top < 350) {
            a.style.top = (top + 1) + 'px';
        }
    });
}, 50);

spawnAliens();