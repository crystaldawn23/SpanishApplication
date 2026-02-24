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
    { eng: "OPEN", span: "abrir", stem: "ABR", type: "ir" },
    { eng: "LEARN", span: "aprender", stem: "APREND", type: "er" },
    { eng: "ATTEND", span: "asistir", stem: "ASIST", type: "ir" },
    { eng: "DRINK", span: "beber", stem: "BEB", type: "er" },
    { eng: "EAT", span: "comer", stem: "COM", type: "er" },
    { eng: "SHARE", span: "compartir", stem: "COMPART", type: "ir" },
    { eng: "UNDERSTAND", span: "comprender", stem: "COMPREND", type: "er" },
    { eng: "RUN", span: "correr", stem: "CORR", type: "er" },
    { eng: "BELIEVE", span: "creer", stem: "CRE", type: "er" },
    { eng: "SHOULD", span: "deber", stem: "DEB", type: "er" },
    { eng: "DECIDE", span: "decidir", stem: "DECID", type: "ir" },
    { eng: "DESCRIBE", span: "describir", stem: "DESCRIB", type: "ir" },
    { eng: "WRITE", span: "escribir", stem: "ESCRIB", type: "ir" },
    { eng: "READ", span: "leer", stem: "LE", type: "er" },
    { eng: "RECEIVE", span: "recibir", stem: "RECIB", type: "ir" },
    { eng: "LIVE", span: "vivir", stem: "VIV", type: "ir" }
];

const subjects = [
    { label: "YO", eER: "O", eIR: "O" },
    { label: "TÚ", eER: "ES", eIR: "ES" },
    { label: "USTED", eER: "E", eIR: "E" },
    { label: "ÉL/ELLA", eER: "E", eIR: "E" },
    { label: "NOSOTROS", eER: "EMOS", eIR: "IMOS" },
    { label: "USTEDES", eER: "EN", eIR: "EN" },
    { label: "ELLOS/ELLAS", eER: "EN", eIR: "EN" }
];

const allStems = verbList.map(v => v.stem);
const allEndings = ["O", "ES", "E", "EMOS", "IMOS", "EN"];
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
    const correctEnd = currentVerb.type === "er" ? subjects[currentSubIdx].eER : subjects[currentSubIdx].eIR;

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