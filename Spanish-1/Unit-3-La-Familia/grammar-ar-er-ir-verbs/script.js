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
    { eng: "DANCE", span: "bailar", stem: "BAIL", type: "ar" },
    { eng: "LOOK FOR", span: "buscar", stem: "BUSC", type: "ar" },
    { eng: "WALK", span: "caminar", stem: "CAMIN", type: "ar" },
    { eng: "HAVE DINNER", span: "cenar", stem: "CEN", type: "ar" },
    { eng: "BUY", span: "comprar", stem: "COMPR", type: "ar" },
    { eng: "ANSWER", span: "contestar", stem: "CONTEST", type: "ar" },
    { eng: "CONVERSE", span: "conversar", stem: "CONVERS", type: "ar" },
    { eng: "HAVE BREAKFAST", span: "desayunar", stem: "DESAYUN", type: "ar" },
    { eng: "REST", span: "descansar", stem: "DESCANS", type: "ar" },
    { eng: "DESIRE", span: "desear", stem: "DESE", type: "ar" },
    { eng: "DRAW", span: "dibujar", stem: "DIBUJ", type: "ar" },
    { eng: "TEACH", span: "enseñar", stem: "ENSEÑ", type: "ar" },
    { eng: "STUDY", span: "estudiar", stem: "ESTUDI", type: "ar" },
    { eng: "TALK", span: "hablar", stem: "HABL", type: "ar" },
    { eng: "ARRIVE", span: "llegar", stem: "LLEG", type: "ar" },
    { eng: "LOOK", span: "mirar", stem: "MIR", type: "ar" },
    { eng: "PRACTICE", span: "practicar", stem: "PRACTIC", type: "ar" },
    { eng: "PREPARE", span: "preparar", stem: "PREPAR", type: "ar" },
    { eng: "RETURN", span: "regresar", stem: "REGRES", type: "ar" },
    { eng: "TRAVEL", span: "viajar", stem: "VIAJ", type: "ar" },
    { eng: "OPEN", span: "abrir", stem: "ABR", type: "ir" },
    { eng: "LEARN", span: "aprender", stem: "APREND", type: "er" },
    { eng: "ATTEND", span: "asistir", stem: "ASIST", type: "ir" },
    { eng: "DRINK", span: "beber", stem: "BEB", type: "er" },
    { eng: "EAT", span: "comer", stem: "COM", type: "er" },
    { eng: "SHARE", span: "compartir", stem: "COMPART", type: "ir" },
    { eng: "UNDERSTAND", span: "comprender", stem: "COMPREND", type: "er" },
    { eng: "RUN", span: "correr", stem: "CORR", type: "er" },
    { eng: "BELIEVE", span: "creer", stem: "CRE", type: "er" },
    { eng: "SHOULD", span: "deber", stem: "DEB", type: "er" },
    { eng: "DECIDE", span: "decidir", stem: "DECID", type: "ir" },
    { eng: "DESCRIBE", span: "describir", stem: "DESCRIB", type: "ir" },
    { eng: "WRITE", span: "escribir", stem: "ESCRIB", type: "ir" },
    { eng: "READ", span: "leer", stem: "LE", type: "er" },
    { eng: "RECEIVE", span: "recibir", stem: "RECIB", type: "ir" },
    { eng: "LIVE", span: "vivir", stem: "VIV", type: "ir" }
];

const subjects = [
    { label: "YO", aER: "O", eER: "O", eIR: "O" },
    { label: "TÚ", aER: "AS", eER: "ES", eIR: "ES" },
    { label: "USTED", aER: "A", eER: "E", eIR: "E" },
    { label: "ÉL/ELLA", aER: "A", eER: "E", eIR: "E" },
    { label: "NOSOTROS", aER: "AMOS", eER: "EMOS", eIR: "IMOS" },
    { label: "USTEDES", aER: "AN", eER: "EN", eIR: "EN" },
    { label: "ELLOS/ELLAS", aER: "AN", eER: "EN", eIR: "EN" } // Fixed missing endings
];

const allStems = verbList.map(v => v.stem);
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
    document.getElementById("target").innerText = (gameLevel === 1) ? `${sub} + ${currentVerb.span.toUpperCase()}` : `${sub} (${currentVerb.eng})`;
    updateUI();
}

function change(col, dir) {
    let len = col === 0 ? subjects.length : (col === 1 ? allStems.length : allEndings.length);
    current[col] = (current[col] + dir + len) % len;
    document.getElementById(`slot-${col}`).innerText = col === 0 ? subjects[current[0]].label : (col === 1 ? allStems[current[1]] : allEndings[current[2]]);
}

function check() {
    const msg = document.getElementById("msg-box");
    
    // NEW LOGIC: Determine correct ending based on AR, ER, or IR
    let correctEnd;
    if (currentVerb.type === "ar") {
        correctEnd = subjects[currentSubIdx].aER;
    } else if (currentVerb.type === "er") {
        correctEnd = subjects[currentSubIdx].eER;
    } else {
        correctEnd = subjects[currentSubIdx].eIR;
    }

    const selectedStem = allStems[current[1]];
    const selectedEnd = allEndings[current[2]];

    // Verify Subject Choice, Stem Choice, and Ending Logic
    if (current[0] === currentSubIdx && selectedStem === currentVerb.stem && selectedEnd === correctEnd) {
        playSound('success');
        wins++;
        updateUI();

        if (wins >= finalGoal) {
            document.getElementById("victory-overlay").classList.remove("hidden");
            return;
        }

        msg.style.color = "var(--archer-green)"; 
        msg.innerText = "¡EXCELENTE!";

        if (wins === 15 && gameLevel === 1) {
            gameLevel = 2;
            document.getElementById("game-container").classList.add("level-2-glow");
            document.getElementById("level-indicator").innerText = "LEVEL 2: MASTERY MODE";
        }
        
        setTimeout(() => { msg.innerText = ""; nextRound(); }, 1200);
    } else {
        playSound('error');
        if (wins > 0) wins--;
        msg.style.color = "var(--danger)"; 
        msg.innerText = "Try again! -1 Point";
        updateUI();
    }
}

window.onload = () => {
    updateUI();
    nextRound();
};