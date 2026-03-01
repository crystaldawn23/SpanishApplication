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
    { eng: "SPEAK", span: "hablar", stem: "HABL", type: "ar" },
    { eng: "EAT", span: "comer", stem: "COM", type: "er" },
    { eng: "LIVE", span: "vivir", stem: "VIV", type: "ir" },
    { eng: "DRINK", span: "beber", stem: "BEB", type: "er" },
    { eng: "BUY", span: "comprar", stem: "COMPR", type: "ar" },
    { eng: "WRITE", span: "escribir", stem: "ESCRIB", type: "ir" },
    { eng: "RUN", span: "correr", stem: "CORR", type: "er" },
    { eng: "LOOK AT", span: "mirar", stem: "MIR", type: "ar" }
];

const subjects = [
    { label: "YO", ar: "E", erir: "A" },
    { label: "TÚ", ar: "ES", erir: "AS" },
    { label: "USTED", ar: "E", erir: "A" },
    { label: "ÉL", ar: "E", erir: "A" },
    { label: "NOSOTROS", ar: "EMOS", erir: "AMOS" },
    { label: "ELLOS", ar: "EN", erir: "AN" }
];

const allStems = [...new Set(verbList.map(v => v.stem))].sort();
const allEndings = ["E", "ES", "EMOS", "EN", "A", "AS", "AMOS", "AN"];

let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;
let lastV = -1, lastS = -1;

function updateUI() {
    const bar = document.getElementById("progress-bar");
    const score = document.getElementById("score-counter");
    if(bar) bar.style.width = (wins / finalGoal) * 100 + "%";
    if(score) score.innerText = `${wins}/${finalGoal}`;
}

function nextRound() {
    let newV, newS;
    do {
        newV = Math.floor(Math.random() * verbList.length);
        newS = Math.floor(Math.random() * subjects.length);
    } while (newV === lastV && newS === lastS);

    currentVerb = verbList[newV];
    currentSubIdx = newS;
    lastV = newV;
    lastS = newS;

    const target = document.getElementById("target");
    if(target) {
        // Keeps the focus on the grammar mechanics
        target.innerText = (gameLevel === 1) ? 
            `${subjects[currentSubIdx].label} + ${currentVerb.span.toUpperCase()}` : 
            `${subjects[currentSubIdx].label} (${currentVerb.eng})`;
    }
    updateUI();
}

function change(col, dir) {
    let opts = col === 0 ? subjects : (col === 1 ? allStems : allEndings);
    current[col] = (current[col] + dir + opts.length) % opts.length;
    let val = col === 0 ? subjects[current[0]].label : opts[current[col]];
    document.getElementById(`slot-${col}`).innerText = val;
}

function check() {
    const msg = document.getElementById("msg-box");
    let correctEnd = (currentVerb.type === "ar") ? subjects[currentSubIdx].ar : subjects[currentSubIdx].erir;
    let correctStem = currentVerb.stem;

    const selStem = allStems[current[1]];
    const selEnd = allEndings[current[2]];

    if (current[0] === currentSubIdx && selStem === correctStem && selEnd === correctEnd) {
        playSound('success');
        wins++;
        updateUI();
        if (wins >= finalGoal) { document.getElementById("victory-overlay").classList.remove("hidden"); return; }
        if(msg) { msg.style.color = "var(--archer-green)"; msg.innerText = "¡EXCELENTE!"; }
        
        if (wins === 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            const indicator = document.getElementById("level-indicator");
            if(indicator) indicator.innerText = "LEVEL 2: VOCAB CHALLENGE";
        }
        setTimeout(() => { if(msg) msg.innerText = ""; nextRound(); }, 1200);
    } else {
        playSound('error');
        if (wins > 0) wins--;
        if(msg) { msg.style.color = "var(--danger)"; msg.innerText = "Switch the ending! -1 Point"; }
        updateUI();
    }
}

window.onload = () => { nextRound(); };