const questions = [
    { subject: "YO", stem: "HABL", correct: "O", options: ["O", "AS", "A"] },
    { subject: "TÚ", stem: "BAIL", correct: "AS", options: ["O", "AS", "A"] },
    { subject: "ÉL", stem: "CANT", correct: "A", options: ["A", "AMOS", "AN"] },
    { subject: "NOSOTROS", stem: "ESTUDI", correct: "AMOS", options: ["AN", "AMOS", "AS"] },
    { subject: "ELLOS", stem: "CAMIN", correct: "AN", options: ["A", "AS", "AN"] },
    { subject: "USTED", stem: "NAD", correct: "A", options: ["O", "A", "AS"] }
];

let currentQ = 0;

function loadQuestion() {
    const q = questions[currentQ];
    document.getElementById('subject-box').innerText = q.subject;
    document.getElementById('verb-stem').innerHTML = `${q.stem}<span id="ending-placeholder">__</span>`;
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'ending-btn';
        btn.innerText = opt;
        btn.onclick = () => check(opt);
        grid.appendChild(btn);
    });

    const progress = (currentQ / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

function check(choice) {
    if (choice === questions[currentQ].correct) {
        currentQ++;
        if (currentQ < questions.length) {
            loadQuestion();
        } else {
            document.getElementById('progress-fill').style.width = `100%`;
            setTimeout(() => {
                alert("CONJUGATION COMPLETE! You are an -AR pro.");
                window.location.href = "../../index.html";
            }, 300);
        }
    } else {
        document.getElementById('display-screen').style.borderColor = "#fc8181";
        setTimeout(() => document.getElementById('display-screen').style.borderColor = "#63b3ed", 500);
    }
}

document.addEventListener('DOMContentLoaded', loadQuestion);