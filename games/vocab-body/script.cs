const bodySteps = ["la cabeza", "el brazo", "el estómago", "la pierna"];
let bStep = 0;

function touch(part) {
    if (part === bodySteps[bStep]) {
        bStep++;
        if (bStep < bodySteps.length) {
            document.getElementById('instruction').innerText = "Toca " + bodySteps[bStep];
        } else {
            alert("¡Simón está feliz!");
            window.location.href = "../../index.html";
        }
    } else {
        alert("¡No! Ese no es.");
    }
}