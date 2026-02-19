const sentenceDisplay = document.getElementById('target-sentence');
const idopSlot = document.getElementById('idop-slot');
const dopSlot = document.getElementById('dop-slot');
const scoreVal = document.getElementById('score-val');

let score = 0;
let userIDOP = "";
let userDOP = "";

const trials = [
    { text: "Doy <span>el pan</span> a <span>Mario</span>.", idop: "se", dop: "lo", v: "doy" },
    { text: "Tú compras <span>la pizza</span> para <span>mí</span>.", idop: "me", dop: "la", v: "compras" },
    { text: "Ellos sirven <span>los cafés</span> a <span>nosotros</span>.", idop: "nos", dop: "los", v: "sirven" },
    { text: "Yo entrego <span>la tarea</span> a <span>ti</span>.", idop: "te", dop: "la", v: "entregas" },
    { text: "Mamá lee <span>las historias</span> a <span>los niños</span>.", idop: "se", dop: "las", v: "lee" }
];

let current = null;

function nextTrial() {
    current = trials[Math.floor(Math.random() * trials.length)];
    sentenceDisplay.innerHTML = current.text;
    document.querySelector('.verb-fixed').innerText = current.v;
    
    idopSlot.innerText = "IDOP";
    dopSlot.innerText = "DOP";
    idopSlot.classList.remove('filled');
    dopSlot.classList.remove('filled');
    userIDOP = ""; userDOP = "";
    
    renderButtons();
}

function renderButtons() {
    const idopArea = document.getElementById('idop-btns');
    const dopArea = document.getElementById('dop-btns');
    idopArea.innerHTML = ''; dopArea.innerHTML = '';

    ["me", "te", "se", "nos"].forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'p-btn';
        btn.innerText = p;
        btn.onclick = () => { userIDOP = p; idopSlot.innerText = p; idopSlot.classList.add('filled'); check(); };
        idopArea.appendChild(btn);
    });

    ["lo", "la", "los", "las"].forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'p-btn';
        btn.innerText = p;
        btn.onclick = () => { userDOP = p; dopSlot.innerText = p; dopSlot.classList.add('filled'); check(); };
        dopArea.appendChild(btn);
    });
}

function check() {
    if (userIDOP && userDOP) {
        if (userIDOP === current.idop && userDOP === current.dop) {
            score += 100;
            scoreVal.innerText = score;
            setTimeout(nextTrial, 1000);
        } else {
            score = Math.max(0, score - 50);
            scoreVal.innerText = score;
            idopSlot.style.backgroundColor = "#e94560";
            setTimeout(() => idopSlot.style.backgroundColor = "transparent", 500);
            userIDOP = ""; userDOP = "";
            idopSlot.innerText = "IDOP"; dopSlot.innerText = "DOP";
            idopSlot.classList.remove('filled'); dopSlot.classList.remove('filled');
        }
    }
}

nextTrial();