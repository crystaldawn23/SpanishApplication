const trials = [
    { 
        npc: "🧙‍♂️", 
        speech: "¡Hola! Te presento a mi amigo, el Mago.", 
        options: ["Mucho gusto.", "Igualmente.", "Hasta luego."], 
        correct: "Mucho gusto." 
    },
    { 
        npc: "👸", 
        speech: "Mucho gusto en conocerte.", 
        options: ["¿Cómo te llamas?", "El gusto es mío.", "Buenas noches."], 
        correct: "El gusto es mío." 
    },
    { 
        npc: "🤴", 
        speech: "Me llamo Rey Arturo. ¿Y tú?", 
        options: ["Me llamo...", "¡Hola!", "Encantado."], 
        correct: "Me llamo..." 
    },
    { 
        npc: "🛡️", 
        speech: "¡Encantado de conocerte!", 
        options: ["Igualmente.", "De nada.", "Gracias."], 
        correct: "Igualmente." 
    }
];

let currentTrial = 0;

function loadTrial() {
    const data = trials[currentTrial];
    document.getElementById('npc-portrait').innerText = data.npc;
    document.getElementById('npc-speech').innerText = data.speech;

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    data.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'response-btn';
        btn.innerText = opt;
        btn.onclick = () => checkTrial(opt, data.correct);
        grid.appendChild(btn);
    });
}

function checkTrial(selected, correct) {
    if (selected === correct) {
        currentTrial++;
        if (currentTrial < trials.length) {
            loadTrial();
        } else {
            alert("Thou art a master of etiquette! The Court welcomes thee.");
            window.location.href = "../../index.html";
        }
    } else {
        const ui = document.getElementById('game-ui');
        ui.style.transform = "translateX(5px)";
        setTimeout(() => ui.style.transform = "translateX(-5px)", 50);
        setTimeout(() => ui.style.transform = "translateX(0)", 100);
    }
}

document.addEventListener('DOMContentLoaded', loadTrial);
