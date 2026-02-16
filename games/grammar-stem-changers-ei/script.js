const orderText = document.getElementById('order-text');
const actionGrid = document.getElementById('action-grid');
const scoreDisplay = document.getElementById('score');

let score = 0;

const orders = [
    { text: "Yo ___ la comida. (servir)", correct: "sirvo", options: ["sirvo", "servo", "servimos", "sirves"] },
    { text: "Tú ___ la hamburguesa. (pedir)", correct: "pides", options: ["pedes", "pides", "pido", "pedimos"] },
    { text: "Ellos ___ el vocabulario. (repetir)", correct: "repiten", options: ["repeten", "repiten", "repitimos", "repito"] },
    { text: "Nosotros ___ la pizza. (pedir)", correct: "pedimos", options: ["pidimos", "pedimos", "pides", "pido"] },
    { text: "Ella ___ el refresco. (servir)", correct: "sirve", options: ["serve", "sirve", "sirven", "sirvo"] },
    { text: "Ustedes ___ las palabras. (repetir)", correct: "repiten", options: ["repiten", "repetimos", "repite", "repiton"] }
];

function nextOrder() {
    const order = orders[Math.floor(Math.random() * orders.length)];
    orderText.innerText = order.text;
    
    actionGrid.innerHTML = '';
    order.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'verb-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === order.correct) {
                score += 20;
                scoreDisplay.innerText = score;
                nextOrder();
            } else {
                score = Math.max(0, score - 10);
                scoreDisplay.innerText = score;
                btn.style.backgroundColor = "#ef4444";
            }
        };
        actionGrid.appendChild(btn);
    });
}

nextOrder();