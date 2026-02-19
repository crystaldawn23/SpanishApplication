const instructionText = document.getElementById('instruction-text');
const consoleArea = document.getElementById('button-console');
const scoreVal = document.getElementById('score-val');

let score = 0;
const commands = [
    { prompt: "Turn on the computer!", correct: "¡Préndela!", opts: ["¡Préndela!", "¡No la prendas!", "¡Prendes!"] },
    { prompt: "Don't delete the file!", correct: "¡No lo borres!", opts: ["¡No lo borres!", "¡Bórralo!", "¡No lo borras!"] },
    { prompt: "Save the document!", correct: "¡Guárdalo!", opts: ["¡Guárdalo!", "¡Guárdas!", "¡No lo guardes!"] },
    { prompt: "Don't turn off the screen!", correct: "¡No la apagues!", opts: ["¡No la apagues!", "¡Apágala!", "¡No la apagas!"] }
];

function nextTask() {
    const task = commands[Math.floor(Math.random() * commands.length)];
    instructionText.innerText = task.prompt;
    consoleArea.innerHTML = '';
    task.opts.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'cmd-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === task.correct) {
                score += 1;
                scoreVal.innerText = score;
                nextTask();
            } else {
                instructionText.style.color = "red";
                setTimeout(() => instructionText.style.color = "#38bdf8", 500);
            }
        };
        consoleArea.appendChild(btn);
    });
}
nextTask();