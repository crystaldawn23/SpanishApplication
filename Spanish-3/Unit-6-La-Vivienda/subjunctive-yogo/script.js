const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(t){if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const n=audioCtx.currentTime;if(t==='success'){o.frequency.setValueAtTime(500,n);o.frequency.exponentialRampToValueAtTime(1000,n+0.1);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.1)}else{o.type='sawtooth';o.frequency.setValueAtTime(100,n);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.2)}}

const verbList = [
    { eng: "HAVE", span: "tener", stem: "TENG", type: "er" },
    { eng: "PUT", span: "poner", stem: "PONG", type: "er" },
    { eng: "SAY", span: "decir", stem: "DIG", type: "ir" },
    { eng: "COME", span: "venir", stem: "VENG", type: "ir" },
    { eng: "LEAVE", span: "salir", stem: "SALG", type: "ir" },
    { eng: "BRING", span: "traer", stem: "TRAIG", type: "er" },
    { eng: "HEAR", span: "oír", stem: "OIG", type: "ir" },
    { eng: "DO/MAKE", span: "hacer", stem: "HAG", type: "er" }
];

const subjects = [
    { label: "YO", end: "A" },
    { label: "TÚ", end: "AS" },
    { label: "USTED", end: "A" },
    { label: "ÉL", end: "A" },
    { label: "NOSOTROS", end: "AMOS" },
    { label: "ELLOS", end: "AN" }
];

const allStems = [...new Set(verbList.map(v => v.stem))].sort();
const allEndings = ["A", "AS", "AMOS", "AN", "E", "ES", "EMOS", "EN"];

let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;

function updateUI() {
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
    document.getElementById("progress-bar").style.width = Math.min((wins / finalGoal) * 100, 100) + "%";
}

function nextRound() {
    currentVerb = verbList[Math.floor(Math.random() * verbList.length)];
    currentSubIdx = Math.floor(Math.random() * subjects.length);
    const targetEl = document.getElementById("target");
    
    targetEl.innerText = (gameLevel === 1) ? 
        `${subjects[currentSubIdx].label} + ${currentVerb.span.toUpperCase()}` : 
        `${subjects[currentSubIdx].label} (${currentVerb.eng})`;
    
    updateUI();
}

function change(col, dir) {
    let opts = col === 0 ? subjects : (col === 1 ? allStems : allEndings);
    current[col] = (current[col] + dir + opts.length) % opts.length;
    document.getElementById(`slot-${col}`).innerText = col === 0 ? subjects[current[0]].label : opts[current[col]];
}

function check() {
    const msg = document.getElementById("msg-box");
    const correctStem = currentVerb.stem;
    const correctEnd = subjects[currentSubIdx].end;

    const selStem = allStems[current[1]];
    const selEnd = allEndings[current[2]];

    if (current[0] === currentSubIdx && selStem === correctStem && selEnd === correctEnd) {
        playSound('success'); 
        wins++;
        if (wins >= finalGoal) { document.getElementById("victory-overlay").classList.remove("hidden"); return; }
        if (wins >= 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            document.getElementById("level-indicator").innerText = "LEVEL 2: YO-GO MASTERY";
        }
        msg.style.color = "var(--archer-green)";
        msg.innerText = "¡EXCELENTE!";
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1000);
    } else {
        playSound('error'); 
        if (wins > 0) wins--;
        msg.style.color = "var(--danger)";
        msg.innerText = "Remember the 'Go' stem!";
        updateUI();
        setTimeout(() => { msg.innerText = ""; }, 2000);
    }
}

window.onload = nextRound;