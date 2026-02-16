function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const item = document.getElementById(id);
    const zone = ev.target.closest('.drop-zone');
    
    if (zone && item.innerText === zone.dataset.match) {
        zone.innerText = item.innerText;
        zone.classList.add('matched');
        item.style.visibility = "hidden";
        checkWin();
    } else {
        alert("¡No! That doesn't go there.");
    }
}

document.querySelectorAll('.drop-zone').forEach(z => {
    z.ondragover = allowDrop;
    z.ondrop = drop;
});

function checkWin() {
    if (document.querySelectorAll('.matched').length === 4) {
        alert("¡Qué elegante! You're ready for the fashion show.");
        window.location.href = "../../index.html";
    }
}