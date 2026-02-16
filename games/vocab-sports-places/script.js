const iconDisplay = document.getElementById('activity-icon');
const promptDisplay = document.getElementById('prompt-text');
const navGrid = document.getElementById('nav-grid');
const scoreDisplay = document.getElementById('score');

let score = 0;

const data = [
    // Sports / Activities
    { icon: "🚲", prompt: "¿Qué actividad es?", correct: "el ciclismo", options: ["el ciclismo", "el buceo", "la natación", "el tenis"] },
    { icon: "🤿", prompt: "¿Qué actividad es?", correct: "el buceo", options: ["el buceo", "el esquí", "la escalada", "el fútbol"] },
    { icon: "🥾", prompt: "¿Qué actividad es?", correct: "el excursionismo", options: ["el excursionismo", "correr", "el golf", "nadar"] },
    { icon: "🎾", prompt: "¿Qué deporte es?", correct: "el tenis", options: ["el tenis", "el vóleibol", "el béisbol", "el esquí"] },
    { icon: "🏐", prompt: "¿Qué deporte es?", correct: "el vóleibol", options: ["el vóleibol", "el fútbol", "el básquetbol", "el golf"] },
    // Places
    { icon: "🏛️", prompt: "¿Adónde vas?", correct: "el museo", options: ["el museo", "el cine", "el estadio", "la plaza"] },
    { icon: "🏊", prompt: "¿Adónde vas?", correct: "la piscina", options: ["la piscina", "la montaña", "el centro", "el café"] },
    { icon: "⛪", prompt: "¿Adónde vas?", correct: "la iglesia", options: ["la iglesia", "la biblioteca", "el parque", "el estadio"] },
    { icon: "🛍️", prompt: "¿Adónde vas?", correct: "el centro comercial", options: ["el centro comercial", "el gimnasio", "el cine", "el museo"] },
    { icon: "👟", prompt: "¿Adónde vas?", correct: "el gimnasio", options: ["el gimnasio", "el restaurante", "la piscina", "el parque"] }
];

function nextRound() {
    const round = data[Math.floor(Math.random() * data.length)];
    iconDisplay.innerText = round.icon;
    promptDisplay.innerText = round.prompt;
    
    navGrid.innerHTML = '';
    round.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === round.correct) {
                score += 100;
                scoreDisplay.innerText = score;
                nextRound();
            } else {
                score = Math.max(0, score - 50);
                scoreDisplay.innerText = score;
                btn.style.backgroundColor = "#ef4444";
                btn.style.borderBottomColor = "#b91c1c";
            }
        };
        navGrid.appendChild(btn);
    });
}

nextRound();