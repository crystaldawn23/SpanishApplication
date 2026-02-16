const originalDisplay = document.getElementById('original-sentence');
const dropZone = document.getElementById('drop-zone');
const scoreDisplay = document.getElementById('score-val');

let score = 0;
let currentCorrect = "";

const puzzles = [
    { sentence: "Tengo <span>la maleta</span>.", verb: "tengo", correct: "la" },
    { sentence: "Compro <span>el pasaje</span>.", verb: "compro", correct: "lo" },
    { sentence: "Llevo <span>los pasaportes</span>.", verb: "llevo", correct: "los" },
    { sentence: "Hago <span>las maletas</span>.", verb: "hago", correct: "las" },
    { sentence: "Busco <span>a la empleada</span>.", verb: "busco", correct: "la" },
    { sentence: "Escribo <span>las cartas</span>.", verb: "escribo", correct: "las" },
    { sentence: "Miramos <span>el mapa</span>.", verb: "miramos", correct: "lo" },
    { sentence: "Lees <span>los libros</span>.", verb: "lees", correct: "los" }
];

function loadPuzzle() {
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    originalDisplay.innerHTML = puzzle.sentence;
    document.getElementById('transformed-sentence').innerHTML = `<span id="drop-zone">?</span> ${puzzle.verb}.`;
    currentCorrect = puzzle.correct;
}

function checkAnswer(choice) {
    if (choice === currentCorrect) {
        score += 100;
        scoreDisplay.innerText = score;
        document.getElementById('drop-zone').innerText = choice.toUpperCase();
        document.getElementById('drop-zone').style.color = "#4ade80";
        setTimeout(loadPuzzle, 800);
    } else {
        score = Math.max(0, score - 50);
        scoreDisplay.innerText = score;
        const dz = document.getElementById('drop-zone');
        dz.innerText = "X";
        dz.style.color = "#ef4444";
    }
}

loadPuzzle();