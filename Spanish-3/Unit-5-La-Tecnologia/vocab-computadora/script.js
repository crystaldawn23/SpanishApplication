// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    { es: "la applicación", en: "application", emoji: "📱" },
    { es: "la cámara digital", en: "digital camera", emoji: "📷" },
    { es: "el canal", en: "channel", emoji: "📺" },
    { es: "el cargador", en: "charger", emoji: "🔌" },
    { es: "el cibercafé", en: "cybercafé", emoji: "💻" },
    { es: "el control remoto", en: "remote control", emoji: "🎮" },
    {es: "el correo de voz", en: "voicemail", emoji: "📞"},
    {es: "el disco compacto", en: "CD", emoji: "💿"},
    {es: "el DVD", en: "DVD", emoji: "📀"},
    {es: "el estáreo", en: "stereo", emoji: "🎵"},
    {es: "el radio", en: "radio", emoji: "📻"},
    {es: "el reproductor de MP3", en: "MP3 player", emoji: "🎧"},
    {es: "el reproductor de CD", en: "CD player", emoji: "💽"},
    {es: "el televisor", en: "television", emoji: "📺"},
    {es: "el videojuego", en: "video game", emoji: "🎮"},
    {es: "el archivo", en: "file", emoji: "📁"},
    {es: "la arroba", en: "at symbol", emoji: "📧"},
    {es: "el blog", en: "blog", emoji: "📝"},
    {es: "el buscador", en: "search engine", emoji: "🔍"},
    {es: "la computadora portátil", en: "laptop", emoji: "💻"},
    {es: "la conexión inalámbrica", en: "wireless connection", emoji: "📶"},
    {es: "el correo electrónico", en: "email", emoji: "📧"},
    {es: "el disco duro", en: "hard drive", emoji: "💾"},
    {es: "el enlace", en: "link", emoji: "🔗"},
    {es: "la impresora", en: "printer", emoji: "🖨️"},
    {es: "la dirección electrónica", en: "email address", emoji: "📧"},
    {es: "Internet", en: "Internet", emoji: "🌐"},
    {es: "la página web", en: "web page", emoji: "📄"},
    {es: "el mensaje de texto", en: "text message", emoji: "💬"},
    {es: "el monitor", en: "monitor", emoji: "🖥️"},
    {es: "la página principal", en: "home page", emoji: "🏠"},
    {es: "el programa de computación", en: "software", emoji: "📺"},
    {es: "el ratón", en: "mouse", emoji: "🖱️"},
    {es: "el teclado", en: "keyboard", emoji: "⌨️"},
    {es: "el teléfono celular", en: "cell phone", emoji: "📱"},
    {es: "el teléfono inteligente", en: "smartphone", emoji: "📱"},
    {es: "la tableta", en: "tablet", emoji: "📱"},
    {es: "la computadora de escritorio", en: "desktop computer", emoji: "🖥️"},
    {es: "la red", en: "network", emoji: "🌐"},
    {es: "el reproductor de DVD", en: "DVD player", emoji: "📀"},
    {es: "el sitio web", en: "website", emoji: "🌐"},

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