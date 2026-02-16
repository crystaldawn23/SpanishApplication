const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const targetDisplay = document.getElementById("target-month");
const scoreDisplay = document.getElementById("score-val");

const gridSize = 20;
let score = 0;
let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let food = { x: 5, y: 5, name: "" };

const months = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
];
let monthIndex = 0;

function initGame() {
    spawnFood();
    document.addEventListener("keydown", changeDirection);
    setInterval(main, 150); // Game speed
}

function main() {
    if (didGameEnd()) {
        resetGame();
        return;
    }
    advanceSnake();
    drawGame();
}

function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 100;
        scoreDisplay.innerText = score;
        monthIndex = (monthIndex + 1) % 12;
        spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize));
    food.y = Math.floor(Math.random() * (canvas.height / gridSize));
    food.name = months[monthIndex];
    targetDisplay.innerText = food.name;
}

function drawGame() {
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    ctx.fillStyle = "#10b981";
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Draw Food Text
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 14px Segoe UI";
    ctx.fillText(food.name, food.x * gridSize, food.y * gridSize + 15);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && dx === 0) { dx = -1; dy = 0; }
    if (keyPressed === 38 && dy === 0) { dx = 0; dy = -1; }
    if (keyPressed === 39 && dx === 0) { dx = 1; dy = 0; }
    if (keyPressed === 40 && dy === 0) { dx = 0; dy = 1; }
}

function didGameEnd() {
    const head = snake[0];
    const hitWall = head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize;
    const hitSelf = snake.slice(1).some(part => part.x === head.x && part.y === head.y);
    return hitWall || hitSelf;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0; dy = 0;
    monthIndex = 0;
    spawnFood();
}

initGame();