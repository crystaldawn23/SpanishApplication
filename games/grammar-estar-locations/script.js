const challenges = [
    { item: "🎒", pos: { bottom: "80px", left: "50%" }, word: "encima de", name: "La mochila" },
    { item: "📚", pos: { bottom: "10px", left: "50%" }, word: "debajo de", name: "El libro" },
    { item: "✏️", pos: { bottom: "40px", left: "30%" }, word: "a la izquierda de", name: "El lápiz" },
    { item: "🗑️", pos: { bottom: "40px", left: "70%" }, word: "a la derecha de", name: "La papelera" }
];

let current = 0;

function loadChallenge() {
    const c = challenges[current];
    const itemEl = document.getElementById('target-item');
    itemEl.innerText = c.item;
    itemEl.style.bottom = c.pos.bottom;
    itemEl.style.left = c.pos.left;
    itemEl.style.transform = "translateX(-50%)";
    
    document.getElementById('prompt').innerText = `${c.name} está __________ del escritorio.`;
    
    const options = ["encima de", "debajo de", "a la izquierda de", "a la derecha de"];
    const div = document.getElementById('options');
    div.innerHTML = '';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => check(opt);
        div.appendChild(btn);
    });
}

function check(choice) {
    if (choice === challenges[current].word) {
        current++;
        if (current < challenges.length) {
            loadChallenge();
        } else {
            alert("¡Perfecto! You know your locations.");
            window.location.href = "../../index.html";
        }
    } else {
        document.getElementById('feedback').innerText = "¡Incorrecto! Mira la posición.";
        setTimeout(() => document.getElementById('feedback').innerText = "", 1500);
    }
}

window.onload = loadChallenge;