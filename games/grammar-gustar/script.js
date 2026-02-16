const items = [
    { text: "EL ARTE", plural: false, icon: "🎨" },
    { text: "LAS MATEMÁTICAS", plural: true, icon: "📐" },
    { text: "LOS LIBROS", plural: true, icon: "📚" },
    { text: "LA COMPUTACIÓN", plural: false, icon: "💻" },
    { text: "LAS CIENCIAS", plural: true, icon: "🧪" }
];

let current = 0;

function load() {
    document.getElementById('emoji-target').innerText = items[current].icon;
    document.getElementById('item-text').innerText = items[current].text;
}

function check(answer) {
    const isPlural = items[current].plural;
    const correct = isPlural ? "Me gustan" : "Me gusta";

    if (answer === correct) {
        current++;
        if (current < items.length) {
            document.getElementById('score').innerText = "Items sorted: " + current;
            load();
        } else {
            alert("¡Excelente! You've mastered Gustar.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("¡Cuidado! " + items[current].text + (isPlural ? " is plural." : " is singular."));
    }
}

window.onload = load;