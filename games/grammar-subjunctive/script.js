const infText = document.getElementById('inf-text');
const subjectText = document.getElementById('subject-text');
const userInput = document.getElementById('user-input');
const liquid = document.getElementById('liquid');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const database = [
    { inf: "TENER", sub: "nosotros", ans: "tengamos" },
    { inf: "HABLAR", sub: "yo", ans: "hable" },
    { inf: "COMER", sub: "tú", ans: "comas" },
    { inf: "PONER", sub: "él", ans: "ponga" },
    { inf: "SALIR", sub: "ustedes", ans: "salgan" },
    { inf: "VIVIR", sub: "ella", ans: "viva" },
    { inf: "HACER", sub: "nosotros", ans: "hagamos" },
    { inf: "DECIR", sub: "yo", ans: "diga" }
];

function next() {
    current = database[Math.floor(Math.random() * database.length)];
    infText.innerText = current.inf;
    subjectText.innerText = current.sub.toUpperCase();
    userInput.value = "";
    liquid.style.height = "60%";
    liquid.style.background = "#00ffcc";
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (userInput.value.toLowerCase().trim() === current.ans) {
            score++;
            scoreVal.innerText = score;
            liquid.style.height = "100%";
            setTimeout(next, 800);
        } else {
            liquid.style.background = "#ff0055";
            userInput.style.color = "#ff0055";
            setTimeout(() => {
                userInput.style.color = "#fff";
                liquid.style.background = "#00ffcc";
            }, 500);
        }
    }
});

next();