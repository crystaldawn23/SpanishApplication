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
    // REGULARS
    { eng: "SPEAK", span: "hablar", stem: "HABL", type: "ar" },
    { eng: "EAT", span: "comer", stem: "COM", type: "er" },
    // DISHES (Irregulars)
    { eng: "GO", span: "ir", stem: "VAY", type: "irreg" },
    { eng: "BE (TEMP)", span: "estar", stem: "EST", type: "irreg_accent" },
    { eng: "BE (PERM)", span: "ser", stem: "SE", type: "irreg" },
    { eng: "KNOW", span: "saber", stem: "SEP", type: "irreg" },
    { eng: "GIVE", span: "dar", stem: "D", type: "irreg_accent" },
    // STEM-CHANGERS (End of Spanish 3 level)
    { eng: "WANT", span: "querer", stem: "QUIER", regStem: "QUER", type: "er_stem" },
    { eng: "SLEEP", span: "dormir", stem: "DUERM", regStem: "DURM", type: "ir_stem" },
    { eng: "SAY", span: "decir", stem: "DIG", type: "er" } // From "Digo"
];

const subjects = [
    { label: "YO", ar: "E", erir: "A" },
    { label: "TÚ", ar: "ES", erir: "AS" },
    { label: "USTED", ar: "E", erir: "A" },
    { label: "ÉL", ar: "E", erir: "A" },
    { label: "NOSOTROS", ar: "EMOS", erir: "AMOS" },
    { label: "ELLOS", ar: "EN", erir: "AN" }
];

const allStems = [...new Set(verbList.flatMap(v => [v.stem, v.regStem].filter(Boolean)))].sort();
const allEndings = ["E", "ES", "EMOS", "EN", "A", "AS", "AMOS", "AN", "É", "ÉS", "ÉMOS"];

let current = [0, 0, 0], currentVerb, currentSubIdx, wins = 0, finalGoal = 30;
let lastV = -1, lastS = -1;

function updateUI() {
    document.getElementById("progress-bar").style.width = (wins / finalGoal) * 100 + "%";
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
}

function nextRound() {
    let newV, newS;
    do { newV = Math.floor(Math.random() * verbList.length); newS = Math.floor(Math.random() * subjects.length); } while (newV === lastV && newS === lastS);
    currentVerb = verbList[newV]; currentSubIdx = newS; lastV = newV; lastS = newS;
    document.getElementById("target").innerText = `${subjects[currentSubIdx].label} + ${currentVerb.span.toUpperCase()}`;
    updateUI();
}

function change(col, dir) {
    let opts = col === 0 ? subjects : (col === 1 ? allStems : allEndings);
    current[col] = (current[col] + dir + opts.length) % opts.length;
    document.getElementById(`slot-${col}`).innerText = col === 0 ? subjects[current[0]].label : opts[current[col]];
}

function check() {
    const msg = document.getElementById("msg-box");
    let correctStem = currentVerb.stem;
    let correctEnd = (currentVerb.type === "ar" || currentVerb.type === "er_stem" && currentVerb.span === "pensar") ? subjects[currentSubIdx].ar : subjects[currentSubIdx].erir;

    // Handle Nosotros Stem-Change (ir verbs)
    if (currentSubIdx === 4 && currentVerb.regStem) { correctStem = currentVerb.regStem; }
    
    // Handle DISHES and accents (simplified for the game logic)
    if (currentVerb.span === "ir") correctEnd = (currentSubIdx === 4) ? "AMOS" : subjects[currentSubIdx].erir;
    
    const selStem = allStems[current[1]];
    const selEnd = allEndings[current[2]];

    if (current[0] === currentSubIdx && selStem === correctStem && selEnd === correctEnd) {
        playSound('success'); wins++; updateUI();
        if (wins >= finalGoal) { document.getElementById("victory-overlay").classList.remove("hidden"); return; }
        msg.style.color = "var(--archer-green)"; msg.innerText = "¡EXCELENTE!";
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1200);
    } else {
        playSound('error'); if (wins > 0) wins--;
        msg.style.color = "var(--danger)"; msg.innerText = "Check your stems/irregulars! -1";
        updateUI();
    }
}
window.onload = nextRound;