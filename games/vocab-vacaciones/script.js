const scene = document.getElementById('scene-canvas');
const targetDisplay = document.getElementById('target-item');
const foundDisplay = document.getElementById('found-count');

let foundCount = 0;
let currentTarget = null;

// Hotel and Beach Vocabulary
const items = [
    { name: "la toalla", emoji: "🧣", x: 50, y: 300 },
    { name: "las gafas de sol", emoji: "🕶️", x: 450, y: 50 },
    { name: "la maleta", emoji: "🧳", x: 600, y: 320 },
    { name: "la llave", emoji: "🔑", x: 200, y: 50 },
    { name: "el traje de baño", emoji: "🩱", x: 300, y: 200 },
    { name: "la cámara", emoji: "📷", x: 650, y: 100 },
    { name: "el pasaporte", emoji: "🛂", x: 100, y: 80 }
];

function initGame() {
    scene.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'hidden-item';
        div.innerText = item.emoji;
        div.style.left = item.x + 'px';
        div.style.top = item.y + 'px';
        
        div.onclick = () => {
            if (item.name === currentTarget.name) {
                foundCount++;
                foundDisplay.innerText = foundCount;
                div.style.visibility = 'hidden';
                setNewTarget();
            }
        };
        scene.appendChild(div);
    });
    setNewTarget();
}

function setNewTarget() {
    const remaining = items.filter(i => {
        const el = Array.from(document.querySelectorAll('.hidden-item')).find(d => d.innerText === i.emoji);
        return el && el.style.visibility !== 'hidden';
    });

    if (remaining.length > 0) {
        currentTarget = remaining[Math.floor(Math.random() * remaining.length)];
        targetDisplay.innerText = currentTarget.name;
    } else {
        targetDisplay.innerText = "¡TODOS ENCONTRADOS!";
    }
}

initGame();