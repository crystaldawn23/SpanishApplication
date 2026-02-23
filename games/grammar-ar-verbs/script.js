const verbData = [
    { verb: "Hablar", subject: "Yo", answer: "Hablo", options: ["Hablo", "Hablas", "Habla", "Hablan"] },
    { verb: "Comer", subject: "Nosotros", answer: "Comemos", options: ["Como", "Comes", "Comemos", "Comen"] },
    { verb: "Vivir", subject: "Ellos", answer: "Viven", options: ["Vivo", "Vives", "Vivimos", "Viven"] }
];

let currentIndex = 0;
let score = 0;

const subjectDisplay = document.getElementById('subject-display');
const verbDisplay = document.getElementById('current-verb');
const scoreDisplay = document.getElementById('score');
const optionsContainer = document.getElementById('options-container');

function loadQuestion() {
    const current = verbData[currentIndex];
    verbDisplay.innerText = current.verb;
    subjectDisplay.innerText = current.subject;
    optionsContainer.innerHTML = '';

    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, button) {
    const correct = verbData[currentIndex].answer;
    
    if (selected === correct) {
        button.classList.add('correct');
        score += 10;
        scoreDisplay.innerText = score;
        setTimeout(nextQuestion, 600);
    } else {
        button.classList.add('wrong');
        // Small shake effect could be added here
    }
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < verbData.length) {
        loadQuestion();
    } else {
        subjectDisplay.innerText = "¡Muy bien!";
        optionsContainer.innerHTML = '<button onclick="location.reload()">Play Again</button>';
    }
}

loadQuestion();