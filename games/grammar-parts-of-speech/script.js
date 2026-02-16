const wordBank = [
    { text: "Run", type: "verb" },
    { text: "Apple", type: "noun" },
    { text: "Purple", type: "adj" },
    { text: "Teacher", type: "noun" },
    { text: "Shout", type: "verb" },
    { text: "Hungry", type: "adj" },
    { text: "Fort Wayne", type: "noun" },
    { text: "Sleepy", type: "adj" },
    { text: "Dance", type: "verb" },
    { text: "Computer", type: "noun" },
    { text: "Slowly", type: "adj" },
    { text: "Think", type: "verb" }
];

let score = 0;
let currentWordIndex = 0;

function nextWord() {
    currentWordIndex = Math.floor(Math.random() * wordBank.length);
    document.getElementById('active-word-card').innerText = wordBank[currentWordIndex].text;
}

function checkDrop(selectedType) {
    const correctType = wordBank[currentWordIndex].type;
    
    if (selectedType === correctType) {
        score += 10;
        document.getElementById('score').innerText = score;
        document.getElementById('active-word-card').style.backgroundColor = "#46bb7c";
        setTimeout(() => {
            document.getElementById('active-word-card').style.backgroundColor = "white";
            nextWord();
        }, 300);
    } else {
        document.getElementById('active-word-card').style.backgroundColor = "#e94560";
        setTimeout(() => {
            document.getElementById('active-word-card').style.backgroundColor = "white";
        }, 300);
    }
}

window.onload = nextWord;