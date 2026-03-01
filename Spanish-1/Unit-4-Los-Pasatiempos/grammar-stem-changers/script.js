console.log("Verb Crank: Stem-Changers Initializing...");

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
    { eng: "THINK", span: "pensar", reg: "PENS", boot: "PIENS", type: "ar" },
    { eng: "WANT", span: "querer", reg: "QUER", boot: "QUIER", type: "er" },
    { eng: "PREFER", span: "preferir", reg: "PREFER", boot: "PREFIER", type: "ir" },
    { eng: "UNDERSTAND", span: "entender", reg: "ENTEND", boot: "ENTIEND", type: "er" },
    { eng: "CLOSE", span: "cerrar", reg: "CERR", boot: "CIERR", type: "ar" },
    { eng: "LOSE", span: "perder", reg: "PERD", boot: "PIERD", type: "er" },
    { eng: "CAN", span: "poder", reg: "POD", boot: "PUED", type: "er" },
    { eng: "SLEEP", span: "dormir", reg: "DORM", boot: "DUERM", type: "ir" },
    { eng: "RETURN", span: "volver", reg: "VOLV", boot: "VUELV", type: "er" },
    { eng: "FIND", span: "encontrar", reg: "ENCONTR", boot: "ENCUENTR", type: "ar" }
];

const subjects = [
    { label: "YO" },
    { label: "TÚ" },
    { label: "USTED" },
    { label: "ÉL" },
    { label: "NOSOTROS" },
    { label: "ELLOS" }
];

const allStems = [...new Set(verbList.flatMap(v => [v.reg, v.boot]))].sort();
const allEndings = ["O", "AS", "ES", "A", "E", "AMOS", "EMOS", "IMOS", "AN", "EN"];

let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;
let lastVerbIndex = -1, lastSubIndex = -1;

function updateUI() {
    document.getElementById("progress-bar").style.width = (wins / finalGoal) * 100 + "%";
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
}

function nextRound() {
    let newVerbIdx, newSubIdx;
    do {
        newVerbIdx = Math.floor(Math.random() * verbList.length);
        newSubIdx = Math.floor(Math.random() * subjects.length);
    } while (newVerbIdx === lastVerbIndex && newSubIdx === lastSubIndex);

    currentVerb = verbList[newVerbIdx];
    currentSubIdx = newSubIdx;
    lastVerbIndex = newVerbIdx;
    lastSubIndex = newSubIdx;

    const targetEl = document.getElementById("target");
    if (targetEl) {
        targetEl.innerText = (gameLevel === 1) ? 
            `${subjects[currentSubIdx].label} + ${currentVerb.span.toUpperCase()}` : 
            `${subjects[currentSubIdx].label} (${currentVerb.eng})`;
    }
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
    
    // LOGIC: Index 4 is Nosotros (Regular Stem). Others are Boot Stem.
    let correctStem = (currentSubIdx === 4) ? currentVerb.reg : currentVerb.boot;
    
    // LOGIC: Determine ending based on AR/ER/IR and Subject
    let correctEnd = "";
    const type = currentVerb.type;

    if (currentSubIdx === 0) correctEnd = "O";
    else if (currentSubIdx === 1) correctEnd = (type === "ar") ? "AS" : "ES";
    else if (currentSubIdx === 2 || currentSubIdx === 3) correctEnd = (type === "ar") ? "A" : "E";
    else if (currentSubIdx === 4) {
        if (type === "ar") correctEnd = "AMOS";
        else if (type === "er") correctEnd = "EMOS";
        else correctEnd = "IMOS";
    }
    else correctEnd = (type === "ar") ? "AN" : "EN";

    if (current[0] === currentSubIdx && allStems[current[1]] === correctStem && allEndings[current[2]] === correctEnd) {
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

// Ensure the game starts when the window loads
window.onload = () => {
    console.log("Window loaded, starting first round.");
    nextRound();
};