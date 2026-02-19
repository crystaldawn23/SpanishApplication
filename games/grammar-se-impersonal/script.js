const verbSlot = document.getElementById('verb-slot');
const objectSlot = document.getElementById('object-slot');
const taskText = document.getElementById('task-description');
const scoreVal = document.getElementById('score');

let score = 0;
let userVerb = "";
let userVocab = "";

const signs = [
    { task: 'Sign: "Spanish is spoken here"', v: "habla", obj: "español", vOpts: ["habla", "hablan"], oOpts: ["español", "pastillas"] },
    { task: 'Sign: "Smoking is prohibited"', v: "prohíbe", obj: "fumar", vOpts: ["prohíbe", "prohíben"], oOpts: ["fumar", "recetas"] },
    { task: 'Sign: "Antibiotics are sold"', v: "venden", obj: "antibióticos", vOpts: ["vende", "venden"], oOpts: ["antibióticos", "el examen"] },
    { task: 'Sign: "Nurses are needed"', v: "necesitan", obj: "enfermeras", vOpts: ["necesita", "necesitan"], oOpts: ["enfermeras", "la tos"] },
    { task: 'Sign: "Wait is required"', v: "espera", obj: "un momento", vOpts: ["espera", "esperan"], oOpts: ["un momento", "los síntomas"] }
];

let currentSign = null;

function nextSign() {
    currentSign = signs[Math.floor(Math.random() * signs.length)];
    taskText.innerText = currentSign.task;
    verbSlot.innerText = "_______";
    objectSlot.innerText = "_______";
    userVerb = ""; userVocab = "";
    renderButtons();
}

function renderButtons() {
    const vGrid = document.getElementById('verb-btns');
    const oGrid = document.getElementById('vocab-btns');
    vGrid.innerHTML = ''; oGrid.innerHTML = '';

    currentSign.vOpts.forEach(v => {
        const btn = document.createElement('button');
        btn.className = 'action-btn';
        btn.innerText = v;
        btn.onclick = () => { userVerb = v; verbSlot.innerText = v; check(); };
        vGrid.appendChild(btn);
    });

    currentSign.oOpts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'action-btn';
        btn.innerText = o;
        btn.onclick = () => { userVocab = o; objectSlot.innerText = o; check(); };
        oGrid.appendChild(btn);
    });
}

function check() {
    if (userVerb === currentSign.v && userVocab === currentSign.obj) {
        score++;
        scoreVal.innerText = score;
        verbSlot.style.color = "#10b981";
        objectSlot.style.color = "#10b981";
        setTimeout(() => {
            verbSlot.style.color = "#3b82f6";
            objectSlot.style.color = "#3b82f6";
            nextSign();
        }, 1000);
    }
}

nextSign();