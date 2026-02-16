const routine = [
    { time: "7:00 AM", options: ["me despierto", "se despierta"], correct: "me despierto" },
    { time: "8:00 AM", options: ["me ducho", "te duchas"], correct: "me ducho" },
    { time: "3:00 PM", options: ["me entreno", "se entrena"], correct: "me entreno" },
    { time: "10:00 PM", options: ["me acuesto", "nos acostamos"], correct: "me acuesto" }
];

function updateRoutine() {
    const val = document.getElementById('time-slider').value;
    const step = routine[val];
    document.getElementById('clock').innerText = step.time;
    
    const grid = document.getElementById('choice-grid');
    grid.innerHTML = '';
    
    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => check(opt, step.correct);
        grid.appendChild(btn);
    });
}

function check(pick, correct) {
    if (pick === correct) {
        alert("¡Correcto!");
        if (document.getElementById('time-slider').value == 3) {
            alert("Routine complete!");
            window.location.href = "../../index.html";
        }
    } else {
        alert("¡No! Check the reflexive pronoun.");
    }
}

window.onload = updateRoutine;