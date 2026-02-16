const player = document.getElementById('player');
const promptText = document.getElementById('prompt-text');
const lanes = [document.getElementById('lane-1'), document.getElementById('lane-2')];

let currentLane = 0; // 0 is bottom, 1 is middle, 2 is top
let score = 0;

const levels = [
    { q: "Ustedes ___ cocinar bien.", a: "saben", alt: "conocen" },
    { q: "Yo ___ a tu padre.", a: "conozco", alt: "sé" },
    { q: "Tú ___ dónde está el cine.", a: "sabes", alt: "conoces" },
    { q: "Nosotros ___ la ciudad.", a: "conocemos", alt: "sabemos" },
    { q: "Ella ___ tocar el piano.", a: "sabe", alt: "conoce" },
    { q: "Ellos ___ ese restaurante.", a: "conocen", alt: "saben" }
];

let currentLevel = 0;

function setupLevel() {
    const level = levels[currentLevel];
    promptText.innerText = level.q;
    
    // Clear lanes
    lanes.forEach(l => l.innerHTML = '');
    
    // Create "Logs" (Answers)
    const logA = createLog(level.a, true);
    const logB = createLog(level.alt, false);
    
    // Randomly place correct answer in a lane
    if (Math.random() > 0.5) {
        lanes[1].appendChild(logA);
        lanes[0].appendChild(logB);
    } else {
        lanes[1].appendChild(logB);
        lanes[0].appendChild(logA);
    }
}

function createLog(text, isCorrect) {
    const div = document.createElement('div');
    div.className = 'log';
    div.innerText = text;
    div.onclick = () => {
        if (isCorrect) {
            player.style.bottom = (currentLane === 0 ? "150px" : "300px");
            setTimeout(() => {
                alert("¡Bien hecho!");
                resetPlayer();
                currentLevel = (currentLevel + 1) % levels.length;
                setupLevel();
            }, 300);
        } else {
            alert("¡Oh no!");
            resetPlayer();
        }
    };
    return div;
}

function resetPlayer() {
    player.style.bottom = "20px";
}

setupLevel();