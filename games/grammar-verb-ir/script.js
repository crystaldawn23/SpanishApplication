const questDisplay = document.getElementById('quest-text');
const optionGrid = document.getElementById('option-grid');
const scoreDisplay = document.getElementById('score');

let score = 0;

const plans = [
    { text: "Yo ___ al cine con mis amigos.", correct: "voy", options: ["voy", "vas", "va", "vamos"] },
    { text: "Nosotros ___ a jugar al fútbol.", correct: "vamos", options: ["vamos", "van", "va", "vas"] },
    { text: "Tú ___ a la biblioteca para estudiar.", correct: "vas", options: ["vas", "voy", "va", "vamos"] },
    { text: "Ellos ___ al parque los domingos.", correct: "van", options: ["van", "vamos", "va", "vais"] },
    { text: "Ella ___ a nadar en la piscina.", correct: "va", options: ["va", "voy", "vas", "vamos"] },
    { text: "Ustedes ___ a comer en el café.", correct: "van", options: ["van", "va", "vaya", "vamos"] },
    { text: "Yo ___ a ver una película.", correct: "voy", options: ["voy", "vas", "vamos", "van"] },
    { text: "Mi amigo ___ al gimnasio.", correct: "va", options: ["va", "van", "vas", "voy"] }
];

function nextTrip() {
    const trip = plans[Math.floor(Math.random() * plans.length)];
    questDisplay.innerText = trip.text;
    
    optionGrid.innerHTML = '';
    trip.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'route-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === trip.correct) {
                score += 100;
                scoreDisplay.innerText = score;
                nextTrip();
            } else {
                score = Math.max(0, score - 50);
                scoreDisplay.innerText = score;
                btn.style.backgroundColor = "#ef4444";
                btn.style.borderBottomColor = "#b91c1c";
            }
        };
        optionGrid.appendChild(btn);
    });
}

nextTrip();