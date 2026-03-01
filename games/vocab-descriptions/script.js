// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    // Physical Traits (Size/Manner)
    { es: "alto", en: "Tall", emoji: "🦒" },
    { es: "bajo", en: "Short", emoji: "🐀" },
    { es: "gordo", en: "Large/Fat", emoji: "🦛" },
    { es: "delgado", en: "Thin/Slim", emoji: "🥢" },
    { es: "grande", en: "Big", emoji: "🐘" },
    { es: "pequeño", en: "Small", emoji: "🐭" },
    
    // Hair & Color
    { es: "moreno", en: "Brunette", emoji: "🧒🏽"},
    { es: "rubio", en: "Blonde", emoji: "👱" },
    { es: "pelirrojo", en: "Red-haired", emoji: "🦰"},
    { es: "calvo", en: "Bald", emoji: "🦲" },

    // Personality/Qualities
    { es: "simpático", en: "Nice/Friendly", emoji: "😊" },
    { es: "antipático", en: "Unpleasant", emoji: "😠" },
    { es: "inteligente", en: "Intelligent", emoji: "🦉" },
    { es: "tonto", en: "Silly/Foolish", emoji: "🤡" },
    { es: "trabajador", en: "Hard-working", emoji: "🐝" },
    { es: "perezoso", en: "Lazy", emoji: "🦥" },
    { es: "interesante", en: "Interesting", emoji: "🎬" },
    { es: "importante", en: "Important", emoji: "👑" },

    // Age & Appearance
    { es: "joven", en: "Young", emoji: "👶" },
    { es: "viejo", en: "Old", emoji: "👴" },
    { es: "guapo", en: "Handsome/Good-looking", emoji: "😎" },
    { es: "feo", en: "Ugly", emoji: "👹" },
    { es: "bonito", en: "Pretty", emoji: "🌸" },

    // Difficulty
    { es: "fácil", en: "Easy", emoji: "🍰" },
    { es: "difícil", en: "Difficult", emoji: "🧩" }
];

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
            <div class="drop-zone" data-match="${item.es}">¿Cuál es?</div>
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