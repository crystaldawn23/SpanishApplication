const repairJobs = [
    // Punctuation & Accents
    { word: "_Cómo estás?", options: ["¿", "¡", "?"], correct: "¿" },
    { word: "espa_ol", options: ["n", "ñ", "ni"], correct: "ñ" },
    { word: "Adi_s", options: ["o", "ó", "ò"], correct: "ó" },
    { word: "_Qué tal!", options: ["¿", "¡", "!"], correct: "¡" },
    
    // Phonetic Recognition (The Sound of the letters)
    { word: 'Which letter is "HOH-TAH"?', options: ["G", "J", "H"], correct: "J" },
    { word: 'Which letter is "AH-CHEH"?', options: ["A", "H", "CH"], correct: "H" },
    { word: 'Which letter is "EH-NYEH"?', options: ["N", "Ñ", "LL"], correct: "Ñ" },
    { word: 'Which letter is "EE-GREE-EH-GAH"?', options: ["I", "G", "Y"], correct: "Y" }
];

let currentJob = 0;

function loadJob() {
    const job = repairJobs[currentJob];
    document.getElementById('word-display').innerText = job.word;

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    job.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'part-btn'; // Matches your existing CSS
        btn.innerText = opt;
        btn.onclick = () => checkRepair(opt, job.correct);
        grid.appendChild(btn);
    });
}

function checkRepair(selected, correct) {
    if (selected === correct) {
        currentJob++;
        if (currentJob < repairJobs.length) {
            loadJob();
        } else {
            alert("SYSTEM REPAIRED: Alphabet and Punctuation Sync Complete!");
            window.location.href = "../../index.html";
        }
    } else {
        // Your existing "Red alert" flash logic here
        const screen = document.getElementById('display-screen');
        screen.style.background = "#440000";
        setTimeout(() => screen.style.background = "#001a00", 300);
    }
}

document.addEventListener('DOMContentLoaded', loadJob);