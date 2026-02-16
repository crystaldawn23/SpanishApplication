// 1. THE DATA (The "Script")
const checks = [
    { text: "CIENTO CINCUENTA", val: "150" },
    { text: "DOSCIENTOS CINCUENTA MIL", val: "250000" },
    { text: "MIL", val: "1000" }
];

let currentLevel = 0;
let userInput = "";

// 2. THE "PULL" FUNCTION (This forces the HTML to show the word from the script)
function updateScreen() {
    const wordBox = document.getElementById('word-amount');
    // This is the line that "pulls" the word from the array above
    wordBox.innerText = checks[currentLevel].text;
    
    document.getElementById('user-total').innerText = userInput || "0";
}

// 3. THE STARTUP (Runs when the page opens)
window.onload = function() {
    console.log("Game started. Loading first word...");
    updateScreen(); 
};

// 4. THE GAMEPLAY LOGIC
function addDigit(num) {
    userInput += num;
    document.getElementById('user-total').innerText = Number(userInput).toLocaleString();
}

function reset() {
    userInput = "";
    updateScreen();
}

function verify() {
    if (userInput === checks[currentLevel].val) {
        currentLevel++;
        if (currentLevel < checks.length) {
            userInput = "";
            updateScreen(); // Pulls the NEXT word
        } else {
            alert("¡Excelente! All checks printed.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("Error: " + userInput + " is not " + checks[currentLevel].text);
        reset();
    }
}