const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'success') {
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        osc.start(); osc.stop(now + 0.1);
    } else {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, now);
        gain.gain.setValueAtTime(0.1, now);
        osc.start(); osc.stop(now + 0.2);
    }
}

const verbList = [
    { eng: "DANCE", span: "bailar", stem: "BAIL", type: "ar" },
    { eng: "LOOK FOR", span: "buscar", stem: "BUSC", type: "ar" },
    { eng: "WALK", span: "caminar", stem: "CAMIN", type: "ar" },
    { eng: "HAVE DINNER", span: "cenar", stem: "CEN", type: "ar" },
    { eng: "BUY", span: "comprar", stem: "COMPR", type: "ar" },
    { eng: "ANSWER", span: "contestar", stem: "CONTEST", type: "ar" },
    { eng: "CONVERSE", span: "conversar", stem: "CONVERS", type: "ar" },
    { eng: "HAVE BREAKFAST", span: "desayunar", stem: "DESAYUN", type: "ar" },
    { eng: "REST", span: "descansar", stem: "DESCANS", type: "ar" },
    { eng: "DESIRE", span: "desear", stem: "DESE", type: "ar" },
    { eng: "DRAW", span: "dibujar", stem: "DIBUJ", type: "ar" },
    { eng: "TEACH", span: "enseñar", stem: "ENSEÑ", type: "ar" },
    { eng: "STUDY", span: "estudiar", stem: "ESTUDI", type: "ar" },
    { eng: "TALK", span: "hablar", stem: "HABL", type: "ar" },
    { eng: "ARRIVE", span: "llegar", stem: "LLEG", type: "ar" },
    { eng: "LOOK", span: "mirar", stem: "MIR", type: "ar" },
    { eng: "PRACTICE", span: "practicar", stem: "PRACTIC", type: "ar" },
    { eng: "PREPARE", span: "preparar", stem: "PREPAR", type: "ar" },
    { eng: "RETURN", span: "regresar", stem: "REGRES", type: "ar" },
    { eng: "TRAVEL", span: "viajar", stem: "VIAJ", type: "ar" }
];

const subjects = [
    { label: "YO", eAR: "O", eIR: "O" },
    { label: "TÚ", eAR: "AS", eIR: "ES" },
    { label: "USTED", eAR: "A", eIR: "E" },
    { label: "ÉL/ELLA", eAR: "A", eIR: "E" },
    { label: "NOSOTROS", eAR: "AMOS", eIR: "IMOS" },
    { label: "USTEDES", eAR: "AN", eIR: "EN" },
    { label: "ELLOS/ELLAS", eAR: "AN", eIR: "EN" }
];

const allStems = verbList.map(v => v.stem);
const allEndings = ["O", "AS", "A", "AMOS", "AN"];
let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;

function updateUI() {
    document.getElementById("progress-bar").style.width = (wins / finalGoal) * 100 + "%";
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
}

function nextRound() {
    currentVerb = verbList[Math.floor(Math.random() * verbList.length)];
    currentSubIdx = Math.floor(Math.random() * subjects.length);
    const sub = subjects[currentSubIdx].label;
    document.getElementById("target").innerText = (gameLevel === 1) ? `${sub} + ${currentVerb.span.toUpperCase()}` : `${sub} (${currentVerb.eng})`;
    updateUI();
}

function change(col, dir) {
    let len = col === 0 ? subjects.length : (col === 1 ? allStems.length : allEndings.length);
    current[col] = (current[col] + dir + len) % len;
    document.getElementById(`slot-${col}`).innerText = col === 0 ? subjects[current[0]].label : (col === 1 ? allStems[current[1]] : allEndings[current[2]]);
}

function check() {
    const msg = document.getElementById("msg-box");
    const correctEnd = currentVerb.type === "ar" ? subjects[currentSubIdx].eAR : subjects[currentSubIdx].eIR;

    // Direct comparison of current selected strings to target requirements
    const selectedSubLabel = subjects[current[0]].label;
    const selectedStem = allStems[current[1]];
    const selectedEnd = allEndings[current[2]];

    if (current[0] === currentSubIdx && selectedStem === currentVerb.stem && selectedEnd === correctEnd) {
        playSound('success');
        wins++;
        updateUI();

        if (wins >= finalGoal) {
            document.getElementById("victory-overlay").classList.remove("hidden");
            return;
        }

        msg.style.color = "var(--archer-green)"; 
        msg.innerText = "¡EXCELENTE!";

        if (wins === 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            document.getElementById("level-indicator").innerText = "LEVEL 2: MASTERY MODE";
        }
        
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1200);
    } else {
        playSound('error');
        if (wins > 0) wins--;
        msg.style.color = "var(--danger)"; 
        msg.innerText = "Try again! -1 Point";
        updateUI();
    }
}

// Ensure the game is fully loaded before the first round
window.onload = () => {
    updateUI();
    nextRound();
};