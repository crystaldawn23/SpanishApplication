// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    { es: "la autopista", en: "Highway", emoji: "🛣️" },
    { es: "el baúl", en: "Trunk", emoji: "🧳" },
    { es: "la calle", en: "Street", emoji: "🛤️" },
    { es: "la carretera", en: "Main Road", emoji: "🛣️" },
    { es: "el capó", en: "Hood", emoji: "🚘" },
    { es: "el cofre", en: "Trunk", emoji: "🧳" },
    { es: "el coche", en: "Car", emoji: "🚗" },
    { es: "el carro", en: "Car", emoji: "🚗" },
    { es: "la circulación", en: "Traffic", emoji: "🚦" },
    { es: "el tráfico", en: "Traffic", emoji: "🚦" },
    { es: "el camión", en: "Truck", emoji: "🚚" },
    { es: "el garaje", en: "Garage", emoji: "🏠" },
    { es: "el taller", en: "Mechanic Shop", emoji: "🔧" },
    { es: "la gasolina", en: "Gasoline", emoji: "⛽" },
    { es: "la gasolinera", en: "Gas Station", emoji: "⛽" },
    { es: "la licencia de conducir", en: "Driver's License", emoji: "📜" },
    { es: "el parabrisas", en: "Windshield", emoji: "🪟" },
    { es: "el volante", en: "Steering Wheel", emoji: "🕹️" },
    { es: "el freno", en: "Brake", emoji: "🛑" },
    { es: "la llanta", en: "Tire", emoji: "🛞" },
    { es: "el mecánico", en: "Mechanic", emoji: "👨‍🔧" },
    { es: "la mecánica", en: "Mechanic (f)", emoji: "👩‍🔧" },
    { es: "el motor", en: "Engine", emoji: "🚘" },
    { es: "el navegador GPS", en: "GPS", emoji: "📡" },
    { es: "la policía", en: "Police", emoji: "🚓" },
    { es: "la velocidad máxima", en: "Speed Limit", emoji: "🚦" },
    { es: "el semáforo", en: "Traffic Light", emoji: "🚦" },
    { es: "arrancar", en: "To Start (a car)", emoji: "🚗" },
    { es: "conducir", en: "To Drive", emoji: "🚗" },
    { es: "manejar", en: "To Drive", emoji: "🚗" },
    { es: "arreglar", en: "To Fix", emoji: "🔧" },
    { es: "bajarse de", en: "To Get Out Of", emoji: "🚪" },
    { es: "subirse a", en: "To Get Into", emoji: "🚪" },
    { es: "llenar el tanque", en: "To Fill the Tank", emoji: "⛽" },
    { es: "parar", en: "To Stop (the car)", emoji: "🛑" },
    { es: "revisar el aceite", en: "To Check the Oil", emoji: "🛢️" },
  
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