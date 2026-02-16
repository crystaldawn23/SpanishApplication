const presentDisplay = document.getElementById('present-verb');
const targetDisplay = document.getElementById('target');
const endingGrid = document.getElementById('ending-grid');
const scoreDisplay = document.getElementById('score');

let score = 0;

const challenges = [
    { pres: "Yo hablo", verb: "habl", correct: "é", opts: ["é", "í", "aste"] },
    { pres: "Tú comes", verb: "com", correct: "iste", opts: ["iste", "aste", "ió"] },
    { pres: "Ella escribe", verb: "escrib", correct: "ió", opts: ["ió", "ó", "iste"] },
    { pres: "Nosotros compramos", verb: "compr", correct: "amos", opts: ["amos", "imos", "aron"] },
    { pres: "Ellos viven", verb: "viv", correct: "ieron", opts: ["ieron", "aron", "ió"] },
    { pres: "Usted baila", verb: "bail", correct: "ó", opts: ["ó", "é", "aste"] },
    { pres: "Yo bebo", verb: "beb", correct: "í", opts: ["í", "é", "ió"] }
];

function nextWarp() {
    const round = challenges[Math.floor(Math.random() * challenges.length)];
    presentDisplay.innerText = round.pres;
    targetDisplay.innerText = "_____";
    
    endingGrid.innerHTML = '';
    round.opts.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'code-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === round.correct) {
                score += 100;
                targetDisplay.innerText = round.verb + opt;
                setTimeout(nextWarp, 800);
            } else {
                score = Math.max(0, score - 50);
                btn.style.borderColor = "red";
            }
            scoreDisplay.innerText = score;
        };
        endingGrid.appendChild(btn);
    });
}

nextWarp();