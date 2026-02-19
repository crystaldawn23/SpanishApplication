const partyTypeDisplay = document.getElementById('party-type');
const entrance = document.getElementById('party-entrance');
const scoreVal = document.getElementById('score');

let score = 0;
let currentParty = null;

const parties = [
    { name: "Una Boda", good: ["💍", "🍰", "🥂", "👰‍♀️"], bad: ["🎂", "🕯️", "🎓", "🎃"] },
    { name: "Un Cumpleaños", good: ["🎂", "🎈", "🎁", "🕯️"], bad: ["💍", "🎓", "🦃", "🎄"] },
    { name: "La Navidad", good: ["🎄", "🎁", "🍪", "🎅"], bad: ["🎆", "🎓", "👙", "🎂"] },
    { name: "Una Graduación", good: ["🎓", "📜", "🍾", "📸"], bad: ["👰‍♀️", "🦃", "🧸", "🕯️"] }
];

function nextParty() {
    currentParty = parties[Math.floor(Math.random() * parties.length)];
    partyTypeDisplay.innerText = currentParty.name;
}

function spawnItem() {
    const isGood = Math.random() > 0.4;
    const item = isGood 
        ? currentParty.good[Math.floor(Math.random() * currentParty.good.length)]
        : currentParty.bad[Math.floor(Math.random() * currentParty.bad.length)];

    const div = document.createElement('div');
    div.className = 'guest-item';
    div.innerText = item;
    
    // Random start position at top
    div.style.left = Math.random() * 80 + 10 + '%';
    div.style.top = "-50px";
    entrance.appendChild(div);

    let top = -50;
    let speed = 2 + (score / 10); // Gets faster as they score more
    
    let move = setInterval(() => {
        top += speed;
        div.style.top = top + 'px';

        // If it reaches the door
        if (top > 300) {
            clearInterval(move);
            if (currentParty.bad.includes(item)) {
                // Wrong item reached the door!
                score = Math.max(0, score - 5);
                entrance.style.backgroundColor = "#ee4540";
                setTimeout(() => entrance.style.backgroundColor = "transparent", 200);
            } else {
                // Correct item reached the door
                score += 10;
            }
            scoreVal.innerText = score;
            div.remove();
        }
    }, 20);

    // If the player clicks the item
    div.onclick = () => {
        clearInterval(move);
        if (currentParty.bad.includes(item)) {
            // Good job! You stopped a crasher
            score += 5;
            div.style.filter = "grayscale(100%)";
            setTimeout(() => div.remove(), 100);
        } else {
            // Oh no! You clicked a valid guest
            score = Math.max(0, score - 10);
            div.innerText = "❌";
            setTimeout(() => div.remove(), 200);
        }
        scoreVal.innerText = score;
    };
}

nextParty();
setInterval(spawnItem, 2000);
// Change the party theme every 15 seconds
setInterval(nextParty, 15000);