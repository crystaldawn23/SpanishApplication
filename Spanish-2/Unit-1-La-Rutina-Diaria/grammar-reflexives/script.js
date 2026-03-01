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
    { eng: "WASH (SELF)", span: "lavarse", regStem: "LAV", bootStem: "LAV", type: "ar" },
    { eng: "SHAVE", span: "afeitarse", regStem: "AFEIT", bootStem: "AFEIT", type: "ar" },
    { eng: "WAKE UP", span: "despertarse", regStem: "DESPERT", bootStem: "DESPIERT", type: "ar" },
    { eng: "GO TO BED", span: "acostarse", regStem: "ACOST", bootStem: "ACUEST", type: "ar" },
    { eng: "FALL ASLEEP", span: "dormirse", regStem: "DORM", bootStem: "DUERM", type: "ir" },
    { eng: "GET DRESSED", span: "vestirse", regStem: "VEST", bootStem: "VIST", type: "ir" },
    { eng: "BRUSH (TEETH)", span: "cepillarse", regStem: "CEPILL", bootStem: "CEPILL", type: "ar" },
    { eng: "GET UP", span: "levantarse", regStem: "LEVANT", bootStem: "LEVANT", type: "ar" }
];

const subjects = [
    { label: "YO", pro: "ME", aER: "O", eER: "O", eIR: "O" },
    { label: "TÚ", pro: "TE", aER: "AS", eER: "ES", eIR: "ES" },
    { label: "USTED", pro: "SE", aER: "A", eER: "E", eIR: "E" },
    { label: "ÉL/ELLA", pro: "SE", aER: "A", eER: "E", eIR: "E" },
    { label: "NOSOTROS", pro: "NOS", aER: "AMOS", eER: "EMOS", eIR: "IMOS" },
    { label: "USTEDES", pro: "SE", aER: "AN", eER: "EN", eIR: "EN" },
    { label: "ELLOS", pro: "SE", aER: "AN", eER: "EN", eIR: "EN" }
];

const allPros = ["ME", "TE", "SE", "NOS"];
const allStems = [...new Set(verbList.flatMap(v => [v.regStem, v.bootStem]))].sort();
const allEndings = ["O", "AS", "ES", "A", "E", "AMOS", "EMOS", "IMOS", "AN", "EN"];

let current = [0, 0, 0, 0], currentVerb, currentSubIdx, gameLevel = 1, wins = 0, finalGoal = 30;
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
    let opts;
    if (col === 0) opts = subjects;
    else if (col === 1) opts = allPros;
    else if (col === 2) opts = allStems;
    else opts = allEndings;

    let len = opts.length;
    current[col] = (current[col] + dir + len) % len;
    
    let val;
    if (col === 0) val = subjects[current[0]].label;
    else if (col === 1) val = allPros[current[1]];
    else if (col === 2) val = allStems[current[2]];
    else val = allEndings[current[3]];
              
    document.getElementById(`slot-${col}`).innerText = val;
}

function check() {
    const msg = document.getElementById("msg-box");
    
    // 1. Correct Pronoun
    let correctPro = subjects[currentSubIdx].pro;
    
    // 2. Correct Stem (Boot/Reg)
    // Boot forms: Yo, Tú, Usted, Él/Ella, Ustedes, Ellos/as (Index 0,1,2,3,5,6)
    let isBoot = [0, 1, 2, 3, 5, 6].includes(currentSubIdx);
    let correctStem = isBoot ? currentVerb.bootStem : currentVerb.regStem;
    
    // 3. Correct Ending
    let correctEnd = (currentVerb.type === "ar") ? subjects[currentSubIdx].aER : 
                     (currentVerb.type === "er") ? subjects[currentSubIdx].eER : subjects[currentSubIdx].eIR;

    // The Big Verification
    if (current[0] === currentSubIdx && 
        allPros[current[1]] === correctPro && 
        allStems[current[2]] === correctStem && 
        allEndings[current[3]] === correctEnd) {
        
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