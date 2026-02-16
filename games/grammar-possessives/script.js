function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var targetZone = ev.target.closest('.zone').id;

    const isPlural = draggedElement.getAttribute('data-type') === 'plural';
    const droppedInPlural = targetZone === 'plural-zone';

    if (isPlural === droppedInPlural) {
        ev.target.closest('.zone').appendChild(draggedElement);
        draggedElement.setAttribute("draggable", "false");
        draggedElement.style.cursor = "default";
        draggedElement.style.background = "#10b981";
        checkWin();
    } else {
        alert("¡No! Check if the object is singular or plural.");
    }
}

function checkWin() {
    const remaining = document.getElementById('item-bin').children.length;
    if (remaining === 0) {
        alert("Perfecto! You understand possessive agreement.");
        window.location.href = "../../index.html";
    }
}