const correctOrder = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
let currentMatch = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function loadGame() {
    const bank = document.getElementById('day-bank');
    bank.innerHTML = '';
    document.getElementById('calendar-track').innerHTML = '';
    currentMatch = 0;

    const scrambled = shuffle([...correctOrder]);
    scrambled.forEach(day => {
        const tile = document.createElement('div');
        tile.className = 'day-tile';
        tile.innerText = day;
        tile.onclick = () => selectDay(day, tile);
        bank.appendChild(tile);
    });
}

function selectDay(day, element) {
    if (day === correctOrder[currentMatch]) {
        document.getElementById('calendar-track').appendChild(element);
        element.onclick = null;
        element.style.opacity = "0.7";
        currentMatch++;
        
        if (currentMatch === correctOrder.length) {
            alert("¡Excelente! The week is complete.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("¡No! Remember, the Spanish week starts with Lunes.");
    }
}

function resetGame() {
    loadGame();
}

window.onload = loadGame;