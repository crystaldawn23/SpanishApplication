const conditions = ["Hace sol", "Llueve", "Nieva", "Hace viento"];
let current = 0;

function check(val, btn) {
    if (val === conditions[current]) {
        btn.style.background = "#10b981";
        current++;
        if (current < conditions.length) {
            document.getElementById('target-weather').innerText = conditions[current].toUpperCase();
        } else {
            alert("¡Excelente meteorólogo!");
            window.location.href = "../../index.html";
        }
    } else {
        alert("¡No! Mira el icono otra vez.");
    }
}