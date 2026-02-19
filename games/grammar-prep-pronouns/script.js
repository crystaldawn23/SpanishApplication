const personCue = document.getElementById('person-cue');
const labelOptions = document.getElementById('label-options');
const conOptions = document.getElementById('con-options');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const pronouns = [
    { cue: "👤 (YO)", ans: "mí", withCon: "conmigo" },
    { cue: "🫵 (TÚ)", ans: "ti", withCon: "contigo" },
    { cue: "👨 (ÉL)", ans: "él", withCon: "con él" },
    { cue: "👩 (ELLA)", ans: "ella", withCon: "con ella" },
    { cue: "👥 (NOSOTROS)", ans: "nosotros", withCon: "con nosotros" },
    { cue: "👥 (ELLOS)", ans: "ellos", withCon: "con ellos" }
];

function nextGift() {
    current = pronouns[Math.floor(Math.random() * pronouns.length)];
    personCue.innerText = current.cue;
    renderButtons();
}

function renderButtons() {
    labelOptions.innerHTML = '';
    conOptions.innerHTML = '';

    // Standard Preposition Buttons (Para, De, A...)
    pronouns.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'label-btn';
        btn.innerText = p.ans;
        btn.onclick = () => check(p.ans, 'standard');
        labelOptions.appendChild(btn);
    });

    // Special "CON" Buttons
    const specialCons = ["conmigo", "contigo", "con él", "con nosotros"];
    specialCons.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'label-btn';
        btn.style.backgroundColor = '#27ae60';
        btn.innerText = c;
        btn.onclick = () => check(c, 'con');
        conOptions.appendChild(btn);
    });
}

function check(choice, type) {
    const isCorrect = (type === 'standard' && choice === current.ans) || 
                      (type === 'con' && choice === current.withCon);

    if (isCorrect) {
        score += 100;
        scoreVal.innerText = score;
        personCue.style.color = "#27ae60";
        setTimeout(() => {
            personCue.style.color = "#2c3e50";
            nextGift();
        }, 800);
    } else {
        personCue.style.color = "#c0392b";
        setTimeout(() => personCue.style.color = "#2c3e50", 500);
    }
}

nextGift();