const classes = [
    { icon: "🎨", name: "el arte", options: ["el arte", "la historia", "la física"] },
    { icon: "🧪", name: "la química", options: ["la biología", "la química", "el recreo"] },
    { icon: "⚽", name: "la educación física", options: ["la música", "la educación física", "el arte"] },
    { icon: "💻", name: "la computación", options: ["la computación", "el inglés", "las matemáticas"] },
    { icon: "📐", name: "las matemáticas", options: ["la geografía", "las matemáticas", "la historia"] },
    { icon: "🌍", name: "la geografía", options: ["la literatura", "la geografía", "la física"] }
];

let currentIndex = 0;

function loadSubject() {
    const item = classes[currentIndex];
    document.getElementById('subject-icon').innerText = item.icon;
    
    const optionsGrid = document.getElementById('subject-options');
    optionsGrid.innerHTML = '';

    item.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'subject-btn';
        btn.innerText = opt;
        btn.onclick = () => checkSubject(opt);
        optionsGrid.appendChild(btn);
    });

    document.getElementById('progress').innerText = `${currentIndex} / ${classes.length}`;
}

function checkSubject(choice) {
    if (choice === classes[currentIndex].name) {
        currentIndex++;
        if (currentIndex < classes.length) {
            loadSubject();
        } else {
            alert("SCHEDULE COMPLETE! ¡Excelente trabajo!");
            window.location.href = "../../index.html";
        }
    } else {
        alert("¡No! Intenta otra vez.");
    }
}

window.onload = loadSubject;