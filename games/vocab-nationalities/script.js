const countryDisplay = document.getElementById('country-name');
const genderDisplay = document.getElementById('gender-type');
const stampGrid = document.getElementById('stamp-grid');
const scoreDisplay = document.getElementById('score');

let score = 0;

const data = [
    { country: "México", gender: "Masculino", correct: "mexicano", options: ["mexicano", "mexicana", "méxicano", "mexicanos"] },
    { country: "España", gender: "Femenino", correct: "española", options: ["español", "española", "españolas", "españolo"] },
    { country: "Estados Unidos", gender: "Masculino", correct: "estadounidense", options: ["estadounidense", "americano", "norteamericano", "estadounidensa"] },
    { country: "Puerto Rico", gender: "Femenino", correct: "puertorriqueña", options: ["puertorriqueño", "puertorriqueña", "puertorriqueñas", "portorrico"] },
    { country: "Alemania", gender: "Masculino", correct: "alemán", options: ["alemán", "alemana", "alemanes", "alemano"] },
    { country: "Francia", gender: "Femenino", correct: "francesa", options: ["francés", "francesa", "francia", "francesas"] }
];

function nextPassport() {
    const round = data[Math.floor(Math.random() * data.length)];
    countryDisplay.innerText = round.country;
    genderDisplay.innerText = round.gender;
    
    stampGrid.innerHTML = '';
    // Shuffle options
    round.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'stamp-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === round.correct) {
                score += 50;
                scoreDisplay.innerText = score;
                nextPassport();
            } else {
                score = Math.max(0, score - 20);
                scoreDisplay.innerText = score;
                btn.style.backgroundColor = "#ef4444";
            }
        };
        stampGrid.appendChild(btn);
    });
}

nextPassport();