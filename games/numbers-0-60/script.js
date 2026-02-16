const numbers = [
    { word: "once", value: 11, icon: "🍦" },
    { word: "veintidós", value: 22, icon: "🎮" },
    { word: "quince", value: 15, icon: "🍕" },
    { word: "treinta y uno", value: 31, icon: "🛹" },
    { word: "cincuenta y cuatro", value: 54, icon: "🎸" },
    { word: "cero", value: 0, icon: "🎈" },
    { word: "diecinueve", value: 19, icon: "📱" }
];

let currentLevel = 0;
let currentInput = "";

function setupGame() {
    // Generate keypad
    const keypad = document.getElementById('keypad');
    keypad.innerHTML = '';
    [1,2,3,4,5,6,7,8,9,0].forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.innerText = num;
        btn.onclick = () => addDigit(num);
        keypad.appendChild(btn);
    });
    loadPrize();
}

function loadPrize() {
    const item = numbers[currentLevel];
    document.getElementById('price-word').innerText = item.word;
    document.getElementById('prize-item').innerText = item.icon;
    currentInput = "";
    updateDisplay();
}

function addDigit(num) {
    if (currentInput.length < 2) {
        currentInput += num;
        updateDisplay();
    }
}

function clearInput() {
    currentInput = "";
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('number-input').innerText = currentInput || "0";
}

function checkPrice() {
    const correct = numbers[currentLevel].value;
    if (parseInt(currentInput) === correct) {
        alert("ITEM PURCHASED!");
        currentLevel++;
        if (currentLevel < numbers.length) {
            loadPrize();
        } else {
            alert("SHOP EMPTIED! You know your numbers.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("INSUFFICIENT COINS!");
        clearInput();
    }
}

document.addEventListener('DOMContentLoaded', setupGame);