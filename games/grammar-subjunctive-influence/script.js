const mainClause = document.getElementById('main-clause');
const targetPhrase = document.getElementById('target-phrase');
const hintText = document.getElementById('hint-text');
const optionsGrid = document.getElementById('options-grid');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const scenarios = [
    { start: "Espero", end: "tú vivas cerca", hint: "I hope that you live nearby", alts: ["tú vives cerca", "tú viva"] },
    { start: "Deseo", end: "la casa tenga jardín", hint: "I desire that the house has a garden", alts: ["la casa tiene jardín", "la casa tengo"] },
    { start: "Es posible", end: "nosotros nos mudemos", hint: "It is possible that we move", alts: ["nosotros nos mudamos", "nosotros mudamos"] },
    { start: "Busco una casa que", end: "sea grande", hint: "I'm looking for a house that is big", alts: ["es grande", "está grande"] },
    { start: "Quiero", end: "él limpie el sótano", hint: "I want him to clean the basement", alts: ["él limpia el sótano", "él limpies el sótano"] },
    { start: "Sugerimos", end: "Uds. alquilen el piso", hint: "We suggest that you all rent the floor", alts: ["Uds. alquilan el piso", "Uds. alquila"] }
];

function next() {
    current = scenarios[Math.floor(Math.random() * scenarios.length)];
    mainClause.innerText = current.start + "...";
    hintText.innerText = `(${current.hint})`;
    targetPhrase.innerText = "_______ _______ _______";
    targetPhrase.style.color = "#374151";

    optionsGrid.innerHTML = '';
    const choices = [current.end, ...current.alts].sort(() => Math.random() - 0.5);

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (choice === current.end) {
                score++;
                scoreVal.innerText = score;
                targetPhrase.innerText = choice;
                targetPhrase.style.color = "#059669"; // Success Green
                setTimeout(next, 1200);
            } else {
                targetPhrase.style.color = "#dc2626"; // Error Red
                setTimeout(() => { targetPhrase.style.color = "#374151"; }, 500);
            }
        };
        optionsGrid.appendChild(btn);
    });
}

next();