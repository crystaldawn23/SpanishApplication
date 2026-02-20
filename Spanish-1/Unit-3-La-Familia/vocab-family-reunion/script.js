// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    { es: "abuelo", en: "Grandfather", emoji: "👴" },
    { es: "abuela", en: "Grandmother", emoji: "👵" },
    { es: "padre", en: "Father", emoji: "👨" },
    { es: "madre", en: "Mother", emoji: "👩" },
    { es: "hijo", en: "Son", emoji: "👦" },
    { es: "hija", en: "Daughter", emoji: "👧" },
    { es: "hermano", en: "Brother", emoji: "👱‍♂️" },
    { es: "hermana", en: "Sister", emoji: "👱‍♀️" },
    { es: "tío", en: "Uncle", emoji: "👨‍🦰" },
    { es: "tía", en: "Aunt", emoji: "👩‍🦰" },
    { es: "primo", en: "Cousin (m)", emoji: "👦" },
    { es: "prima", en: "Cousin (f)", emoji: "👧" },
    { es: "sobrino", en: "Nephew", emoji: "🧒" },
    { es: "sobrina", en: "Niece", emoji: "👧" },
    { es: "esposo", en: "Husband", emoji: "🤵" },
    { es: "esposa", en: "Wife", emoji: "👰" },
    { es: "suegro", en: "Father-in-law", emoji: "👴" },
    { es: "suegra", en: "Mother-in-law", emoji: "👵" },
    { es: "yerno", en: "Son-in-law", emoji: "👨" },
    { es: "nuera", en: "Daughter-in-law", emoji: "👩" },
    { es: "cuñado", en: "Brother-in-law", emoji: "👨" },
    { es: "cuñada", en: "Sister-in-law", emoji: "👩" },
    { es: "novio", en: "Boyfriend", emoji: "👨‍❤️‍👨" },
    { es: "novia", en: "Girlfriend", emoji: "👩‍❤️‍👩" },
    { es: "nieto", en: "Grandson", emoji: "👶" },
    { es: "nieta", en: "Granddaughter", emoji: "👶" },
    { es: "bisabuelo", en: "Great-Grandpa", emoji: "👨‍🦳" },
    { es: "bisabuela", en: "Great-Grandma", emoji: "👩‍🦳" },
    { es: "padrastro", en: "Step-father", emoji: "👨" },
    { es: "madrastra", en: "Step-mother", emoji: "👩" },
    { es: "hermanastro", en: "Step-brother", emoji: "👦" },
    { es: "hermanastra", en: "Step-sister", emoji: "👧" }
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