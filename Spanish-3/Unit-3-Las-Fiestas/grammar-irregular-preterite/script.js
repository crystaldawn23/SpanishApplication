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
    // U-STEMS
    { eng: "HAD", span: "tener", stem: "TUV", type: "u" },
    { eng: "MANAGED TO", span: "poder", stem: "PUD", type: "u" },
    { eng: "PUT", span: "poner", stem: "PUS", type: "u" },
    { eng: "FOUND OUT", span: "saber", stem: "SUP", type: "u" },
    { eng: "WAS (estar)", span: "estar", stem: "ESTUV", type: "u" },
    { eng: "WALKED", span: "andar", stem: "ANDUV", type: "u" },
    // I-STEMS
    { eng: "DID/MADE", span: "hacer", stem: "HIC", type: "i" }, // Note: 3rd person singular is HIZO
    { eng: "TRIED", span: "querer", stem: "QUIS", type: "i" },
    { eng: "CAME", span: "venir", stem: "VIN", type: "i" },
    // J-STEMS
    { eng: "SAID", span: "decir", stem: "DIJ", type: "j" },
    { eng: "BROUGHT", span: "traer", stem: "TRAJ", type: "j" },
    { eng: "TRANSLATED", span: "traducir", stem: "TRADUJ", type: "j" },
    { eng: "DROVE", span: "conducir", stem: "CONDUJ", type: "j" }
];

const subjects = [
    { label: "YO", end: "E" },
    { label: "TÚ", end: "ISTE" },
    { label: "USTED", end: "O" },
    { label: "ÉL/ELLA", end: "O" },
    { label: "NOSOTROS", end: "IMOS" },
    { label: "USTEDES", end: "IERON" },
    { label: "ELLOS/ELLAS", end: "IERON" }
];

const allStems = [...new Set(verbList.map(v => v.stem)), "HIZ"].sort();
const allEndings = ["E", "ISTE", "O", "IMOS", "IERON", "ERON"];

let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;

function updateUI() {
    document.getElementById("progress-bar").style.width = (wins / finalGoal) * 100 + "%";
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
}

function nextRound() {
    currentVerb = verbList[Math.floor(Math.random() * verbList.length)];
    currentSubIdx = Math.floor(Math.random() * subjects.length);
    const sub = subjects[currentSubIdx].label;
    document.getElementById("target").innerText = (gameLevel === 1) ? 
        `${sub} + ${currentVerb.span.toUpperCase()}` : `${sub} (${currentVerb.eng})`;
    updateUI();
}

function change(col, dir) {
    let opts = col === 0 ? subjects : (col === 1 ? allStems : allEndings);
    let len = opts.length;
    current[col] = (current[col] + dir + len) % len;
    let val = col === 0 ? subjects[current[0]].label : (col === 1 ? allStems[current[1]] : allEndings[current[2]]);
    document.getElementById(`slot-${col}`).innerText = val;
}

function check() {
    const msg = document.getElementById("msg-box");
    const selectedStem = allStems[current[1]];
    const selectedEnd = allEndings[current[2]];

    // 1. Correct Stem logic (Handling Hacer -> Hizo)
    let correctStem = currentVerb.stem;
    if (currentVerb.span === "hacer" && (currentSubIdx === 2 || currentSubIdx === 3)) {
        correctStem = "HIZ";
    }

    // 2. Correct Ending logic (Handling J-stems losing the 'i' in -ieron)
    let correctEnd = subjects[currentSubIdx].end;
    if (currentVerb.type === "j" && (currentSubIdx === 5 || currentSubIdx === 6)) {
        correctEnd = "ERON";
    }

    if (current[0] === currentSubIdx && selectedStem === correctStem && selectedEnd === correctEnd) {
        playSound('success');
        wins++;
        updateUI();
        if (wins >= finalGoal) { document.getElementById("victory-overlay").classList.remove("hidden"); return; }
        msg.style.color = "var(--archer-green)"; msg.innerText = "¡EXCELENTE!";
        if (wins === 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            document.getElementById("level-indicator").innerText = "LEVEL 2: MASTERY MODE";
        }
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1200);
    } else {
        playSound('error');
        if (wins > 0) wins--;
        msg.style.color = "var(--danger)"; msg.innerText = "Try again! -1 Point";
        updateUI();
    }
}

window.onload = () => { updateUI(); nextRound(); };