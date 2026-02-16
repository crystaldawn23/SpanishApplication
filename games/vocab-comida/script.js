let order = ["un café", "un pan dulce"];
let trayItems = [];

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const item = document.getElementById(id);
    const itemName = item.getAttribute('data-name');

    if (order.includes(itemName) && !trayItems.includes(itemName)) {
        trayItems.push(itemName);
        document.getElementById('tray').appendChild(item);
        if (trayItems.length === order.length) {
            alert("¡Buen provecho! Order complete.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("That is not what the customer ordered!");
    }
}