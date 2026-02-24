const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const grid = 20;

let audioCtx;
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playSound(type) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
    }
}

// Updated Verb Data: Removed Vosotros, Split Ustedes/Ellos
const verbData = [
    { eng: "I am", span: "YO", a: "SOY", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "You are (fam.)", span: "TÚ", a: "ERES", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "You are (form.)", span: "USTED", a: "ES", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "He/She is", span: "ÉL/ELLA", a: "ES", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "We are", span: "NOSOTROS", a: "SOMOS", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "You all are", span: "USTEDES", a: "SON", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "They are", span: "ELLOS/ELLAS", a: "SON", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] }
];

let score = 0, goal = 15, isPaused = true, count = 0;
let snake = { x: 300, y: 200, dx: grid, dy: 0, cells: [], maxCells: 2 };
let foodItems = [], obstacles = [];

const overlay = document.getElementById("overlay");
const continueBtn = document.getElementById("continue-btn");

function showOverlay(title, text, btn = "CONTINUE (Enter)") {
    isPaused = true;
    document.getElementById("overlay-title").innerText = title;
    document.getElementById("overlay-text").innerText = text;
    continueBtn.innerText = btn;
    overlay.classList.remove("hidden");
}

function startGame() {
    initAudio();
    overlay.classList.add("hidden");
    isPaused = false;
}

continueBtn.onclick = startGame;

function initRound() {
    const data = verbData[Math.floor(Math.random() * verbData.length)];
    document.getElementById("prompt").innerText = (score < 5) ? `${data.eng.toUpperCase()} (${data.span})` : data.eng.toUpperCase();
    document.getElementById("hint").innerText = (score < 5) ? "Level 1" : (score < 10 ? "Level 2" : "Level 3");
    
    foodItems = [];
    data.opts.forEach(opt => {
        let pos;
        do {
            pos = { x: Math.floor(Math.random() * 28 + 1) * grid, y: Math.floor(Math.random() * 18 + 1) * grid };
        } while (foodItems.some(f => Math.abs(f.x - pos.x) < grid*3));
        foodItems.push({ x: pos.x, y: pos.y, text: opt, isCorrect: opt === data.a });
    });
}

function handlePenalty(msg) {
    playSound('error');
    score--;
    if (snake.maxCells > 2) { snake.maxCells--; snake.cells.pop(); }
    document.getElementById("progress").innerText = `${Math.max(0, score)}/15`;
    if (score < 0) {
        showOverlay("GAME OVER", "Out of energy!", "RESTART");
        score = 0; obstacles = []; snake.maxCells = 2;
    } else { showOverlay("OUCH!", msg); }
    snake.x = 300; snake.y = 200; snake.cells = [];
    initRound();
}

function loop() {
    requestAnimationFrame(loop);
    if (isPaused || ++count < 7) return;
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height || 
        obstacles.some(o => o.x === snake.x && o.y === snake.y)) {
        handlePenalty("You hit the wall!"); return;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    ctx.fillStyle = "#455a64";
    obstacles.forEach(o => { ctx.beginPath(); ctx.roundRect(o.x, o.y, grid-1, grid-1, 4); ctx.fill(); });

    foodItems.forEach(f => {
        ctx.fillStyle = "#161b22"; ctx.beginPath(); ctx.roundRect(f.x, f.y, grid-1, grid-1, 4); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "bold 9px sans-serif"; ctx.textAlign = "center";
        ctx.textBaseline = "middle"; ctx.fillText(f.text, f.x + grid/2, f.y + grid/2);
    });

    snake.cells.forEach((cell, i) => {
        const size = (i === 0) ? grid - 2 : grid - 8; 
        const offset = (i === 0) ? 1 : 4;
        const radius = (i === 0) ? 8 : 4;
        ctx.fillStyle = (i === 0) ? "#00a859" : "#9e9e9e";
        ctx.beginPath(); ctx.roundRect(cell.x + offset, cell.y + offset, size, size, radius); ctx.fill();

        if (i === 0) {
            foodItems.forEach(f => {
                if (cell.x === f.x && cell.y === f.y) {
                    if (f.isCorrect) {
                        playSound('success');
                        score++; snake.maxCells++;
                        document.getElementById("progress").innerText = `${score}/15`;
                        if (score === 5) showOverlay("LEVEL UP!", "English only now!");
                        if (score === 10) {
                            obstacles = [{x:100,y:100},{x:500,y:100},{x:100,y:300},{x:500,y:300}];
                            showOverlay("LEVEL UP!", "Obstacles added!");
                        }
                        if (score >= 15) { showOverlay("VICTORY!", "SER Mastered!"); score = 0; snake.maxCells = 2; }
                        initRound();
                    } else { handlePenalty("Wrong form!"); }
                }
            });
        }
    });
}

document.addEventListener('keydown', e => {
    if (isPaused && e.key === "Enter") { startGame(); return; }
    if (isPaused) return;
    if (e.key === 'ArrowLeft' && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
    else if (e.key === 'ArrowUp' && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
    else if (e.key === 'ArrowRight' && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
    else if (e.key === 'ArrowDown' && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
});

window.onload = () => { initRound(); loop(); };