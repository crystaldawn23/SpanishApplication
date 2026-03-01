const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(t){if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const n=audioCtx.currentTime;if(t==='success'){o.frequency.setValueAtTime(500,n);o.frequency.exponentialRampToValueAtTime(1000,n+0.1);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.1)}else{o.type='sawtooth';o.frequency.setValueAtTime(100,n);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.2)}}

const verbList = [
    { eng: "LOOK FOR", span: "buscar", reg: "BUSC", change: "BUSQU" },
    { eng: "TOUCH", span: "tocar", reg: "TOC", change: "TOQU" },
    { eng: "ARRIVE", span: "llegar", reg: "LLEG", change: "LLEGU" },
    { eng: "PAY", span: "pagar", reg: "PAG", change: "PAGU" },
    { eng: "PLAY", span: "jugar", boot: "JUEGU", nos: "JUGU" },
    { eng: "START", span: "empezar", boot: "EMPIEC", nos: "EMPEC" },
    { eng: "LUNCH", span: "almorzar", boot: "ALMUERC", nos: "ALMORC" },
    { eng: "ORGANIZE", span: "organizar", reg: "ORGANIZ", change: "ORGANIC" }
];

const subjects = [
    { label: "YO", end: "E" },
    { label: "TÚ", end: "ES" },
    { label: "USTED", end: "E" },
    { label: "ÉL", end: "E" },
    { label: "NOSOTROS", end: "EMOS" },
    { label: "ELLOS", end: "EN" }
];

const allStems = [...new Set(verbList.flatMap(v => [v.reg, v.change, v.boot, v.nos].filter(Boolean)))].sort();
const allEndings = ["E", "ES", "EMOS", "EN", "A", "AS", "AMOS", "AN"];

let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;
let lastV = -1, lastS = -1;

function updateUI() {
    document.getElementById("progress-bar").style.width = (wins / finalGoal) * 100 + "%";
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
}

function nextRound() {
    let newV, newS;
    do { newV = Math.floor(Math.random() * verbList.length); newS = Math.floor(Math.random() * subjects.length); } while (newV === lastV && newS === lastS);
    currentVerb = verbList[newV]; currentSubIdx = newS; lastV = newV; lastS = newS;
    
    // Level Transition Logic
    const targetEl = document.getElementById("target");
    if (gameLevel === 1) {
        targetEl.innerText = `${subjects[currentSubIdx].label} + ${currentVerb.span.toUpperCase()}`;
    } else {
        targetEl.innerText = `${subjects[currentSubIdx].label} (${currentVerb.eng})`;
    }
    updateUI();
}

function change(col, dir) {
    let opts = [subjects, allStems, allEndings][col];
    current[col] = (current[col] + dir + opts.length) % opts.length;
    document.getElementById(`slot-${col}`).innerText = col === 0 ? subjects[current[0]].label : opts[current[col]];
}

function check() {
    const msg = document.getElementById("msg-box");
    let correctStem = currentVerb.boot ? (currentSubIdx === 4 ? currentVerb.nos : currentVerb.boot) : currentVerb.change;
    let correctEnd = subjects[currentSubIdx].end;

    if (current[0] === currentSubIdx && allStems[current[1]] === correctStem && allEndings[current[2]] === correctEnd) {
        playSound('success'); 
        wins++; 
        updateUI();
        
        if (wins >= finalGoal) { 
            document.getElementById("victory-overlay").classList.remove("hidden"); 
            return; 
        }

        // Trigger Level 2 at 15 points
        if (wins === 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            document.getElementById("level-indicator").innerText = "LEVEL 2: MASTERY MODE";
        }

        msg.style.color = "var(--archer-green)";
        msg.innerText = "¡EXCELENTE!";
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1000);
    } else {
        playSound('error'); 
        if (wins > 0) wins--;
        msg.style.color = "var(--danger)";
        msg.innerText = "Check the spelling! C->QU, G->GU, Z->C";
        updateUI();
    }
}
window.onload = nextRound;