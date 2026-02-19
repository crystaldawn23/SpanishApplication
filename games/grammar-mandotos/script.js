const light = document.getElementById('light-indicator');
const modeText = document.getElementById('mode-text');
const verbRoot = document.getElementById('verb-root');
const noteText = document.getElementById('note-text');
const grid = document.getElementById('option-grid');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const verbs = [
    { inf: "HABLAR", aff: "Habla", neg: "No hables" },
    { inf: "COMER", aff: "Come", neg: "No comas" },
    { inf: "ESCRIBIR", aff: "Escribe", neg: "No escribas" },
    { inf: "BORRAR", aff: "Borra", neg: "No borres" },
    { inf: "IMPRIMIR", aff: "Imprime", neg: "No imprimas" },
    { inf: "PRENDER", aff: "Prende", neg: "No prendas" }
];

function next() {
    const isAff = Math.random() > 0.5;
    current = verbs[Math.floor(Math.random() * verbs.length)];
    
    verbRoot.innerText = current.inf;
    
    if (isAff) {
        light.className = 'affirmative';
        modeText.innerText = "¡SÍ!";
        noteText.innerText = "Affirmative: Use 3rd person singular (él/ella).";
        current.answer = current.aff;
    } else {
        light.className = 'negative';
        modeText.innerText = "¡NO!";
        noteText.innerText = "Negative: Subjunctive flip (Opposite ending).";
        current.answer = current.neg;
    }

    renderButtons();
}

function renderButtons() {
    grid.innerHTML = '';
    const choices = [current.aff, current.neg, "No hablas", "Comas"].sort(() => Math.random() - 0.5);
    
    // Remove duplicates if any (like if 'current.aff' or 'neg' matches an alt)
    [...new Set(choices)].forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'cmd-btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (choice === current.answer) {
                score++;
                scoreVal.innerText = score;
                next();
            } else {
                light.style.opacity = "0.5";
                setTimeout(() => light.style.opacity = "1", 200);
            }
        };
        grid.appendChild(btn);
    });
}

next();