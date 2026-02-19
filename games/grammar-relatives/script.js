const leftPlate = document.getElementById('left-plate');
const rightPlate = document.getElementById('right-plate');
const spark = document.getElementById('weld-spark');
const log = document.getElementById('inspector-log');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const sentences = [
    { L: "El hombre", R: "limpia la casa es mi tío.", A: "que" },
    { L: "Las personas a", R: "escribes son mis primos.", A: "quienes" },
    { L: "No entiendo", R: "me dices.", A: "lo que" },
    { L: "La cafetera", R: "compré no funciona.", A: "que" },
    { L: "Los vecinos con", R: "hablo son simpáticos.", A: "quienes" },
    { L: "Dime", R: "necesitas para la cocina.", A: "lo que" },
    { L: "Limpia el altillo,", R: "está muy sucio.", A: "que" }
];

function next() {
    current = sentences[Math.floor(Math.random() * sentences.length)];
    leftPlate.innerText = current.L;
    rightPlate.innerText = current.R;
    spark.innerText = "?";
    spark.style.background = "#ff9800";
    log.innerText = "Une las piezas...";
    
    const options = ["que", "quien", "quienes", "lo que"];
    const btnArea = document.getElementById('weld-options');
    btnArea.innerHTML = '';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'weld-btn';
        btn.innerText = opt;
        btn.onclick = () => check(opt);
        btnArea.appendChild(btn);
    });
}

function check(choice) {
    if (choice === current.A) {
        score++;
        scoreVal.innerText = score;
        spark.innerText = choice;
        spark.style.background = "#00ff00";
        log.innerText = "¡Soldadura perfecta!";
        setTimeout(next, 1000);
    } else {
        spark.style.background = "#ff0000";
        log.innerText = "Error: El material no es compatible.";
    }
}

next();