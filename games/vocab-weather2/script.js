const screen = document.getElementById('game-screen');
const shield = document.getElementById('shield');
const announcement = document.getElementById('weather-announcement');
const scoreDisplay = document.getElementById('score-val');

let score = 0;
let currentCondition = "hace sol";

const weatherTypes = [
    { phrase: "Está lloviendo", item: "💧", protection: "☂️" },
    { phrase: "Hace sol", item: "☀️", protection: "🕶️" },
    { phrase: "Está nevando", item: "❄️", protection: "🧣" },
    { phrase: "Hace viento", item: "🍃", protection: "🏠" }
];

// Move shield with mouse
screen.addEventListener('mousemove', (e) => {
    shield.style.left = (e.clientX - 25) + 'px';
    shield.style.top = (e.clientY - 25) + 'px';
});

function changeWeather() {
    const config = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    currentCondition = config;
    announcement.innerText = config.phrase;
    shield.innerText = config.protection;
}

function spawnElement() {
    const el = document.createElement('div');
    el.className = 'falling-item';
    el.innerText = currentCondition.item;
    el.style.left = Math.random() * (window.innerWidth - 30) + 'px';
    el.style.top = '-50px';
    screen.appendChild(el);

    let pos = -50;
    let fall = setInterval(() => {
        pos += 5;
        el.style.top = pos + 'px';

        // Collision with shield
        let sRect = shield.getBoundingClientRect();
        let eRect = el.getBoundingClientRect();

        if (eRect.left < sRect.right && eRect.right > sRect.left &&
            eRect.top < sRect.bottom && eRect.bottom > sRect.top) {
            score += 10;
            scoreDisplay.innerText = score;
            clearInterval(fall);
            el.remove();
        }

        if (pos > window.innerHeight) {
            clearInterval(fall);
            el.remove();
        }
    }, 20);
}

setInterval(spawnElement, 1000);
setInterval(changeWeather, 5000);
changeWeather();