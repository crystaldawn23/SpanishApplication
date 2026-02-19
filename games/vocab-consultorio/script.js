const speech = document.getElementById('patient-speech');
const icon = document.getElementById('patient-icon');
const grid = document.getElementById('diagnosis-grid');
const scoreVal = document.getElementById('score');

let score = 0;
let current = null;

const patients = [
    { s: "Tengo la temperatura muy alta.", a: "la fiebre", i: "🔥" },
    { s: "Estornudo mucho y tengo la nariz roja.", a: "el resfriado", i: "🤧" },
    { s: "Me duele mucho el estómago.", a: "el dolor", i: "🤢" },
    { s: "Necesito medicina para la infección.", a: "el antibiótico", i: "💊" },
    { s: "El doctor escribe la medicina que necesito.", a: "la receta", i: "📝" },
    { s: "Me caí y no puedo caminar.", a: "romperse la pierna", i: "🩼" },
    { s: "La persona que ayuda al doctor.", a: "la enfermera", i: "👩‍⚕️" },
    { s: "Lo que el doctor hace para ver si estás bien.", a: "el examen médico", i: "🩺" }
];

function nextPatient() {
    current = patients[Math.floor(Math.random() * patients.length)];
    speech.innerText = `"${current.s}"`;
    icon.innerText = current.i;
    
    grid.innerHTML = '';
    const options = [current.a, ...getRandomOptions(current.a)];
    options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'diag-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === current.a) {
                score++;
                scoreVal.innerText = score;
                speech.style.color = "#10b981";
                setTimeout(() => { speech.style.color = "#0369a1"; nextPatient(); }, 800);
            } else {
                speech.style.color = "#ef4444";
                setTimeout(() => { speech.style.color = "#0369a1"; }, 500);
            }
        };
        grid.appendChild(btn);
    });
}

function getRandomOptions(correct) {
    return patients
        .map(p => p.a)
        .filter(a => a !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
}

nextPatient();