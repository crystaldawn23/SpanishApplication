const prompts = ["TENGO SED", "TENGO HAMBRE", "TENGO FRÍO"];
let current = 0;

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const el = document.getElementById(data);
    if (el.dataset.match === prompts[current]) {
        current++;
        if (current < prompts.length) {
            document.getElementById('expression').innerText = prompts[current];
            el.style.display = "none";
        } else {
            alert("¡Perfecto! You mastered the Tener expressions.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("Not quite! Think about what that feeling needs.");
    }
}