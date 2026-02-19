const promptText = document.getElementById('prompt-text');
const optionsGrid = document.getElementById('options-grid');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const reviews = [
    { 
        icons: "🍎 vs 🍕", 
        text: "La manzana es ________ la pizza.", 
        hint: "Healthier than",
        ans: "más saludable que", 
        alts: ["tan saludable como", "menos saludable que", "la más saludable"] 
    },
    { 
        icons: "🍰 vs 🥗", 
        text: "El pastel es ________ la ensalada.", 
        hint: "Worse than",
        ans: "peor que", 
        alts: ["mejor que", "tan bueno como", "el peor"] 
    },
    { 
        icons: "🥩 vs 🍗", 
        text: "El bistec es ________ el pollo.", 
        hint: "Better than",
        ans: "mejor que", 
        alts: ["peor que", "más mejor que", "tan bueno como"] 
    },
    { 
        icons: "🍦 (among all)", 
        text: "El helado es ________ de todos.", 
        hint: "The most delicious",
        ans: "el más delicioso", 
        alts: ["más delicioso que", "el mejor delicioso", "tan delicioso como"] 
    },
    { 
        icons: "🥦 vs 🍪", 
        text: "El brócoli es ________ las galletas.", 
        hint: "As expensive as",
        ans: "tan caro como", 
        alts: ["más caro que", "tanto caro como", "el más caro"] 
    }
];

function nextReview() {
    current = reviews[Math.floor(Math.random() * reviews.length)];
    document.getElementById('visual-cue').innerHTML = current.icons;
    promptText.innerText = current.text;
    document.querySelector('.goal-hint').innerText = `(Goal: ${current.hint})`;
    
    optionsGrid.innerHTML = '';
    const allOpts = [current.ans, ...current.alts].sort(() => Math.random() - 0.5);
    
    allOpts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === current.ans) {
                score++;
                scoreVal.innerText = score;
                promptText.style.color = "#10b981";
                setTimeout(nextReview, 800);
            } else {
                promptText.style.color = "#ef4444";
                setTimeout(() => promptText.style.color = "#1f2937", 500);
            }
        };
        optionsGrid.appendChild(btn);
    });
}

nextReview();