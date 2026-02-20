// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    // La Gente (The People)
    { es: "el compañero", en: "Classmate (m)", emoji: "👦" },
    { es: "la compañera", en: "Classmate (f)", emoji: "👧" },
    { es: "el estudiante", en: "Student (m)", emoji: "👨‍🎓" },
    { es: "la estudiante", en: "Student (f)", emoji: "👩‍🎓" },
    { es: "el profesor", en: "Teacher (m)", emoji: "👨‍🏫" },
    { es: "la profesora", en: "Teacher (f)", emoji: "👩‍🏫" },

    // Objetos (Objects)
    { es: "el borrador", en: "Eraser", emoji: "🧽" },
    { es: "la calculadora", en: "Calculator", emoji: "🖩" },
    { es: "el escritorio", en: "Desk", emoji: "📑" },
    { es: "el libro", en: "Book", emoji: "📚" },
    { es: "el mapa", en: "Map", emoji: "🗺️" },
    { es: "la mesa", en: "Table", emoji: "🪑" },
    { es: "la mochila", en: "Backpack", emoji: "🎒" },
    { es: "el papel", en: "Paper", emoji: "📄" },
    { es: "la papelera", en: "Trash can", emoji: "🗑️" },
    { es: "la pizarra", en: "Whiteboard/Board", emoji: "📋" },
    { es: "la pluma", en: "Pen", emoji: "🖊️" },
    { es: "la puerta", en: "Door", emoji: "🚪" },
    { es: "el reloj", en: "Clock/Watch", emoji: "⌚" },
    { es: "la silla", en: "Chair", emoji: "🪑" },
    { es: "la tiza", en: "Chalk", emoji: "🖍️" },
    { es: "la ventana", en: "Window", emoji: "🪟" },

    // Lugares (Places)
    { es: "la biblioteca", en: "Library", emoji: "🏛️" },
    { es: "la cafetería", en: "Cafeteria", emoji: "☕" },
    { es: "la casa", en: "House", emoji: "🏠" },
    { es: "el estadio", en: "Stadium", emoji: "🏟️" },
    { es: "el laboratorio", en: "Lab", emoji: "🧪" },
    { es: "la librería", en: "Bookstore", emoji: "🏪" },
    { es: "la universidad", en: "University", emoji: "🎓" },

    // La Clase (The Course)
    { es: "la clase", en: "Class", emoji: "🏫" },
    { es: "el curso", en: "Course", emoji: "📅" },
    { es: "la materia", en: "Subject", emoji: "🧪" },
    { es: "el examen", en: "Exam", emoji: "📝" },
    { es: "el horario", en: "Schedule", emoji: "🕒" },
    { es: "la prueba", en: "Quiz", emoji: "✍️" },
    { es: "el semestre", en: "Semester", emoji: "📆" },
    { es: "la tarea", en: "Homework", emoji: "🏠" }
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