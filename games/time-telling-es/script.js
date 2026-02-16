const timeData = [
    { digital: "8:50", spanish: "Son las ocho y cincuenta" },
    { digital: "1:15", spanish: "Es la una y cuarto" },
    { digital: "4:30", spanish: "Son las cuatro y media" },
    { digital: "12:55", spanish: "Son las doce y cincuenta y cinco" },
    { digital: "2:40", spanish: "Son las dos y cuarenta" },
    { digital: "1:05", spanish: "Es la una y cinco" },
    { digital: "7:10", spanish: "Son las siete y diez" }
];

let currentIdx = 0;

function loadRound() {
    const round = timeData[currentIdx];
    document.getElementById('digital-time').innerText = round.digital;

    // Generate options
    let options = [round.spanish];
    while(options.length < 3) {
        let randomPhrase = timeData[Math.floor(Math.random() * timeData.length)].spanish;
        if(!options.includes(randomPhrase)) options.push(randomPhrase);
    }
    options.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'spell-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, round.spanish);
        grid.appendChild(btn);
    });
}

function checkAnswer(choice, correct) {
    if (choice === correct) {
        currentIdx++;
        if (currentIdx < timeData.length) {
            loadRound();
        } else {
            alert("The Tower is synchronized! You've mastered Spanish time.");
            window.location.href = "../../index.html";
        }
    } else {
        const ui = document.getElementById('game-ui');
        ui.style.borderColor = "#e74c3c"; // Red
        setTimeout(() => ui.style.borderColor = "#d4af37", 500);
    }
}

document.addEventListener('DOMContentLoaded', loadRound);