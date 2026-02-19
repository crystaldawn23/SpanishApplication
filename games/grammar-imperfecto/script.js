const textDisplay = document.getElementById('imperfect-text');
const grid = document.getElementById('item-grid');
const scoreVal = document.getElementById('score-val');

let score = 0;

const memories = [
    { text: "Cuando era niño, yo jugaba con...", item: "🧸", alt: "💻" },
    { text: "De pequeño, yo siempre iba al...", item: "🎡", alt: "🏢" },
    { text: "A menudo, nosotros saltábamos...", item: "🪢", alt: "🚗" },
    { text: "Mi hermano siempre leía...", item: "📚", alt: "📱" },
    { text: "Tú veías muchos...", item: "📺", alt: "📻" }
];

function loadMemory() {
    const mem = memories[Math.floor(Math.random() * memories.length)];
    textDisplay.innerText = mem.text;
    grid.innerHTML = '';
    
    [mem.item, mem.alt].sort(() => Math.random() - 0.5).forEach(icon => {
        const div = document.createElement('div');
        div.className = 'memory-item';
        div.innerText = icon;
        div.onclick = () => {
            if (icon === mem.item) {
                score++;
                scoreVal.innerText = score;
                loadMemory();
            } else {
                textDisplay.style.color = "red";
                setTimeout(() => textDisplay.style.color = "#a5b4fc", 500);
            }
        };
        grid.appendChild(div);
    });
}

loadMemory();