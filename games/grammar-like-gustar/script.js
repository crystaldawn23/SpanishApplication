const personLabel = document.getElementById('person-label');
const objectLabel = document.getElementById('object-label');
const personIcon = document.getElementById('person-icon');
const objectIcon = document.getElementById('object-icon');
const pSlot = document.getElementById('pronoun-slot');
const vSlot = document.getElementById('verb-slot');

let score = 0;
let userP = "";
let userV = "";

const data = {
    pronouns: ["me", "te", "le", "nos", "les"],
    challenges: [
        { label: "A ti", icon: "👤", p: "te", obj: "la pizza", oIcon: "🍕", v: "gusta", vOpts: ["gusta", "gustan"] },
        { label: "A ellos", icon: "👥", p: "les", obj: "los libros", oIcon: "📚", v: "encantan", vOpts: ["encanta", "encantan"] },
        { label: "A nosotros", icon: "👪", p: "nos", obj: "el fútbol", oIcon: "⚽", v: "fascina", vOpts: ["fascina", "fascinan"] },
        { label: "A ella", icon: "👩", p: "le", obj: "las verduras", oIcon: "🥦", v: "molestan", vOpts: ["molesta", "molestan"] },
        { label: "A mí", icon: "🙋", p: "me", obj: "el café", oIcon: "☕", v: "importa", vOpts: ["importa", "importan"] }
    ]
};

let current = null;

function initRound() {
    current = data.challenges[Math.floor(Math.random() * data.challenges.length)];
    personLabel.innerText = current.label;
    personIcon.innerText = current.icon;
    objectLabel.innerText = current.obj;
    objectIcon.innerText = current.oIcon;
    pSlot.innerText = "___";
    vSlot.innerText = "_______";
    userP = ""; userV = "";
    
    setupButtons();
}

function setupButtons() {
    const pGrid = document.getElementById('pronoun-btns');
    const vGrid = document.getElementById('verb-btns');
    pGrid.innerHTML = ''; vGrid.innerHTML = '';

    data.pronouns.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = p;
        btn.onclick = () => { userP = p; pSlot.innerText = p; check(); };
        pGrid.appendChild(btn);
    });

    current.vOpts.forEach(v => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = v;
        btn.onclick = () => { userV = v; vSlot.innerText = v; check(); };
        vGrid.appendChild(btn);
    });
}

function check() {
    if (userP === current.p && userV === current.v) {
        score += 100;
        document.getElementById('score-val').innerText = score;
        setTimeout(initRound, 1000);
    }
}

initRound();