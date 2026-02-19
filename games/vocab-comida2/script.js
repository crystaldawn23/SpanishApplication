const floor = document.getElementById('kitchen-floor');
const plate = document.getElementById('chef-plate');
const targetDisplay = document.getElementById('target-food');
const scoreVal = document.getElementById('score-val');

let score = 0;
let currentTarget = null;

const menu = [
    { name: "el bistec", icon: "🥩" }, { name: "el pollo", icon: "🍗" },
    { name: "la ensalada", icon: "🥗" }, { name: "las papas fritas", icon: "🍟" },
    { name: "el pescado", icon: "🐟" }, { name: "la fruta", icon: "🍎" }
];

function nextOrder() {
    currentTarget = menu[Math.floor(Math.random() * menu.length)];
    targetDisplay.innerText = currentTarget.name.toUpperCase();
}

// Move plate with mouse
floor.onmousemove = (e) => {
    let rect = floor.getBoundingClientRect();
    let x = e.clientX - rect.left - 30;
    plate.style.left = Math.max(0, Math.min(x, 540)) + 'px';
};

function spawnFood() {
    const item = menu[Math.floor(Math.random() * menu.length)];
    const div = document.createElement('div');
    div.className = 'food-item';
    div.innerText = item.icon;
    div.style.left = Math.random() * 550 + 'px';
    div.style.top = "-50px";
    floor.appendChild(div);

    let top = -50;
    let fall = setInterval(() => {
        top += 5;
        div.style.top = top + 'px';

        let pRect = plate.getBoundingClientRect();
        let fRect = div.getBoundingClientRect();

        if (fRect.bottom > pRect.top && fRect.left < pRect.right && fRect.right > pRect.left) {
            if (item.name === currentTarget.name) {
                score++;
                scoreVal.innerText = score;
                nextOrder();
            } else {
                score = Math.max(0, score - 1);
                scoreVal.innerText = score;
            }
            clearInterval(fall);
            div.remove();
        }
        if (top > 400) { clearInterval(fall); div.remove(); }
    }, 20);
}

nextOrder();
setInterval(spawnFood, 1500);