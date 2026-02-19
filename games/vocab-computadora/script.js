const alertText = document.getElementById('alert-text');
const techIcon = document.getElementById('tech-icon');
const cmdCenter = document.getElementById('command-center');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const techVocab = [
    { cmd: "guardar", eng: "SAVE THE FILE", icon: "💾" },
    { cmd: "borrar", eng: "DELETE THE APP", icon: "🗑️" },
    { cmd: "descargar", eng: "DOWNLOAD CONTENT", icon: "📥" },
    { cmd: "subir", eng: "UPLOAD PHOTO", icon: "📤" },
    { cmd: "prender", eng: "TURN ON COMPUTER", icon: "💻" },
    { cmd: "imprimir", eng: "PRINT DOCUMENT", icon: "🖨️" },
    { cmd: "navegar", eng: "SURF THE WEB", icon: "🌐" },
    { cmd: "funcionar", eng: "IS WORKING", icon: "⚙️" }
];

function nextAlert() {
    current = techVocab[Math.floor(Math.random() * techVocab.length)];
    alertText.innerText = `ACTION: ${current.eng}`;
    techIcon.innerText = current.icon;
    
    cmdCenter.innerHTML = '';
    const choices = [current.cmd, ...getAlts(current.cmd)];
    choices.sort(() => Math.random() - 0.5).forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'tech-btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (choice === current.cmd) {
                score++;
                scoreVal.innerText = score;
                nextAlert();
            } else {
                alertText.style.color = "red";
                setTimeout(() => alertText.style.color = "#22d3ee", 500);
            }
        };
        cmdCenter.appendChild(btn);
    });
}

function getAlts(correct) {
    return techVocab.map(v => v.cmd).filter(c => c !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
}

nextAlert();