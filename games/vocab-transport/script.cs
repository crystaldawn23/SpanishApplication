const trips = [
    { icon: "🚂", name: "el tren" },
    { icon: "✈️", name: "el avión" },
    { icon: "🚌", name: "el autobús" },
    { icon: "🚢", name: "el barco" }
];
let step = 0;

function buy(choice) {
    if (choice === trips[step].name) {
        step++;
        if (step < trips.length) {
            document.getElementById('transport-icon').innerText = trips[step].icon;
        } else {
            alert("¡Buen viaje! All tickets purchased.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("That ticket is for a different vehicle!");
    }
}