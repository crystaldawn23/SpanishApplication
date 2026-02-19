const questionText = document.getElementById('question-text');
const logicHint = document.getElementById('logic-hint');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const partyQuestions = [
    { q: "¿_______ es el postre?", a: "qué", hint: "Asking for a definition." },
    { q: "¿_______ de los pasteles quieres?", a: "cuál", hint: "Selection from a group." },
    { q: "¿_______ música prefieres?", a: "qué", hint: "Used before a noun (música)." },
    { q: "¿_______ es tu dirección?", a: "cuál", hint: "Standard for 'What is' regarding info." },
    { q: "¿_______ fiesta es hoy?", a: "qué", hint: "Used before a noun (fiesta)." },
    { q: "¿_______ son tus amigos?", a: "cuáles", hint: "Selection (plural)." }, // Sneaky plural test!
    { q: "¿_______ bebida vas a traer?", a: "qué", hint: "Used before a noun (bebida)." }
];

function nextGuest() {
    current = partyQuestions[Math.floor(Math.random() * partyQuestions.length)];
    questionText.innerText = current.q;
    logicHint.innerText = "";
}

function checkAnswer(userChoice) {
    // Basic logic for Qué/Cuál (Handling plural 'cuáles' as 'cuál' for the button simplicity)
    const isCorrect = (userChoice === 'qué' && current.a === 'qué') || 
                      (userChoice === 'cuál' && (current.a === 'cuál' || current.a === 'cuáles'));

    if (isCorrect) {
        score++;
        scoreVal.innerText = score;
        logicHint.style.color = "#55efc4";
        logicHint.innerText = "¡Correcto! " + current.hint;
        setTimeout(nextGuest, 1200);
    } else {
        logicHint.style.color = "#ff7675";
        logicHint.innerText = "Error. " + current.hint;
    }
}

nextGuest();