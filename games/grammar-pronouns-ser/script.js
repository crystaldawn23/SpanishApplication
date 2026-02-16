const vaultLevels = [
    { subject: "YO", choices: ["soy", "eres", "es"], correct: "soy", hint: "I am..." },
    { subject: "TÚ", choices: ["soy", "eres", "es"], correct: "eres", hint: "You (informal) are..." },
    { subject: "ÉL / ELLA", choices: ["eres", "es", "somos"], correct: "es", hint: "He / She is..." },
    { subject: "USTED", choices: ["es", "eres", "son"], correct: "es", hint: "You (formal) are..." },
    { subject: "NOSOTROS", choices: ["soy", "somos", "son"], correct: "somos", hint: "We are..." },
    { subject: "ELLOS / ELLAS", choices: ["somos", "es", "son"], correct: "son", hint: "They are..." },
    { subject: "USTEDES", choices: ["somos", "son", "sois"], correct: "son", hint: "You all are..." }
];

let currentLevel = 0;

function loadScanner() {
    const data = vaultLevels[currentLevel];
    document.getElementById('subject-text').innerText = data.subject;
    document.getElementById('context-hint').innerText = data.hint;
    
    // Progress Bar
    const prog = (currentLevel / vaultLevels.length) * 100;
    document.getElementById('progress').style.width = prog + "%";

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    data.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'vault-btn';
        btn.innerText = choice;
        btn.onclick = () => checkAccess(choice, data.correct);
        grid.appendChild(btn);
    });
}

function checkAccess(selected, correct) {
    if (selected === correct) {
        currentLevel++;
        if (currentLevel < vaultLevels.length) {
            loadScanner();
        } else {
            document.getElementById('progress').style.width = "100%";
            setTimeout(() => {
                alert("VAULT ACCESS GRANTED. IDENTITY CONFIRMED.");
                window.location.href = "../../index.html";
            }, 300);
        }
    } else {
        // Red alert flash
        const ui = document.getElementById('game-ui');
        ui.style.borderColor = "#ff007a";
        ui.style.boxShadow = "0 0 30px #ff007a";
        setTimeout(() => {
            ui.style.borderColor = "#00d4ff";
            ui.style.boxShadow = "0 0 20px #00d4ff";
        }, 400);
    }
}

document.addEventListener('DOMContentLoaded', loadScanner);