const targetPoint = document.getElementById('target-point');
const bin = document.getElementById('label-bin');
const scoreVal = document.getElementById('score');

let score = 0;
const items = [
    { name: "el volante", category: "car" },
    { name: "el baúl", category: "car" },
    { name: "el teclado", category: "tech" },
    { name: "la pantalla", category: "tech" },
    { name: "el capó", category: "car" },
    { name: "el ratón", category: "tech" }
];

function nextRepair() {
    const current = items[Math.floor(Math.random() * items.length)];
    targetPoint.innerText = `Instala: ${current.name.toUpperCase()}`;
    targetPoint.dataset.answer = current.name;
    
    bin.innerHTML = '';
    // Show 3 random options
    items.sort(() => Math.random() - 0.5).slice(0, 3).forEach(item => {
        const lbl = document.createElement('div');
        lbl.className = 'label-chip';
        lbl.innerText = item.name;
        lbl.onclick = () => {
            if (item.name === targetPoint.dataset.answer) {
                score++;
                scoreVal.innerText = score;
                nextRepair();
            } else {
                targetPoint.style.color = "red";
                setTimeout(() => targetPoint.style.color = "white", 500);
            }
        };
        bin.appendChild(lbl);
    });
}
nextRepair();