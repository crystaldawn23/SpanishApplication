const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const grid = 30;

const verbData = [
    { eng: "I am", span: "YO", a: "SOY", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "You are (fam.)", span: "TÚ", a: "ERES", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "He/She is", span: "ÉL/ELLA", a: "ES", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "We are", span: "NOSOTROS", a: "SOMOS", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] },
    { eng: "They are", span: "ELLOS", a: "SON", opts: ["SOY", "ERES", "ES", "SOMOS", "SON"] }
];

let score = 0, goal = 15, level = 1, count = 0, isPaused = true;
let snake = { x: 300, y: 300, dx: grid, dy: 0, cells: [], maxCells: 2 };
let foodItems = [], obstacles = [];

const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const continueBtn = document.getElementById("continue-btn");
const msgBox = document.getElementById("msg-box");

function showOverlay(title, text, btnText = "CONTINUE (Enter)", isDanger = false) {
    isPaused = true;
    overlayTitle.innerText = title;
    overlayText.innerText = text;
    continueBtn.innerText = btnText;
    overlayTitle.style.color = isDanger ? "#e63946" : "#00a859";
    overlay.classList.remove("hidden");
}

continueBtn.onclick = () => {
    overlay.classList.add("hidden");
    isPaused = false;
};

function getUniquePos() {
    let pos, isOccupied;
    const minDistance = grid * 2;
    do {
        isOccupied = false;
        pos = { x: Math.floor(Math.random() * 18 + 1) * grid, y: Math.floor(Math.random() * 18 + 1) * grid };
        if (snake.cells.some(c => c.x === pos.x && c.y === pos.y)) isOccupied = true;
        if (obstacles.some(o => o.x === pos.x && o.y === pos.y)) isOccupied = true;
        if (foodItems.some(f => {
            const dist = Math.sqrt(Math.pow(f.x - pos.x, 2) + Math.pow(f.y - pos.y, 2));
            return dist < minDistance;
        })) isOccupied = true;
    } while (isOccupied);
    return pos;
}

function initRound() {
    const data = verbData[Math.floor(Math.random() * verbData.length)];
    const prompt = document.getElementById("prompt");
    const hint = document.getElementById("hint");

    if (score < 5) {
        prompt.innerText = `${data.eng.toUpperCase()} (${data.span})`;
        hint.innerText = "Level 1: English + Spanish Support";
    } else if (score < 10) {
        prompt.innerText = data.eng.toUpperCase();
        hint.innerText = "Level 2: English Only";
    } else {
        prompt.innerText = data.eng.toUpperCase();
        hint.innerText = "Level 3: Obstacles Added!";
    }

    foodItems = [];
    data.opts.forEach(opt => {
        const pos = getUniquePos();
        foodItems.push({ x: pos.x, y: pos.y, text: opt, isCorrect: opt === data.a });
    });
}

function handlePenalty(reason) {
    score--;
    if (snake.maxCells > 1) snake.maxCells--;
    if (snake.cells.length > snake.maxCells) snake.cells.pop();
    document.getElementById("progress").innerText = `${Math.max(0, score)}/${goal}`;
    
    msgBox.innerText = `Incorrect! -1 Point`;
    msgBox.classList.add("penalty-text");

    if (score < 0) {
        showOverlay("GAME OVER", "You ran out of segments! Try again.", "RESTART (Enter)", true);
        resetGame();
    } else {
        if (score < 10) obstacles = [];
        if (score < 5) level = 1;
        document.getElementById("level-text").innerText = `Level: ${score < 5 ? 1 : (score < 10 ? 2 : 3)}`;
        showOverlay("OUCH!", reason, "TRY AGAIN (Enter)", true);
        initRound();
        snake.x = 300; snake.y = 300; snake.cells = [];
    }
}

function resetGame() {
    score = 0; level = 1; obstacles = [];
    snake = { x: 300, y: 300, dx: grid, dy: 0, cells: [], maxCells: 2 };
    document.getElementById("progress").innerText = `0/${goal}`;
    document.getElementById("level-text").innerText = "Level: 1";
    initRound();
}

function loop() {
    requestAnimationFrame(loop);
    if (isPaused || ++count < 8) return;
    count = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    const outOfBounds = snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height;
    const hitWall = obstacles.some(o => o.x === snake.x && o.y === snake.y);
    const hitSelf = snake.cells.some((c, i) => i !== 0 && c.x === snake.x && c.y === snake.y);

    if (outOfBounds) { handlePenalty("You hit the wall!"); return; }
    if (hitWall) { handlePenalty("You hit an obstacle!"); return; }
    if (hitSelf) { handlePenalty("You bit your tail!"); return; }

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    ctx.fillStyle = "#455a64";
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, grid-1, grid-1));

    foodItems.forEach(f => {
        ctx.fillStyle = "#222e35";
        ctx.fillRect(f.x, f.y, grid-1, grid-1);
        ctx.fillStyle = "white"; ctx.font = "bold 14px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(f.text, f.x + grid/2, f.y + grid/1.5);
    });

    snake.cells.forEach((cell, index) => {
        ctx.fillStyle = (index === 0) ? "#00a859" : "#bbe1fa";
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
        if (index === 0) {
            foodItems.forEach(f => {
                if (cell.x === f.x && cell.y === f.y) {
                    if (f.isCorrect) {
                        score++; snake.maxCells++;
                        msgBox.innerText = "Correct!";
                        msgBox.classList.remove("penalty-text");
                        document.getElementById("progress").innerText = `${score}/${goal}`;
                        
                        if (score === 5) { level = 2; showOverlay("LEVEL UP!", "Now prompts are English only."); }
                        if (score === 10) { level = 3; obstacles = [{x: 4 * grid, y: 4 * grid}, {x: 15 * grid, y: 4 * grid}, {x: 4 * grid, y: 15 * grid}, {x: 15 * grid, y: 15 * grid}]; showOverlay("LEVEL UP!", "Watch out for the new obstacles!"); }
                        
                        if (score >= 15) { 
                            showOverlay("VICTORY!", "You mastered the verb SER.", "PLAY AGAIN (Enter)"); 
                            resetGame(); 
                        } else { 
                            initRound(); 
                        }
                    } else { handlePenalty("Wrong conjugation!"); }
                }
            });
        }
    });
}

document.addEventListener('keydown', e => {
    if (isPaused && e.key === "Enter") {
        overlay.classList.add("hidden");
        isPaused = false;
        return;
    }
    if (isPaused) return;

    if (e.key === 'ArrowLeft' && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
    else if (e.key === 'ArrowUp' && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
    else if (e.key === 'ArrowRight' && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
    else if (e.key === 'ArrowDown' && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
});

window.onload = () => { initRound(); loop(); };