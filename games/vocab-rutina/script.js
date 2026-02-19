const world = document.getElementById('game-world');
const runner = document.getElementById('runner');
const taskText = document.getElementById('task-text');
const scoreVal = document.getElementById('score-val');

let score = 0;
let isJumping = false;
let currentTarget = null;

const routine = [
    { phrase: "Primero, me lavo el pelo.", item: "🧴" },
    { phrase: "Luego, me cepillo los dientes.", item: "🪥" },
    { phrase: "Después, me seco con la toalla.", item: "🧣" },
    { phrase: "Entonces, me afeito la cara.", item: "🪒" },
    { phrase: "Finalmente, me maquillo.", item: "💄" },
    { phrase: "Necesito lavarme las manos.", item: "🧼" }
];

function nextTask() {
    currentTarget = routine[Math.floor(Math.random() * routine.length)];
    taskText.innerText = currentTarget.phrase;
}

// Jump logic
world.onclick = () => {
    if (isJumping) return;
    isJumping = true;
    runner.style.transition = "bottom 0.4s ease-out";
    runner.style.bottom = "150px";
    
    setTimeout(() => {
        runner.style.bottom = "20px";
        setTimeout(() => { isJumping = false; }, 400);
    }, 400);
};

function spawnItem() {
    if (!currentTarget) return;

    const itemEl = document.createElement('div');
    itemEl.className = 'collectible';
    
    // 50/50 chance of being the right item
    const isCorrect = Math.random() > 0.5;
    const itemData = isCorrect ? currentTarget : routine[Math.floor(Math.random() * routine.length)];
    
    itemEl.innerText = itemData.item;
    itemEl.style.bottom = "140px"; 
    itemEl.style.left = "800px"; // Start at the far right
    world.appendChild(itemEl);

    let pos = 800;
    let moveInterval = setInterval(() => {
        pos -= 5; // Slower speed so they can actually react
        itemEl.style.left = pos + 'px';

        // Collision Logic
        const rRect = runner.getBoundingClientRect();
        const iRect = itemEl.getBoundingClientRect();

        // If the item overlaps the runner's area
        if (iRect.left < rRect.right && 
            iRect.right > rRect.left && 
            iRect.top < rRect.bottom && 
            iRect.bottom > rRect.top) {
            
            if (itemEl.innerText === currentTarget.item) {
                score += 100;
                scoreVal.innerText = score;
                itemEl.style.transform = "scale(2)";
                nextTask();
            } else {
                score = Math.max(0, score - 50);
                scoreVal.innerText = score;
                world.style.backgroundColor = "#450a0a"; // Flash red on error
                setTimeout(() => world.style.backgroundColor = "#334155", 200);
            }
            clearInterval(moveInterval);
            itemEl.remove();
        }

        // Remove if it goes off screen to the left
        if (pos < -50) {
            clearInterval(moveInterval);
            itemEl.remove();
        }
    }, 20);
}

// Initialize
nextTask();
setInterval(spawnItem, 2500);