const options = [
    ["Yo", "Tú", "Nosotros", "Ellos"],
    ["com", "viv", "escrib", "beber"],
    ["o", "es", "e", "emos", "imos", "en"]
];
let current = [0, 0, 0];
const goal = { target: "Nosotros comemos", s: 2, st: 0, e: 3 };

function change(col, dir) {
    current[col] = (current[col] + dir + options[col].length) % options[col].length;
    document.getElementById(`slot-${col}`).innerText = options[col][current[col]];
}

function check() {
    if (current[0] === goal.s && current[1] === goal.st && current[2] === goal.e) {
        alert("¡Excelente! Connection complete.");
        window.location.href = "../../index.html";
    } else {
        alert("Try again! Check your subject and ending agreement.");
    }
}