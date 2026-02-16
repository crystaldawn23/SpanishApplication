
const items = [
    { image: "img/book.jpg", correct: "el libro", options: ["la silla", "el libro", "el lápiz"] },
    { image: "img/pencil.jpg", correct: "el lápiz", options: ["el bolígrafo", "la mesa", "el lápiz"] },
    { image: "img/chair.jpg", correct: "la silla", options: ["el escritorio", "la puerta", "la silla"] },
    { image: "img/table.jpg", correct: "la mesa", options: ["la ventana", "la mesa", "el pupitre"] },
    { image: "img/backpack.jpg", correct: "la mochila", options: ["la mochila", "la carpeta", "el cuaderno"] }
];
let currentItemIndex = 0;

function loadItem() {
    const item = items[currentItemIndex];
    document.querySelector('#image-display img').src = item.image;
    
    const optionsGrid = document.getElementById('word-options');
    optionsGrid.innerHTML = ''; // Clear previous options

    // Shuffle options to prevent correct answer always being in same spot
    const shuffledOptions = item.options.sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(opt => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerText = opt;
        button.onclick = () => checkAnswer(opt);
        optionsGrid.appendChild(button);
    });
    document.getElementById('feedback-message').innerText = '';
}

function checkAnswer(selectedOption) {
    const item = items[currentItemIndex];
    const feedback = document.getElementById('feedback-message');

    if (selectedOption === item.correct) {
        feedback.innerText = "¡Correcto!";
        feedback.style.color = "#00adb5";
        currentItemIndex++;
        setTimeout(() => {
            if (currentItemIndex < items.length) {
                loadItem();
            } else {
                alert("SCAVENGER HUNT COMPLETE! All items found.");
                window.location.href = "../../index.html";
            }
        }, 800);
    } else {
        feedback.innerText = "Intenta otra vez.";
        feedback.style.color = "#ff6b6b";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the img element exists
    const imgElement = document.createElement('img');
    document.getElementById('image-display').appendChild(imgElement);
    loadItem();
});