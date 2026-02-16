const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const questBubble = document.getElementById('quest-bubble');
const scoreDisplay = document.getElementById('score');

let score = 0;
let player = { x: 300, y: 200, size: 15, speed: 5 };

// Family data
const relatives = [
    { name: 'el abuelo', emoji: '👴', x: 80, y: 80 },
    { name: 'la abuela', emoji: '👵', x: 520, y: 80 },
    { name: 'el tío', emoji: '👨‍🦰', x: 80, y: 320 },
    { name: 'la tía', emoji: '👩‍🦱', x: 520, y: 320 },
    { name: 'el primo', emoji: '👦', x: 300, y: 60 },
    { name: 'la hermana', emoji: '👧', x: 300, y: 340 }
];

let currentTarget = null;
const keys = {};

function nextMission() {
    const last = currentTarget;
    while (currentTarget === last) {
        currentTarget = relatives[Math.floor(Math.random() * relatives.length)];
    }
    questBubble.innerText = `Abuela dice: "¡Busca a ${currentTarget.name.toUpperCase()}!"`;
}

window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

function update() {
    if (keys['ArrowUp'] && player.y > 15) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < canvas.height - 15) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 15) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - 15) player.x += player.speed;

    // Check if player reaches a relative
    relatives.forEach(rel => {
        let dist = Math.hypot(player.x - rel.x, player.y - rel.y);
        if (dist < 30) {
            if (rel.name === currentTarget.name) {
                score += 50;
                scoreDisplay.innerText = score;
                player.x = 300; player.y = 200; // Reset position
                nextMission();
            }
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw relatives
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    relatives.forEach(rel => {
        ctx.fillText(rel.emoji, rel.x, rel.y + 15);
    });

    // Draw Player (Arcade Circle)
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

nextMission();
loop();