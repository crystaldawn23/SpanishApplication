const posDisplay = document.getElementById('pos-word');
const negDisplay = document.getElementById('neg-zone');
const optionGrid = document.getElementById('option-grid');
const scoreVal = document.getElementById('score-val');

let score = 0;
let currentCorrect = "";

const pairs = [
    { pos: "ALGO", neg: "NADA", alt: ["NUNCA", "NADIE", "TAMPOCO"] },
    { pos: "ALGUIEN", neg: "NADIE", alt: ["NADA", "NUNCA", "NINGUNO"] },
    { pos: "SIEMPRE", neg: "NUNCA", alt: ["NADA", "TAMPOCO", "ALGUIEN"] },
    { pos: "TAMBIÉN", neg: "TAMPOCO", alt: ["NADA", "NUNCA", "NADIE"] },
    { pos: "ALGÚN", neg: "NINGÚN", alt: ["NADA", "NUNCA", "ALGO"] },
    { pos: "O... O", neg: "NI... NI", alt: ["NADA", "TAMPOCO", "ALGUIEN"] }
];

function nextRound() {
    const round = pairs[Math.floor(Math.random() * pairs.length)];
    posDisplay.innerText = round.pos;
    negDisplay.innerText = "?";
    currentCorrect = round.neg;

    optionGrid.innerHTML = '';
    const allOptions = [round.neg, ...round.alt].sort(() => Math.random() - 0.5);

    allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'toggle-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === currentCorrect) {
                score += 100;
                negDisplay.innerText = opt;
                setTimeout(nextRound, 800);
            } else {
                score = Math.max(0, score - 50);
                btn.style.borderColor = "gray";
                btn.style.color = "gray";
            }
            scoreVal.innerText = score;
        };
        optionGrid.appendChild(btn);
    });
}

nextRound();