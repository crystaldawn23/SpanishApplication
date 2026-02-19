const sentenceDisplay = document.getElementById('spanish-sentence');
const optionsArea = document.getElementById('translation-options');
const scoreVal = document.getElementById('score');
const logDisplay = document.getElementById('log-display');

let score = 0;
let current = null;

const phrases = [
    { s: "Yo supe la verdad.", a: "I found out the truth.", alts: ["I knew the truth.", "I wanted the truth."] },
    { s: "Conocí a María ayer.", a: "I met Maria yesterday.", alts: ["I knew Maria yesterday.", "I saw Maria yesterday."] },
    { s: "No quise ir a la fiesta.", a: "I refused to go to the party.", alts: ["I didn't want to go.", "I couldn't go."] },
    { s: "Pude terminar la tarea.", a: "I managed to finish the homework.", alts: ["I could finish the homework.", "I wanted to finish."] },
    { s: "Quise llamar pero no pude.", a: "I tried to call but didn't succeed.", alts: ["I wanted to call but couldn't.", "I called but they didn't answer."] },
    { s: "No pudimos comprar el pan.", a: "We failed to buy the bread.", alts: ["We didn't want to buy.", "We didn't know how to buy."] }
];

function nextSignal() {
    current = phrases[Math.floor(Math.random() * phrases.length)];
    sentenceDisplay.innerText = current.s;
    
    optionsArea.innerHTML = '';
    const allOpts = [current.a, ...current.alts].sort(() => Math.random() - 0.5);
    
    allOpts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'trans-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === current.a) {
                score++;
                scoreVal.innerText = score;
                logDisplay.innerText = "¡Traducción correcta!";
                logDisplay.style.color = "#00ff00";
                setTimeout(nextSignal, 1000);
            } else {
                logDisplay.innerText = "Error de frecuencia. Reintenta.";
                logDisplay.style.color = "#ff4b2b";
            }
        };
        optionsArea.appendChild(btn);
    });
}

nextSignal();