const subjectEl = document.getElementById('subject');
const verbEl = document.getElementById('verb');
const inputEl = document.getElementById('user-input');
const scoreEl = document.getElementById('score');

let score = 0;
let current = null;

const trials = [
    { s: "YO", v: "TENER", a: "tuve" },
    { s: "ÉL", v: "HACER", a: "hizo" },
    { s: "NOSOTROS", v: "ESTAR", a: "estuvimos" },
    { s: "ELLOS", v: "DECIR", a: "dijeron" },
    { s: "TÚ", v: "PODER", a: "pudiste" },
    { s: "ELLA", v: "SABER", a: "supo" },
    { s: "YO", v: "VENIR", a: "vine" },
    { s: "USTEDES", v: "TRAER", a: "trajeron" }
];

function next() {
    current = trials[Math.floor(Math.random() * trials.length)];
    subjectEl.innerText = current.s;
    verbEl.innerText = current.v;
    inputEl.value = "";
}

inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (inputEl.value.toLowerCase().trim() === current.a) {
            score++;
            scoreEl.innerText = score;
            next();
        } else {
            inputEl.style.color = "red";
            setTimeout(() => { inputEl.style.color = "white"; }, 500);
        }
    }
});

next();