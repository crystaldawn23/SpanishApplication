// --- AUDIO SYSTEM ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(t){if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const n=audioCtx.currentTime;if(t==='success'){o.frequency.setValueAtTime(500,n);o.frequency.exponentialRampToValueAtTime(1000,n+0.1);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.1)}else{o.type='sawtooth';o.frequency.setValueAtTime(100,n);g.gain.setValueAtTime(0.1,n);o.start();o.stop(n+0.2)}}

// --- COMPREHENSIVE VERB DATABASE ---
const verbList = [
    { span: "tener", pres:["TENGO","TIENES","TIENE","TENEMOS","TIENEN"], pret:["TUVE","TUVISTE","TUVO","TUVIMOS","TUVIERON"], imp:["TENÍA","TENÍAS","TENÍA","TENÍAMOS","TENÍAN"], sub:["TENGA","TENGAS","TENGA","TENGAMOS","TENGAN"] },
    { span: "ser", pres:["SOY","ERES","ES","SOMOS","SON"], pret:["FUI","FUISTE","FUE","FUIMOS","FUERON"], imp:["ERA","ERAS","ERA","ÉRAMOS","ERAN"], sub:["SEA","SEAS","SEA","SEAMOS","SEAN"] },
    { span: "ir", pres:["VOY","VAS","VA","VAMOS","VAN"], pret:["FUI","FUISTE","FUE","FUIMOS","FUERON"], imp:["IBA","IBAS","IBA","ÍBAMOS","IBAN"], sub:["VAYA","VAYAS","VAYA","VAYAMOS","VAYAN"] },
    { span: "hacer", pres:["HAGO","HACES","HACE","HACEMOS","HACEN"], pret:["HICE","HICISTE","HIZO","HICIMOS","HICIERON"], imp:["HACÍA","HACÍAS","HACÍA","HACÍAMOS","HACÍAN"], sub:["HAGA","HAGAS","HAGA","HAGAMOS","HAGAN"] },
    { span: "estar", pres:["ESTOY","ESTÁS","ESTÁ","ESTAMOS","ESTÁN"], pret:["ESTUVE","ESTUVISTE","ESTUVO","ESTUVIMOS","ESTUVIERON"], imp:["ESTABA","ESTABAS","ESTABA","ESTÁBAMOS","ESTABAN"], sub:["ESTÉ","ESTÉS","ESTÉ","ESTEMOS","ESTÉN"] },
    { span: "poder", pres:["PUEDO","PUEDES","PUEDE","PODEMOS","PUEDEN"], pret:["PUDE","PUDISTE","PUDO","PUDIMOS","PUDIERON"], imp:["PODÍA","PODÍAS","PODÍA","PODÍAMOS","PODÍAN"], sub:["PUEDA","PUEDAS","PUEDA","PODAMOS","PUEDAN"] },
    { span: "dormir", pres:["DUERMO","DUERMES","DUERME","DORMIMOS","DUERMEN"], pret:["DORMÍ","DORMISTE","DORMIÓ","DORMIMOS","DURMIERON"], imp:["DORMÍA","DORMÍAS","DORMÍA","DORMÍAMOS","DORMÍAN"], sub:["DUERMA","DUERMAS","DUERMA","DURMAMOS","DUERMAN"] },
    { span: "saber", pres:["SÉ","SABES","SABE","SABEMOS","SABEN"], pret:["SUPE","SUPISTE","SUPO","SUPIMOS","SUPIERON"], imp:["SABÍA","SABÍAS","SABÍA","SABÍAMOS","SABÍAN"], sub:["SEPA","SEPAS","SEPA","SEPAMOS","SEPAN"] },
    { span: "poner", pres:["PONGO","PONES","PONE","PONEMOS","PONEN"], pret:["PUSE","PUSISTE","PUSO","PUSIMOS","PUSIERON"], imp:["PONÍA","PONÍAS","PONÍA","PONÍAMOS","PONÍAN"], sub:["PONGA","PONGAS","PONGA","PONGAMOS","PONGAN"] },
    { span: "leer", pres:["LEO","LEES","LEE","LEEMOS","LEEN"], pret:["LEÍ","LEÍSTE","LEYÓ","LEÍMOS","LEYERON"], imp:["LEÍA","LEÍAS","LEÍA","LEÍAMOS","LEÍAN"], sub:["LEA","LEAS","LEA","LEAMOS","LEAN"] },
    { span: "querer", pres:["QUIERO","QUIERES","QUIERE","QUEREMOS","QUIEREN"], pret:["QUISE","QUISISTE","QUISO","QUISIMOS","QUISIERON"], imp:["QUERÍA","QUERÍAS","QUERÍA","QUERÍAMOS","QUERÍAN"], sub:["QUIERA","QUIERAS","QUIERA","QUERAMOS","QUIERAN"] },
    { span: "decir", pres:["DIGO","DICES","DICE","DECIMOS","DICEN"], pret:["DIJE","DIJISTE","DIJO","DIJIMOS","DIJERON"], imp:["DECÍA","DECÍAS","DECÍA","DECÍAMOS","DECÍAN"], sub:["DIGA","DIGAS","DIGA","DIGAMOS","DIGAN"] }
];

const subjects = ["YO", "TÚ", "ÉL/ELLA", "USTED", "NOSOTROS", "ELLOS"];
const tenses = ["PRESENT", "PRETERITE", "IMPERFECT", "SUBJUNCTIVE"];

const allStems = ["TEN", "TIEN", "TUV", "TENG", "SO", "ER", "FU", "E", "SEA", "VO", "VA", "VAY", "HAG", "HAC", "HIC", "HIZ", "EST", "ESTU", "PUED", "POD", "PUD", "DUERM", "DORM", "DURM", "S", "SAB", "SUP", "SEP", "PONG", "PON", "PUS", "LE", "LEY", "QUIER", "QUER", "QUIS", "DIG", "DIC", "DIJ"].sort();
const allEndings = ["GO", "ES", "E", "EMOS", "EN", "Y", "S", "MOS", "N", "I", "ISTE", "IMOS", "IERON", "A", "AS", "AMOS", "AN", "É", "ASTE", "Ó", "ARON", "ÍA", "ÍAS", "ÍAMOS", "ÍAN", "ABA", "ABAS", "ÁBAMOS", "ABAN", "OY", "ÁS", "Á", "ÉS", "ÉN", "Í", "ÍSTE", "YÓ", "ÍMOS", "YERON", "O"].sort();

let current = [0, 0, 0], currentVerb, currentSubIdx, currentTense, wins = 0, finalGoal = 30;

function updateUI() {
    document.getElementById("score-counter").innerText = wins + "/" + finalGoal;
    document.getElementById("progress-bar").style.width = (wins / finalGoal) * 100 + "%";
}

function nextRound() {
    currentVerb = verbList[Math.floor(Math.random() * verbList.length)];
    currentSubIdx = Math.floor(Math.random() * subjects.length);
    currentTense = tenses[Math.floor(Math.random() * tenses.length)];
    document.getElementById("target").innerText = subjects[currentSubIdx] + " + " + currentVerb.span.toUpperCase();
    document.getElementById("level-indicator").innerText = "TENSE: " + currentTense;
    updateUI();
}

function change(col, dir) {
    let opts = (col === 0) ? subjects : (col === 1 ? allStems : allEndings);
    current[col] = (current[col] + dir + opts.length) % opts.length;
    document.getElementById("slot-" + col).innerText = opts[current[col]];
}

function check() {
    console.log("Check button clicked"); // Safety log
    const msg = document.getElementById("msg-box");
    let arrayIdx = currentSubIdx;
    if (currentSubIdx === 3) arrayIdx = 2; 
    if (currentSubIdx === 5) arrayIdx = 4; 

    const tenseKey = currentTense.toLowerCase().substring(0, 4);
    const correctFullForm = currentVerb[tenseKey][arrayIdx];
    
    const selStem = document.getElementById("slot-1").innerText;
    const selEnd = document.getElementById("slot-2").innerText;
    const selected = (selStem + selEnd).replace(/\s/g, '');

    if (selected === correctFullForm) {
        playSound('success');
        wins++;
        if (wins >= finalGoal) {
            document.getElementById("victory-overlay").classList.remove("hidden");
            return;
        }
        msg.style.color = "#10b981";
        msg.innerText = "¡EXCELENTE!";
        setTimeout(function() { msg.innerText = ""; nextRound(); }, 1000);
    } else {
        playSound('error');
        if (wins > 0) wins--;
        msg.style.color = "#ef4444";
        msg.innerText = "Incorrect! (" + correctFullForm + ")";
        updateUI();
        setTimeout(function() { msg.innerText = ""; }, 2500);
    }
}

window.onload = function() {
    nextRound();
    console.log("Game Loaded");
};