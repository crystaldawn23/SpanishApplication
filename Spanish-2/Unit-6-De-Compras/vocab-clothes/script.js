// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    { es: "el abrigo", en: "Coat", emoji: "🧥" },
    { es: "la chaqueta", en: "Jacket", emoji: "🧥" },
    { es: "los pantalones", en: "Pants", emoji: "👖" },
    { es: "la camisa", en: "Shirt", emoji: "👕" },
    { es: "el sombrero", en: "Hat", emoji: "👒" },
    { es: "la bufanda", en: "Scarf", emoji: "🧣" },
    { es: "los guantes", en: "Gloves", emoji: "🧤" },
    { es: "los zapatos", en: "Shoes", emoji: "👟" },
    { es: "los (blue) jeans", en: "(Blue) Jeans", emoji: "👖" },
    { es: "el vestido", en: "Dress", emoji: "👗" },
    { es: "la falda", en: "Skirt", emoji: "👗" },
    { es: "el suéter", en: "Sweater", emoji: "🧶" },
    { es: "la blusa", en: "Blouse", emoji: "👚" },
    { es: "la bolsa", en: "Purse/Bag", emoji: "👜" },
    { es: "el traje", en: "Suit", emoji: "🤵" },
    { es: "el pijama", en: "Pajamas", emoji: "🛌" },
    { es: "la bota", en: "Boot", emoji: "👢" },
    { es: "los calcetines", en: "Socks", emoji: "🧦" },
    { es: "la camiseta", en: "T-shirt", emoji: "👕" },
    { es: "el cinturón", en: "Belt", emoji: "👖" },
    { es: "la cartera", en: "Wallet", emoji: "👛" },
    { es: "la corbata", en: "Tie", emoji: "👔" },
    { es: "el traje de baño", en: "Swimsuit", emoji: "👙" },
    { es: "las gafas (de sol)", en: "Glasses (Sunglasses)", emoji: "🕶️" },
    { es: "el impermeable", en: "Raincoat", emoji: "🧥" },
    { es: "las medias", en: "Tights/Stockings", emoji: "🧦" },
    { es: "los pantalones cortos", en: "Shorts", emoji: "🩳" },
    {es: "la ropa", en: "Clothing", emoji: "👗"},
    {es: "la ropa interior", en: "Underwear", emoji: "🩲"},
    {es: "las sandalias", en: "Sandals", emoji: "👡"},
    {es: "los zapatos de tennis", en: "Tennis Shoes", emoji: "👟"},
 
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
            <div class="drop-zone" data-match="${item.es}">¿Qué es?</div>
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
                alert("¡Felicidades! Has completado todo el vocabulario de la ropa.");
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