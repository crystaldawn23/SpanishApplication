// 1. GLOBAL VARIABLES
let totalMatches = 0; 
const fullVocab = [
    { es: "la banana", en: "Banana", emoji: "🍌" },
    { es: "las frutas", en: "Fruits", emoji: "🍉" },
    { es: "el limón", en: "Lemon", emoji: "🍋" },
    { es: "la manzana", en: "Apple", emoji: "🍎" },
    { es: "el melocotón", en: "Peach", emoji: "🍑" },
    { es: "la naranja", en: "Orange", emoji: "🍊" },
    { es: "la pera", en: "Pear", emoji: "🍐" },
    { es: "las uvas", en: "Grapes", emoji: "🍇" },
    { es: "las verduras", en: "Vegetables", emoji: "🥦" },
    { es: "las arvejas", en: "Peas", emoji: "🟢" },
    { es: "la zanahoria", en: "Carrot", emoji: "🥕" },
    { es: "la cebolla", en: "Onion", emoji: "🧅" },
    { es: "el tomate", en: "Tomato", emoji: "🍅" },
    { es: "el maíz", en: "Corn", emoji: "🌽" },
    { es: "la papa", en: "Potato", emoji: "🥔" },
    { es: "el champiñón", en: "Mushroom", emoji: "🍄" },
    { es: "la ensalada", en: "Salad", emoji: "🥗" },
    { es: "los espárragos", en: "Asparagus", emoji: "🥬" },
    { es: "los frijoles", en: "Beans", emoji: "🫘" },
    { es: "la lechuga", en: "Lettuce", emoji: "🥬" },
    { es: "las papas fritas", en: "French Fries", emoji: "🍟" },
    { es: "el atún", en: "Tuna", emoji: "🐟" },
    { es: "el pescado", en: "Fish", emoji: "🐠" },
    { es: "el pollo (asado)", en: "(roast) Chicken", emoji: "🍗" },
    { es: "el camarón", en: "Shrimp", emoji: "🦐" },
    { es: "el bistec", en: "Steak", emoji: "🥩" },
    { es: "la carne de res", en: "Beef", emoji: "🥩" },
    { es: "la chuleta de cerdo", en: "Pork Chop", emoji: "🍖" },
    { es: "la hamburguesa", en: "Hamburger", emoji: "🍔" },
    { es: "el jamón", en: "Ham", emoji: "🍖" },
    { es: "la langosta", en: "Lobster", emoji: "🦞" },
    { es: "los mariscos", en: "Seafood", emoji: "🦀" },
    { es: "el pavo", en: "Turkey", emoji: "🦃" },
    { es: "el pescado", en: "Fish", emoji: "🐟" },
    { es: "la salchicha", en: "Sausage", emoji: "🌭" },
    { es: "el salmón", en: "Salmon", emoji: "🐟" },
    { es: "el tocino", en: "Bacon", emoji: "🥓" },
    { es: "el aceite", en: "Oil", emoji: "🛢️" },
    { es: "el ajo", en: "Garlic", emoji: "🧄" },
    { es: "el arroz", en: "Rice", emoji: "🍚" },
    { es: "el azúcar", en: "Sugar", emoji: "🍬" },
    { es: "los cereales", en: "Cereal", emoji: "🥣" },
    { es: "el huevo", en: "Egg", emoji: "🥚" },
    { es: "la mantequilla", en: "Butter", emoji: "🧈" },
    { es: "la margarina", en: "Margarine", emoji: "🧈" },
    { es: "la mayonesa", en: "Mayonnaise", emoji: "🥫" },
    { es: "la pimienta", en: "Pepper", emoji: "🧂" },
    { es: "la sal", en: "Salt", emoji: "🧂" },
    { es: "el pan", en: "Bread", emoji: "🍞" },
    { es: "el sándwich", en: "Sandwich", emoji: "🥪" },
    { es: "la sopa", en: "Soup", emoji: "🍲" },
    { es: "el vinagre", en: "Vinegar", emoji: "🍶" },
    { es: "el yogur", en: "Yogurt", emoji: "🥛" }, 
    { es: "el helado", en: "Ice Cream", emoji: "🍦" },
    { es: "el jugo", en: "Juice", emoji: "🥤" },
    { es: "la leche", en: "Milk", emoji: "🥛" },
    { es: "el queso", en: "Cheese", emoji: "🧀" },
    { es: "la carne", en: "Meat", emoji: "🍖" },
    { es: "el agua", en: "Water", emoji: "💧" },
    { es: "la bebida", en: "Drink", emoji: "🥤" },
    { es: "el café", en: "Coffee", emoji: "☕" },
    { es: "el té", en: "Tea", emoji: "🍵" },
    { es: "el refresco", en: "Soda", emoji: "🥤" },
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
                alert("¡Felicidades! Has completado todo el vocabulario de la comida.");
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