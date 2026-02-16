function allowDrop(ev) { ev.preventDefault(); }

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const item = document.getElementById(id);
    const targetRoom = ev.target.closest('.room');
    
    // Check if the item's data-match attribute matches the room's ID
    if (targetRoom && item.getAttribute('data-match') === targetRoom.id) {
        item.classList.add('placed');
        item.setAttribute("draggable", "false");
        targetRoom.appendChild(item);
        checkWin();
    } else {
        alert("¡No! Ese mueble no va en esa habitación.");
    }
}

function checkWin() {
    const remaining = document.getElementById('furniture-bank').children.length;
    if (remaining === 0) {
        setTimeout(() => {
            alert("¡Excelente! The house is fully furnished.");
            window.location.href = "../../index.html";
        }, 300);
    }
}