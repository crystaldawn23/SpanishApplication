const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(t){if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const n=audioCtx.currentTime;if(t==='success'){o.frequency.setValueAtTime(500,n);o.frequency.exponentialRampToValueAtTime(1000,n+0.1);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.1)}else{o.type='sawtooth';o.frequency.setValueAtTime(100,n);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.2)}}

const verbList = [
    { eng: "SLEEP", span: "dormir", boot: "DUERM", nos: "DURM", type: "ir" },
    { eng: "WANT", span: "querer", boot: "QUIER", nos: "QUER", type: "er" },
    { eng: "THINK", span: "pensar", boot: "PIENS", nos: "PENS", type: "ar" },
    { eng: "FEEL", span: "sentir", boot: "SIENT", nos: "SINT", type: "ir" },
    { eng: "SERVE", span: "servir", boot: "SIRV", nos: "SIRV", type: "ir" },
    { eng: "RETURN", span: "volver", boot: "VUELV", nos: "VOLV", type: "er" },
    { eng: "ASK FOR", span: "pedir", boot: "PID", nos: "PID", type: "ir" }
];

const subjects = [
    { label: "YO", ar: "E", erir: "A" },
    { label: "TÚ", ar: "ES", erir: "AS" },
    { label: "USTED", ar: "E", erir: "A" },
    { label: "ÉL", ar: "E", erir: "A" },
    { label: "NOSOTROS", ar: "EMOS", erir: "AMOS" },
    { label: "ELLOS", ar: "EN", erir: "AN" }
];

const allStems = [...new Set(verbList.flatMap(v => [v.boot, v.nos]))].sort();
const allEndings = ["A", "AS", "AMOS", "AN", "E", "ES", "EMOS", "EN"].sort();

let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;

function updateUI() {
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
    document.getElementById("progress-bar").style.width = Math.min((wins / finalGoal) * 100, 100) + "%";
}

function nextRound() {
    currentVerb = verbList[Math.floor(Math.random() * verbList.length)];
    currentSubIdx = Math.floor(Math.random() * subjects.length);
    const targetEl = document.getElementById("target");
    
    // Level 1: Spanish verb | Level 2: English verb
    targetEl.innerText = (gameLevel === 1) ? 
        `${subjects[currentSubIdx].label} + ${currentVerb.span.toUpperCase()}` : 
        `${subjects[currentSubIdx].label} (${currentVerb.eng})`;
    
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
    
    // STEM: If subject is NOSOTROS (index 4), use .nos. Otherwise use .boot.
    const correctStem = (current[0] === 4) ? currentVerb.nos : currentVerb.boot;
    
    // ENDING: ar verbs use subjects[].ar | er/ir verbs use subjects[].erir
    const correctEnd = (currentVerb.type === "ar") ? 
        subjects[current[0]].ar : subjects[current[0]].erir;

    const selStem = allStems[current[1]];
    const selEnd = allEndings[current[2]];

    if (current[0] === currentSubIdx && selStem === correctStem && selEnd === correctEnd) {
        playSound('success'); 
        wins++;
        if (wins >= finalGoal) { document.getElementById("victory-overlay").classList.remove("hidden"); return; }
        if (wins >= 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            document.getElementById("level-indicator").innerText = "LEVEL 2: STEM MASTERY";
        }
        msg.style.color = "var(--archer-green)";
        msg.innerText = "¡EXCELENTE!";
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1000);
    } else {
        playSound('error'); 
        if (wins > 0) wins--;
        msg.style.color = "var(--danger)";
        msg.innerText = (current[0] === 4 && currentVerb.type === "ir") ? 
            "Trap! -ir verbs use 'u' or 'i' in nosotros." : "Check the boot change!";
        updateUI();
        setTimeout(() => { msg.innerText = ""; }, 2000);
    }
}

// THE IGNITION: Starts the first round immediately
window.onload = nextRound;