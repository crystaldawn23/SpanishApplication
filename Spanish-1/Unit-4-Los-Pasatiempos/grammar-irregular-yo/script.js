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
    { eng: "SAY/TELL", span: "decir", yo: "DIG", boot: "DIC", reg: "DEC", type: "ir" },
    { eng: "HAVE", span: "tener", yo: "TENG", boot: "TIEN", reg: "TEN", type: "er" },
    { eng: "COME", span: "venir", yo: "VENG", boot: "VIEN", reg: "VEN", type: "ir" },
    { eng: "DO/MAKE", span: "hacer", yo: "HAG", boot: "HAC", reg: "HAC", type: "er" },
    { eng: "PUT", span: "poner", yo: "PONG", boot: "PON", reg: "PON", type: "er" },
    { eng: "LEAVE", span: "salir", yo: "SALG", boot: "SAL", reg: "SAL", type: "ir" },
    { eng: "SUPPOSE", span: "suponer", yo: "SUPONG", boot: "SUPON", reg: "SUPON", type: "er" },
    { eng: "BRING", span: "traer", yo: "TRAIG", boot: "TRA", reg: "TRA", type: "er" },
    { eng: "SEE", span: "ver", yo: "VE", boot: "V", reg: "V", type: "er" },
    { eng: "HEAR", span: "oír", yo: "OIG", boot: "OY", reg: "O", type: "ir" }
];

const subjects = [
    { label: "YO", aER: "O", eER: "O", eIR: "O" },
    { label: "TÚ", aER: "AS", eER: "ES", eIR: "ES" },
    { label: "USTED", aER: "A", eER: "E", eIR: "E" },
    { label: "ÉL/ELLA", aER: "A", eER: "E", eIR: "E" },
    { label: "NOSOTROS", aER: "AMOS", eER: "EMOS", eIR: "IMOS" },
    { label: "USTEDES", aER: "AN", eER: "EN", eIR: "EN" },
    { label: "ELLOS/ELLAS", aER: "AN", eER: "EN", eIR: "EN" }
];

const allStems = [...new Set(verbList.flatMap(v => [v.yo, v.boot, v.reg]))].sort();
const allEndings = ["O", "AS", "ES", "A", "E", "AMOS", "EMOS", "IMOS", "AN", "EN"];

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
    
    // Logic for choosing the correct stem mutation
    let correctStem;
    if (currentSubIdx === 0) { correctStem = currentVerb.yo; } // Yo form
    else if ([1, 2, 3, 5, 6].includes(currentSubIdx)) { correctStem = currentVerb.boot; } // Boot forms
    else { correctStem = currentVerb.reg; } // Nosotros form

    let correctEnd = (currentVerb.type === "ar") ? subjects[currentSubIdx].aER : 
                     (currentVerb.type === "er") ? subjects[currentSubIdx].eER : subjects[currentSubIdx].eIR;

    const selectedStem = allStems[current[1]];
    const selectedEnd = allEndings[current[2]];

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
   