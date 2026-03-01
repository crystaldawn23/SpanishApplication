const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'success') {
        // High-pitched "Ding"
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        osc.start();
        osc.stop(now + 0.1);
    } else {
        // Low-pitched "Buzz"
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        gain.gain.setValueAtTime(0.1, now);
        osc.start();
        osc.stop(now + 0.2);
    }
}

const verbList = [
    { eng: "PLAYED", span: "jugar", stem: "JUG", type: "ar" },
    { eng: "WATCHED", span: "mirar", stem: "MIR", type: "ar" },
    { eng: "TALKED", span: "hablar", stem: "HABL", type: "ar" },
    { eng: "LISTENED", span: "escuchar", stem: "ESCUCH", type: "ar" },
    { eng: "WAITED", span: "esperar", stem: "ESPER", type: "ar" },
    { eng: "DANCED", span: "bailar", stem: "BAIL", type: "ar" },
    { eng: "ATE", span: "comer", stem: "COM", type: "er" },
    { eng: "DRANK", span: "beber", stem: "BEB", type: "er" },
    { eng: "RAN", span: "correr", stem: "CORR", type: "er" },
    { eng: "LIVED", span: "vivir", stem: "VIV", type: "ir" },
    { eng: "WROTE", span: "escribir", stem: "ESCRIB", type: "ir" },
    { eng: "OPENED", span: "abrir", stem: "ABR", type: "ir" }
];

const subjects = [
    { label: "YO", aER: "ABA", eER: "ÍA" },
    { label: "TÚ", aER: "ABAS", eER: "ÍAS" },
    { label: "USTED", aER: "ABA", eER: "ÍA" },
    { label: "ÉL/ELLA", aER: "ABA", eER: "ÍA" },
    { label: "NOSOTROS", aER: "ÁBAMOS", eER: "ÍAMOS" },
    { label: "USTEDES", aER: "ABAN", eER: "ÍAN" },
    { label: "ELLOS/ELLAS", aER: "ABAN", eER: "ÍAN" }
];

const allStems = [...new Set(verbList.map(v => v.stem))].sort();
const allEndings = ["ABA", "ABAS", "ÁBAMOS", "ABAN", "ÍA", "ÍAS", "ÍAMOS", "ÍAN"];

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
    let correctEnd = (currentVerb.type === "ar") ? subjects[currentSubIdx].aER : subjects[currentSubIdx].eER;
    const selectedStem = allStems[current[1]];
    const selectedEnd = allEndings[current[2]];

    if (current[0] === currentSubIdx && selectedStem === currentVerb.stem && selectedEnd === correctEnd) {
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