const nouns = [
    { word: "Chico", correct: "el" },
    { word: "Chica", correct: "la" },
    { word: "Cuadernos", correct: "los" },
    { word: "Escuelas", correct: "las" },
    { word: "Libro", correct: "el" },
    { word: "Maleta", correct: "la" },
    { word: "Profesores", correct: "los" },
    { word: "Sillas", correct: "las" }
];

let currentIndex = 0;

function loadNoun() {
    document.getElementById('target-noun').innerText = nouns[currentIndex].word;
    document.getElementById('status-light').style.background = "#333";
}

function checkArticle(choice) {
    const correct = nouns[currentIndex].correct;
    const light = document.getElementById('status-light');

    if (choice === correct) {
        light.style.background = "#4ecca3"; // Success Green
        currentIndex++;
        setTimeout(() => {
            if (currentIndex < nouns.length) {
                loadNoun();
            } else {
                alert("CONVEYOR CLEAR: Noun Gender Mastered!");
                window.location.href = "../../index.html";
            }
        }, 500);
    } else {
        light.style.background = "#ff4b2b"; // Error Red
        setTimeout(() => light.style.background = "#333", 500);
    }
}

document.addEventListener('DOMContentLoaded', loadNoun);