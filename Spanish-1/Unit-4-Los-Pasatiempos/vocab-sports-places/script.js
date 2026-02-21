// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    // Sports & Activities
    { es: "el baloncesto", en: "Basketball", emoji: "🏀" },
    { es: "el béisbol", en: "Baseball", emoji: "⚾" },
    { es: "el ciclismo", en: "Cycling", emoji: "🚴" },
    { es: "el equipo", en: "Team", emoji: "👥" },
    { es: "esquiar", en: "Skiing", emoji: "🎿" },
    { es: "el fútbol", en: "Soccer", emoji: "⚽" },
    { es: "el fútbol americano", en: "Football", emoji: "🏈" },
    { es: "el golf", en: "Golf", emoji: "⛳" },
    { es: "el hockey", en: "Hockey", emoji: "🏒" },
    { es: "el partido", en: "Game/Match", emoji: "🏟️" },
    { es: "la natación", en: "Swimming", emoji: "🏊" },
    { es: "el tenis", en: "Tenis", emoji: "🎾" },
    { es: "el vóleibol", en: "Volleyball", emoji: "🏐" },
    { es: "el jugador", en: "Player", emoji: "🧑‍🦲" },
    { es: "la pelota", en: "Ball", emoji: "⚾" },

    // Places & Leisure
    { es: "el centro", en: "Downtown", emoji: "🏢" },
    { es: "el cine", en: "Movie Theater", emoji: "🎬" },
    { es: "el gimnasio", en: "Gym", emoji: "💪" },
    { es: "el museo", en: "Museum", emoji: "🖼️" },
    { es: "el parque", en: "Park", emoji: "🌳" },
    { es: "la piscina", en: "Pool", emoji: "🏊‍♂️" },
    { es: "la plaza", en: "Town Square", emoji: "⛲" },
    { es: "el restaurante", en: "Restaurant", emoji: "🍴" },
    { es: "el café", en: "Cafe", emoji: "☕" },
    { es: "el lugar:", en: "Place", emoji: "📍" },
    { es: "la iglesia", en: "Church", emoji: "⛪" },

    // Verbs/Actions (As Nouns)
    { es: "la diversión", en: "Fun/Diversion", emoji: "🥳" },
    { es: "el rato libre", en: "Free time", emoji: "⏳" },
    { es: "la revista", en: "Magazine", emoji: "📖" },
    { es: "el videojuego", en: "Video game", emoji: "🕹️" },
    { es: "andar en patineta", en: "to skateboard", emoji: "🛹" },
    { es: "bucear", en: "to dive", emoji: "🤿" },
    { es: "escalar montañas", en: "to mountain climb", emoji: "🧗" },
    { es: "escribir una carta", en: "to write a letter", emoji: "✉️" },
    { es: "escribir un mensaje electrónico", en: "to write an email", emoji: "📧" },
    { es: "ganar", en: "to win", emoji: "🏆" },
    { es: "perder", en: "to lose", emoji: "😞" },
    { es: "ir de excursión", en: "to go hiking", emoji: "🥾" },
    { es: "leer el correo electrónico", en: "to read email", emoji: "📧" },
    { es: "leer un periódico", en: "to read a newspaper", emoji: "📰" },
    { es: "leer una revista", en: "to read a magazine", emoji: "📖" },
    { es: "nadar", en: "to swim", emoji: "🏊" },
    { es: "pasear", en: "to take a walk", emoji: "🚶" },
    { es: "pasear en bicicleta", en: "to ride a bike", emoji: "🚴" },
    { es: "patinar (en línea)", en: "to rollerblade", emoji: "🛼" },
    { es: "practicar deportes", en: "to practice sports", emoji: "⚽" },
    { es: "tomar el sol", en: "to sunbathe", emoji: "☀️" },
    { es: "ver películas", en: "to watch movies", emoji: "🎬" },
    { es: "visitar monumentos", en: "to visit monuments", emoji: "🗽" },
    { es: "el fin de semana", en: "weekend", emoji: "🗓️" },
    { es: "el pasatiempo", en: "pastime/hobby", emoji: "🎮" },
    { es: "el rato libre", en: "free time", emoji: "⏳" },
    { es: "el videojuego", en: "video game", emoji: "🕹️" },

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