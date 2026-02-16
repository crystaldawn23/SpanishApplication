const rounds = [
    { sentence: "Ella ___ mi tía.", answer: "ser" },
    { sentence: "Mi tía ___ en la cocina.", answer: "estar" },
    { sentence: "Nosotros ___ una familia grande.", answer: "ser" },
    { sentence: "El abuelo ___ muy feliz hoy.", answer: "estar" },
    { sentence: "Ustedes ___ mis primos.", answer: "ser" }
];

let currentRound = 0;

function loadRound() {
    document.getElementById('prompt-text').innerText = rounds[currentRound].sentence;
}

function attack(choice) {
    const char = document.getElementById('player-char');
    
    if (choice === rounds[currentRound].answer) {
        // Victory animation
        char.classList.add('bounce');
        setTimeout(() => char.classList.remove('bounce'), 300);
        
        currentRound++;
        if (currentRound < rounds.length) {
            loadRound();
        } else {
            alert("DUEL WON! Your Ser vs. Estar skills are legendary.");
            window.location.href = "../../index.html";
        }
    } else {
        // Fail animation
        char.classList.add('shake');
        setTimeout(() => char.classList.remove('shake'), 500);
    }
}

window.onload = loadRound;