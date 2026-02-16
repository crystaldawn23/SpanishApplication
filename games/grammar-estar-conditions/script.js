const phraseDisplay = document.getElementById('status-phrase');
const emojiDisplay = document.getElementById('subject-emoji');
const grid = document.getElementById('diagnosis-grid');

const states = [
    { phrase: "Él está cansado", emoji: "🥱", options: ["🥱", "😡", "😊", "🤒"] },
    { phrase: "Ella está enojada", emoji: "😡", options: ["😡", "😴", "🤔", "🥳"] },
    { phrase: "Nosotros estamos felices", emoji: "😊", options: ["😊", "😢", "🤢", "😱"] },
    { phrase: "Usted está enfermo", emoji: "🤒", options: ["🤒", "🤩", "😎", "😴"] },
    { phrase: "Yo estoy confundido", emoji: "🤔", options: ["🤔", "🥰", "😡", "🥱"] },
    { phrase: "Ellas están nerviosas", emoji: "😰", options: ["😰", "😴", "😏", "😂"] }
];

function nextScan() {
    const data = states[Math.floor(Math.random() * states.length)];
    phraseDisplay.innerText = data.phrase;
    emojiDisplay.innerText = "👤"; // Secret until scan logic (visual only)
    
    grid.innerHTML = '';
    data.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'chip';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === data.emoji) {
                emojiDisplay.innerText = data.emoji;
                setTimeout(nextScan, 1000);
            } else {
                btn.style.borderColor = "red";
                btn.style.color = "red";
            }
        };
        grid.appendChild(btn);
    });
}

nextScan();