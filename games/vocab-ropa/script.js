const requestBubble = document.getElementById('request-bubble');
const closet = document.getElementById('closet');
const dropZone = document.getElementById('drop-zone');
const scoreVal = document.getElementById('score-val');

let score = 0;
let currentTarget = null;

const inventory = [
    { name: "una camisa roja", emoji: "👕", color: "red" },
    { name: "unos pantalones azules", emoji: "👖", color: "blue" },
    { name: "un vestido rosa", emoji: "👗", color: "pink" },
    { name: "unos zapatos negros", emoji: "👞", color: "black" },
    { name: "una falda amarilla", emoji: "👗", color: "yellow" }, // Reuse emoji for simplicity
    { name: "una chaqueta verde", emoji: "🧥", color: "green" },
    { name: "un sombrero café", emoji: "🎩", color: "brown" },
    { name: "unas botas moradas", emoji: "👢", color: "purple" }
];

function loadLevel() {
    currentTarget = inventory[Math.floor(Math.random() * inventory.length)];
    requestBubble.innerText = `"${currentTarget.name.toUpperCase()}, por favor."`;
    
    closet.innerHTML = '';
    inventory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'clothing-item';
        div.innerText = item.emoji;
        div.style.borderBottom = `5px solid ${item.color}`;
        div.draggable = true;
        
        div.ondragstart = (e) => e.dataTransfer.setData("text", item.name);
        closet.appendChild(div);
    });
}

dropZone.ondragover = (e) => e.preventDefault();
dropZone.ondrop = (e) => {
    const droppedName = e.dataTransfer.getData("text");
    if (droppedName === currentTarget.name) {
        score += 100;
        scoreVal.innerText = score;
        dropZone.style.backgroundColor = "#22c55e";
        setTimeout(() => {
            dropZone.style.backgroundColor = "transparent";
            loadLevel();
        }, 600);
    } else {
        score = Math.max(0, score - 50);
        scoreVal.innerText = score;
        dropZone.style.backgroundColor = "#ef4444";
        setTimeout(() => dropZone.style.backgroundColor = "transparent", 600);
    }
};

loadLevel();