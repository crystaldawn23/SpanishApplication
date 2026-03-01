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
    { eng: "SERVED", span: "servir", regStem: "SERV", shoeStem: "SIRV", type: "ir" },
    { eng: "ORDERED/ASKED", span: "pedir", regStem: "PED", shoeStem: "PID", type: "ir" },
    { eng: "REPEATED", span: "repetir", regStem: "REPET", shoeStem: "REPIT", type: "ir" },
    { eng: "FOLLOWED", span: "seguir", regStem: "SEGU", shoeStem: "SIGU", type: "ir" },
    { eng: "PREFERRED", span: "preferir", regStem: "PREFER", shoeStem: "PREFIR", type: "ir" },
    { eng: "FELT", span: "sentir", regStem: "SENT", shoeStem: "SINT", type: "ir" },
    { eng: "SLEPT", span: "dormir", regStem: "DORM", shoeStem: "DURM", type: "ir" },
    { eng: "DIED", span: "morir", regStem: "MOR", shoeStem: "MUR", type: "ir" }
];

const subjects = [
    { label: "YO", end: "Í" },
    { label: "TÚ", end: "ISTE" },
    { label: "USTED", end: "IÓ" },
    { label: "ÉL/ELLA", end: "IÓ" },
    { label: "NOSOTROS", end: "IMOS" },
    { label: "USTEDES", end: "IERON" },
    { label: "ELLOS/ELLAS", end: "IERON" }
];

const allStems = [...new Set(verbList.flatMap(v => [v.regStem, v.shoeStem]))].sort();
const allEndings = ["Í", "ISTE", "IÓ", "IMOS", "IERON"];

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
    
    // Logic: If index is 2, 3, 5, or 6 (Usted, Él/Ella, Ustedes, Ellos/as), use shoeStem.
    let correctStem = [2, 3, 5, 6].includes(currentSubIdx) ? currentVerb.shoeStem : currentVerb.regStem;
    let correctEnd = subjects[currentSubIdx].end;

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