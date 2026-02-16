const verbPrompt = document.getElementById('verb-prompt');
const sentenceBlank = document.getElementById('blank');
const buttonGrid = document.getElementById('button-grid');
const scoreDisplay = document.getElementById('score');

let score = 0;

const challenges = [
    { verb: "HACER", sentence: "Yo _____ ejercicio.", correct: "hago", options: ["hago", "hace", "haco", "hacemos"] },
    { verb: "PONER", sentence: "Yo _____ la mesa.", correct: "pongo", options: ["pono", "pongo", "pone", "ponemos"] },
    { verb: "TRAER", sentence: "Yo _____ mi mochila.", correct: "traigo", options: ["traigo", "trao", "trae", "traemos"] },
    { verb: "SALIR", sentence: "Yo _____ con amigos.", correct: "salgo", options: ["salgo", "salo", "sale", "salimos"] },
    { verb: "OÍR", sentence: "Yo _____ la música.", correct: "oigo", options: ["oigo", "oyo", "oye", "oímos"] },
    { verb: "SUPONER", sentence: "Yo _____ que sí.", correct: "supongo", options: ["supono", "supongo", "supone", "suponemos"] },
    { verb: "VER", sentence: "Yo _____ la tele.", correct: "veo", options: ["veo", "vego", "ves", "vimos"] },
    { verb: "SABER", sentence: "Yo _____ la respuesta.", correct: "sé", options: ["sé", "sabo", "sabe", "sabemos"] }
];

function nextRound() {
    const round = challenges[Math.floor(Math.random() * challenges.length)];
    verbPrompt.innerText = round.verb;
    sentenceBlank.innerText = "_____";
    
    buttonGrid.innerHTML = '';
    round.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'go-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === round.correct) {
                score += 100;
                scoreDisplay.innerText = score;
                sentenceBlank.innerText = opt;
                setTimeout(nextRound, 400);
            } else {
                score = Math.max(0, score - 50);
                scoreDisplay.innerText = score;
                btn.style.backgroundColor = "#ef4444";
            }
        };
        buttonGrid.appendChild(btn);
    });
}

nextRound();