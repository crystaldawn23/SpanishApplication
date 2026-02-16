const sequence = ["el baño", "la cocina", "el dormitorio", "el despacho"];
let step = 0;

function place(room, el) {
    if (room === sequence[step]) {
        el.innerText = room.toUpperCase();
        el.classList.add('built');
        step++;
        if (step < sequence.length) {
            document.getElementById('target-room').innerText = sequence[step];
        } else {
            alert("¡Casa completa!");
            window.location.href = "../../index.html";
        }
    } else {
        alert("Incorrecto. Mira el plano otra vez.");
    }
}