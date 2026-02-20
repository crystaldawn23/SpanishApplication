// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    { es: "el autobús", en: "Bus", emoji: "🚌" },
    { es: "el chico", en: "Boy", emoji: "👦" },
    { es: "la chica", en: "Girl", emoji: "👧" },
    { es: "la computadora", en: "Computer", emoji: "💻" },
    { es: "la comunidad", en: "Community", emoji: "🏘️" },
    { es: "el conductor", en: "Driver (m)", emoji: "👨‍✈️" },
    { es: "la conductora", en: "Driver (f)", emoji: "👩‍✈️" },
    { es: "la conversación", en: "Conversation", emoji: "💬" },
    { es: "la cosa", en: "Thing", emoji: "📦" },
    { es: "el cuaderno", en: "Notebook", emoji: "📓" },
    { es: "el día", en: "Day", emoji: "☀️" },
    { es: "el diario", en: "Diary", emoji: "📔" },
    { es: "el diccionario", en: "Dictionary", emoji: "📕" },
    { es: "la escuela", en: "School", emoji: "🏫" },
    { es: "el estudiante", en: "Student (m)", emoji: "👨‍🎓" },
    { es: "la estudiante", en: "Student (f)", emoji: "👩‍🎓" },
    { es: "la fotografía", en: "Photograph", emoji: "📸" },
    { es: "el hombre", en: "Man", emoji: "👨" },
    { es: "el joven", en: "Youth (m)", emoji: "👱‍♂️" },
    { es: "la joven", en: "Youth (f)", emoji: "👱‍♀️" },
    { es: "el lápiz", en: "Pencil", emoji: "✏️" },
    { es: "la lección", en: "Lesson", emoji: "📖" },
    { es: "la maleta", en: "Suitcase", emoji: "🧳" },
    { es: "la mano", en: "Hand", emoji: "🤚" },
    { es: "el mapa", en: "Map", emoji: "🗺️" },
    { es: "la mujer", en: "Woman", emoji: "👩" },
    { es: "la nacionalidad", en: "Nationality", emoji: "🪪" },
    { es: "el número", en: "Number", emoji: "🔢" },
    { es: "el país", en: "Country", emoji: "🚩" },
    { es: "la palabra", en: "Word", emoji: "🔤" },
    { es: "el pasajero", en: "Passenger (m)", emoji: "👨‍💼" },
    { es: "la pasajera", en: "Passenger (f)", emoji: "👩‍💼" },
    { es: "el problema", en: "Problem", emoji: "❓" },
    { es: "el profesor", en: "Teacher (m)", emoji: "👨‍🏫" },
    { es: "la profesora", en: "Teacher (f)", emoji: "👩‍🏫" },
    { es: "el programa", en: "Program", emoji: "🖥️" },
    { es: "el turista", en: "Tourist (m)", emoji: "👨‍🚀" },
    { es: "la turista", en: "Tourist (f)", emoji: "👩‍🚀" },
    { es: "el video", en: "Video", emoji: "🎬" }
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
                alert("¡Felicidades! Has completado todo el vocabulario de la Unidad 1.");
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