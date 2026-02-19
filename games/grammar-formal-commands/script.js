const verbAction = document.getElementById('verb-action');
const tenantLabel = document.getElementById('tenant-label');
const tenantIcon = document.getElementById('tenant-icon');
const userInput = document.getElementById('user-command');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const actions = [
    { v: "LIMPIAR EL BALCÓN", sub: "Ud.", ans: "limpie", icon: "👤" },
    { v: "SACAR LA BASURA", sub: "Uds.", ans: "saquen", icon: "👥" },
    { v: "PONER LA MESA", sub: "Ud.", ans: "ponga", icon: "👤" },
    { v: "TRAER LAS LLAVES", sub: "Uds.", ans: "traigan", icon: "👥" },
    { v: "HACER LA CAMA", sub: "Ud.", ans: "haga", icon: "👤" },
    { v: "CERRAR EL PASILLO", sub: "Uds.", ans: "cierren", icon: "👥" },
    { v: "IR AL DESPACHO", sub: "Ud.", ans: "vaya", icon: "👤" } // Irregular
];

function next() {
    current = actions[Math.floor(Math.random() * actions.length)];
    verbAction.innerText = current.v;
    tenantLabel.innerText = `INQUILINO: ${current.sub === "Ud." ? "SR. RAMÍREZ" : "SRES. GARCÍA"} (${current.sub})`;
    tenantIcon.innerText = current.icon;
    userInput.value = "";
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (userInput.value.toLowerCase().trim() === current.ans) {
            score++;
            scoreVal.innerText = score;
            next();
        } else {
            userInput.style.color = "#e74c3c";
            setTimeout(() => { userInput.style.color = "white"; }, 500);
        }
    }
});

function addChar(c) {
    userInput.value += c;
    userInput.focus();
}

next();