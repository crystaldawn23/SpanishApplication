const canvas = document.getElementById('room-canvas');
const targetDisplay = document.getElementById('target-item');
const scoreDisplay = document.getElementById('score-val');

let score = 0;
let currentTarget = null;

const vocab = [
    // Habitación
    { name: "la almohada", emoji: "☁️" },
    { name: "la manta", emoji: "🧶" },
    { name: "la cómoda", emoji: "🗄️" },
    { name: "el despertador", emoji: "⏰" },
    { name: "la lámpara", emoji: "💡" },
    { name: "el estante", emoji: "📚" },
    // Baño
    { name: "el inodoro", emoji: "🚽" },
    { name: "la ducha", emoji: "🚿" },
    { name: "el lavabo", emoji: "🚰" },
    { name: "el jabón", emoji: "🧼" },
    { name: "la toalla", emoji: "🧣" },
    { name: "el espejo", emoji: "🪞" }
];

function spawnItems() {
    canvas.innerHTML = '';
    // Shuffle and pick 10 random items to show
    const displayItems = [...vocab].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    // Pick one of the displayed items to be the target
    currentTarget = displayItems[Math.floor(Math.random() * displayItems.length)];
    targetDisplay.innerText = currentTarget.name;

    displayItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = item.emoji;
        
        // Randomly scatter
        div.style.left = Math.random() * 700 + 50 + 'px';
        div.style.top = Math.random() * 400 + 50 + 'px';
        
        div.onclick = () => {
            if (item.name === currentTarget.name) {
                score++;
                scoreDisplay.innerText = score;
                flashCanvas("#22c55e");
                spawnItems();
            } else {
                flashCanvas("#ef4444");
            }
        };
        canvas.appendChild(div);
    });
}

function flashCanvas(color) {
    canvas.style.backgroundColor = color;
    setTimeout(() => {
        canvas.style.backgroundColor = "#0f3460";
    }, 200);
}

spawnItems();