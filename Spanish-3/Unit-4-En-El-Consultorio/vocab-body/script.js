// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    { es: "boca", en: "mouth", emoji: "👄" },
    { es: "brazo", en: "arm", emoji: "💪" },
    { es: "cabeza", en: "head", emoji: "🧠" },
    { es: "corazón", en: "heart", emoji: "❤️" },
    { es: "cuello", en: "neck", emoji: "🦒" },
    { es: "cuerpo", en: "body", emoji: "🧍" },
    { es: "dedo", en: "finger", emoji: "👉🏽" },
    { es: "dedo del pie", en: "toe", emoji: "👣" },
    { es: "estómago", en: "stomach", emoji: "🫃🏽" },
    { es: "garganta", en: "throat", emoji: "🧣" },
    { es: "hueso", en: "bone", emoji: "🦴" },
    { es: "nariz", en: "nose", emoji: "👃" },
    { es: "oreja", en: "ear", emoji: "👂" },
    { es: "oido", en: "inner ear", emoji: "👂" },
    { es: "ojo", en: "eye", emoji: "👁️" },
    { es: "pie", en: "foot", emoji: "🦶" },
    { es: "pierna", en: "leg", emoji: "🦵" },
    { es: "rodilla", en: "knee", emoji: "🦵" },
    { es: "tobillo", en: "ankle", emoji: "🦶" },
    { es: "muñeca", en: "wrist", emoji: "🫲🏽" },
    { es: "mano", en: "hand", emoji: "✋" },
    { es: "hombro", en: "shoulder", emoji: "🤷🏽‍♀️" },
    { es: "cadera", en: "hip", emoji: "🧍‍♀️" },
    { es: "espalda", en: "back", emoji: "🧍‍♂️" },
]

let remainingVocab = [...fullVocab];

// 2. GAME FUNCTIONS
function startRound() {
    const container = document.getElementById('game-container');
    const bank = document.getElementById('word-bank');
    container.innerHTML = '';
    bank.innerHTML = '';

    // Pick 5 random items
    let roundItems = [...remainingVocab].sort(() => 0.5 - Math.random()).slice(0, 5);

    roundItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.innerHTML = `
            <div class="emoji-avatar">${item.emoji}</div>
            <div class="english-hint">${item.en}</div>
            <div class="drop-zone" data-match="${item.es}">¿Quién es?</div>
        `;
        container.appendChild(card);
    });

    let shuffledBank = [...roundItems].sort(() => 0.5 - Math.random());

    shuffledBank.forEach(item => {
        const s = document.createElement('div');
        s.className = 'sticker';
        s.innerText = item.es;
        s.draggable = true;
        s.id = item.es;
        s.ondragstart = (e) => e.dataTransfer.setData('text', e.target.id);
        bank.appendChild(s);
    });

    setupDropZones();
}

function setupDropZones() {
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.ondragover = (e) => e.preventDefault();
        zone.ondrop = (e) => {
            const id = e.dataTransfer.getData('text');
            if (id === zone.dataset.match) {
                // Correct Match Logic
                zone.classList.add('correct-match');
                zone.innerText = id.toUpperCase();
                
                const sticker = document.getElementById(id);
                if(sticker) sticker.style.visibility = "hidden";

                // Scoreboard Update
                totalMatches++;
                const scoreDisplay = document.getElementById('score-val');
                if(scoreDisplay) scoreDisplay.innerText = totalMatches;

                checkRoundEnd();
            }
        };
    });
}

function checkRoundEnd() {
    const matchedInRound = document.querySelectorAll('.correct-match').length;
    
    if (matchedInRound === 5) {
        setTimeout(() => { 
            if (totalMatches >= fullVocab.length) {
                alert("¡Felicidades! Has completado todo el vocabulario de la Unidad 3.");
                location.reload(); 
            } else {
                alert("¡Excelente! Siguiente ronda."); 
                startRound(); 
            }
        }, 500);
    }
}

// 3. START THE GAME
startRound();