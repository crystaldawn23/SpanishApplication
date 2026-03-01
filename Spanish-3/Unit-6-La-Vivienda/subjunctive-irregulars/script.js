const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(t){if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const n=audioCtx.currentTime;if(t==='success'){o.frequency.setValueAtTime(500,n);o.frequency.exponentialRampToValueAtTime(1000,n+0.1);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.1)}else{o.type='sawtooth';o.frequency.setValueAtTime(100,n);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.2)}}

const verbList = [
    { eng: "GIVE", span: "dar", YO: "DÉ", TÚ: "DES", ÉL: "DÉ", USTED: "DÉ", NOSOTROS: "DEMOS", ELLOS: "DEN" },
    { eng: "GO", span: "ir", YO: "VAYA", TÚ: "VAYAS", ÉL: "VAYA", USTED: "VAYA", NOSOTROS: "VAYAMOS", ELLOS: "VAYAN" },
    { eng: "BE (perm)", span: "ser", YO: "SEA", TÚ: "SEAS", ÉL: "SEA", USTED: "SEA", NOSOTROS: "SEAMOS", ELLOS: "SEAN" },
    { eng: "HAVE (helper)", span: "haber", YO: "HAYA", TÚ: "HAYAS", ÉL: "HAYA", USTED: "HAYA", NOSOTROS: "HAYAMOS", ELLOS: "HAYAN" },
    { eng: "BE (temp)", span: "estar", YO: "ESTÉ", TÚ: "ESTÉS", ÉL: "ESTÉ", USTED: "ESTÉ", NOSOTROS: "ESTEMOS", ELLOS: "ESTÉN" },
    { eng: "KNOW", span: "saber", YO: "SEPA", TÚ: "SEPAS", ÉL: "SEPA", USTED: "SEPA", NOSOTROS: "SEPAMOS", ELLOS: "SEPAN" }
];

const subjects = ["YO", "TÚ", "ÉL", "USTED", "NOSOTROS", "ELLOS"];
const allStems = ["D", "VAY", "SE", "HAY", "EST", "SEP"].sort();
const allEndings = ["A", "AS", "AMOS", "AN", "E", "ES", "EMOS", "EN", "É", "ÉS", "ÉN"].sort();

let current = [0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;

function updateUI() {
    document.getElementById("score-counter").innerText = `${wins}/${finalGoal}`;
    document.getElementById("progress-bar").style.width = Math.min((wins / finalGoal) * 100, 100) + "%";
}

function nextRound() {
    currentVerb = verbList[Math.floor(Math.random() * verbList.length)];
    currentSubIdx = Math.floor(Math.random() * subjects.length);
    const targetEl = document.getElementById("target");
    const sub = subjects[currentSubIdx];
    
    // Level checking
    targetEl.innerText = (gameLevel === 1) ? `${sub} + ${currentVerb.span.toUpperCase()}` : `${sub} (${currentVerb.eng})`;
    updateUI();
}

function change(col, dir) {
    let opts = col === 0 ? subjects : (col === 1 ? allStems : allEndings);
    current[col] = (current[col] + dir + opts.length) % opts.length;
    document.getElementById(`slot-${col}`).innerText = opts[current[col]];
}

function check() {
    const msg = document.getElementById("msg-box");
    const subName = subjects[current[0]];
    const correctFullForm = currentVerb[subName];
    
    const selStem = allStems[current[1]];
    const selEnd = allEndings[current[2]];
    const selected = selStem + selEnd;

    if (selected === correctFullForm) {
        playSound('success'); 
        wins++;
        
        // CHECK FOR VICTORY FIRST
        if (wins >= finalGoal) {
            document.getElementById("victory-overlay").classList.remove("hidden");
            updateUI();
            return; 
        }

        // CHECK FOR LEVEL UP
        if (wins >= 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            document.getElementById("level-indicator").innerText = "LEVEL 2: DISHES MASTERY";
        }
        
        msg.style.color = "var(--archer-green)";
        msg.innerText = "¡EXCELENTE!";
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1000);
    } else {
        playSound('error'); 
        if (wins > 0) wins--;
        msg.style.color = "var(--danger)";
        msg.innerText = "Check your accents/spelling!";
    }
    updateUI();
}

window.onload = nextRound;