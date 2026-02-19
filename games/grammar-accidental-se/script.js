const wordBank = document.getElementById('word-bank');
const mishapDesc = document.getElementById('mishap-desc');
const mishapIcon = document.getElementById('mishap-icon');
const scoreVal = document.getElementById('score');

let score = 0;
let currentStep = 0;

const mishaps = [
    { desc: "You lost the prescription.", icon: "📄💨", words: ["Se", "me", "perdió", "la receta"] },
    { desc: "The pills fell (to us).", icon: "💊👇", words: ["Se", "nos", "cayeron", "las pastillas"] },
    { desc: "The thermometer broke (to you).", icon: "🌡️💥", words: ["Se", "te", "rompió", "el termómetro"] },
    { desc: "The keys were left behind (to him).", icon: "🔑🏠", words: ["Se", "le", "quedaron", "las llaves"] }
];

let currentMishap = null;

function nextMishap() {
    currentMishap = mishaps[Math.floor(Math.random() * mishaps.length)];
    mishapDesc.innerText = currentMishap.desc;
    mishapIcon.innerText = currentMishap.icon;
    currentStep = 0;
    
    // Clear slots
    for(let i=0; i<4; i++) {
        document.getElementById(`slot-${i}`).innerText = "?";
        document.getElementById(`slot-${i}`).style.backgroundColor = "#dcfce7";
    }

    // Shuffle and show words
    wordBank.innerHTML = '';
    [...currentMishap.words].sort(() => Math.random() - 0.5).forEach(word => {
        const btn = document.createElement('button');
        btn.className = 'word-btn';
        btn.innerText = word;
        btn.onclick = () => {
            if (word === currentMishap.words[currentStep]) {
                document.getElementById(`slot-${currentStep}`).innerText = word;
                document.getElementById(`slot-${currentStep}`).style.backgroundColor = "#86efac";
                currentStep++;
                btn.style.visibility = "hidden";
                if (currentStep === 4) {
                    score++;
                    scoreVal.innerText = score;
                    setTimeout(nextMishap, 1000);
                }
            } else {
                // Shake slots on error
                document.getElementById(`slot-${currentStep}`).style.backgroundColor = "#fca5a5";
                setTimeout(() => document.getElementById(`slot-${currentStep}`).style.backgroundColor = "#dcfce7", 300);
            }
        };
        wordBank.appendChild(btn);
    });
}

nextMishap();