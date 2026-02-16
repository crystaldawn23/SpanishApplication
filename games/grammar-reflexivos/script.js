const subjectLabel = document.getElementById('subject-label');
const reflectionPhrase = document.getElementById('reflection-phrase');
const choiceGrid = document.getElementById('choice-grid');
const scoreVal = document.getElementById('score-val');

let score = 0;

const levels = [
    { sub: "YO", verb: "lavarse", correct: "me lavo", opts: ["me lavo", "te lavas", "se lava", "me lava"] },
    { sub: "TÚ", verb: "ducharse", correct: "te duchas", opts: ["te duchas", "se ducha", "me ducho", "te ducha"] },
    { sub: "ÉL", verb: "cepillarse", correct: "se cepilla", opts: ["se cepilla", "le cepilla", "me cepillo", "te cepillas"] },
    { sub: "NOSOTROS", verb: "levantarse", correct: "nos levantamos", opts: ["nos levantamos", "se levantan", "os levantáis", "nos levanta"] },
    { sub: "ELLAS", verb: "acostarse", correct: "se acuestan", opts: ["se acuestan", "se acuesta", "nos acostamos", "te acuestas"] }
];

function nextLevel() {
    const level = levels[Math.floor(Math.random() * levels.length)];
    subjectLabel.innerText = level.sub;
    reflectionPhrase.innerText = `... (${level.verb})`;
    
    choiceGrid.innerHTML = '';
    level.opts.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'verb-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === level.correct) {
                score = Math.min(100, score + 20);
                reflectionPhrase.innerText = opt;
                setTimeout(nextLevel, 800);
            } else {
                score = Math.max(0, score - 10);
                btn.style.backgroundColor = "#ef4444";
            }
            scoreVal.innerText = score;
        };
        choiceGrid.appendChild(btn);
    });
}

nextLevel();