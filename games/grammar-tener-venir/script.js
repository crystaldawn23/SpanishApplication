const sentenceDisplay = document.getElementById('sentence-display');
const choiceGrid = document.getElementById('choice-grid');
const scoreDisplay = document.getElementById('score');

let score = 0;

const challenges = [
    { sentence: "Yo ____ a la fiesta a las ocho.", correct: "vengo", options: ["vengo", "venimos", "vienes", "vengan"] },
    { sentence: "Tú ____ mucha hambre.", correct: "tienes", options: ["tienes", "tengo", "tenéis", "tiene"] },
    { sentence: "Nosotros ____ de la escuela.", correct: "venimos", options: ["venimos", "vengo", "vienen", "vienes"] },
    { sentence: "Ellos ____ quince años.", correct: "tienen", options: ["tienen", "tiene", "tienes", "tenemos"] },
    { sentence: "Yo ____ un gato muy grande.", correct: "tengo", options: ["tengo", "tienes", "tiene", "tenemos"] },
    { sentence: "Ustedes ____ a la clase tarde.", correct: "vienen", options: ["vienen", "viene", "venimos", "vengo"] },
    { sentence: "Ella ____ mucha sed.", correct: "tiene", options: ["tiene", "tienen", "tengo", "tienes"] },
    { sentence: "Nosotros ____ que estudiar.", correct: "tenemos", options: ["tenemos", "tenéis", "tengo", "tienen"] }
];

function nextRound() {
    const round = challenges[Math.floor(Math.random() * challenges.length)];
    sentenceDisplay.innerHTML = round.sentence.replace("____", "<span>____</span>");
    
    choiceGrid.innerHTML = '';
    round.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === round.correct) {
                score += 100;
                scoreDisplay.innerText = score;
                nextRound();
            } else {
                score = Math.max(0, score - 50);
                scoreDisplay.innerText = score;
                btn.style.borderColor = "#ef4444";
            }
        };
        choiceGrid.appendChild(btn);
    });
}

nextRound();