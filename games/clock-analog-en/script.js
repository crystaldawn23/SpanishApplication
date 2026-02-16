const wordBank = [
    { hour: 8, minute: 50 },
    { hour: 10, minute: 15 },
    { hour: 3, minute: 30 },
    { hour: 12, minute: 45 },
    { hour: 5, minute: 0 },
    { hour: 1, minute: 20 },
    { hour: 11, minute: 40 },
    { hour: 9, minute: 10 }
];

let currentCorrectTime = "";

// 1. DRAW THE NUMBERS ON THE FACE
function drawNumbers() {
    const container = document.getElementById('number-container');
    const radius = 82; 
    const width = 200; 
    const height = 200; 

    for (let i = 1; i <= 12; i++) {
        const number = document.createElement('div');
        number.className = 'clock-number';
        number.innerText = i;

        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = (width / 2) + radius * Math.cos(angle);
        const y = (height / 2) + radius * Math.sin(angle);

        number.style.left = `${x}px`;
        number.style.top = `${y}px`;
        container.appendChild(number);
    }
}

// 2. SET THE HANDS AND GENERATE ANSWERS
function generateTime() {
    // Pick a random time from our bank
    const timeData = wordBank[Math.floor(Math.random() * wordBank.length)];
    
    // Rotate Hands
    const hourDeg = (timeData.hour * 30) + (timeData.minute * 0.5);
    const minDeg = timeData.minute * 6;
    
    document.getElementById('hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minDeg}deg)`;
    
    // Set the correct string for checking
    currentCorrectTime = `${timeData.hour}:${timeData.minute === 0 ? "00" : timeData.minute}`;
    
    generateButtons(currentCorrectTime);
}

// 3. CREATE THE CHOICE BUTTONS
function generateButtons(correct) {
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    // Create a list of 3 options
    let options = [correct];
    while(options.length < 3) {
        let h = Math.floor(Math.random() * 12) + 1;
        let m = [0, 15, 30, 45, 10, 50][Math.floor(Math.random() * 6)];
        let str = `${h}:${m === 0 ? "00" : m}`;
        if(!options.includes(str)) options.push(str);
    }
    
    // Shuffle
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        grid.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if(selected === currentCorrectTime) {
        // You could add a sound effect or "juice" here later!
        generateTime(); 
    } else {
        const ui = document.getElementById('game-ui');
        ui.style.borderColor = "#ff007a"; // Red flash
        setTimeout(() => ui.style.borderColor = "#00ff41", 300);
    }
}

// 4. START EVERYTHING
document.addEventListener('DOMContentLoaded', () => {
    drawNumbers();
    generateTime();
});