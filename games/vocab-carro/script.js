const issueText = document.getElementById('issue-text');
const partsBin = document.getElementById('parts-bin');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const carVocab = [
    { part: "la llanta", eng: "THE TIRE" },
    { part: "el volante", eng: "THE STEERING WHEEL" },
    { part: "el capó", eng: "THE HOOD" },
    { part: "el baúl", eng: "THE TRUNK" },
    { part: "el parabrisas", eng: "THE WINDSHIELD" },
    { part: "las luces", eng: "THE LIGHTS" },
    { part: "el motor", eng: "THE ENGINE" },
    { part: "el tanque", eng: "THE GAS TANK" },
    { part: "frenar", eng: "TO BRAKE" },
    { part: "arrancar", eng: "TO START THE CAR" }
];

function nextRepair() {
    current = carVocab[Math.floor(Math.random() * carVocab.length)];
    issueText.innerText = `DIAGNOSTIC: CHECK ${current.eng}`;
    
    partsBin.innerHTML = '';
    const choices = [current.part, ...getAlts(current.part)];
    choices.sort(() => Math.random() - 0.5).forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'part-btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (choice === current.part) {
                score++;
                scoreVal.innerText = score;
                issueText.style.color = "#fff";
                issueText.innerText = "SYSTEM REPAIRED";
                setTimeout(nextRepair, 800);
            } else {
                issueText.style.color = "#ef4444";
                issueText.innerText = "ERROR: WRONG PART";
                setTimeout(() => {
                    issueText.style.color = "#22c55e";
                    issueText.innerText = `DIAGNOSTIC: CHECK ${current.eng}`;
                }, 800);
            }
        };
        partsBin.appendChild(btn);
    });
}

function getAlts(correct) {
    return carVocab.map(v => v.part).filter(p => p !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
}

nextRepair();