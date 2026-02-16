const friendMsg = document.getElementById('incoming-msg');
const myMsg = document.getElementById('outgoing-msg');
const replyGrid = document.getElementById('reply-grid');
const scoreVal = document.getElementById('score-val');

let score = 0;

const chatFlow = [
    { prompt: "¿Qué haces con el secreto?", reply: "Yo siempre ____ la verdad.", correct: "digo", options: ["digo", "dices", "decimos", "dicen"] },
    { prompt: "¿Y tus hermanos? ¿Qué hacen?", reply: "Ellos ____ mentiras a veces.", correct: "dicen", options: ["dicen", "decimos", "dice", "digo"] },
    { prompt: "¿Tú y yo somos honestos?", reply: "Sí, nosotros ____ la verdad.", correct: "decimos", options: ["decimos", "dicen", "decís", "digo"] },
    { prompt: "¡Tu amigo está gritando!", reply: "Sí, él ____ cosas tontas.", correct: "dice", options: ["dice", "dices", "digo", "decimos"] },
    { prompt: "Tell me the truth!", reply: "¡____ la verdad!", correct: "Dime", options: ["Dime", "Dices", "Decir", "Digo"] },
    { prompt: "¿Qué ____ tú de la película?", reply: "Yo ____ que es excelente.", correct: "dices", options: ["dices", "dice", "decimos", "digo"] }
];

function loadChat() {
    const round = chatFlow[Math.floor(Math.random() * chatFlow.length)];
    friendMsg.innerText = round.prompt;
    myMsg.innerText = "...";
    
    replyGrid.innerHTML = '';
    round.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'reply-btn';
        btn.innerText = round.reply.replace("____", opt);
        btn.onclick = () => {
            if (opt === round.correct) {
                score += 100;
                scoreVal.innerText = score;
                myMsg.innerText = round.reply.replace("____", opt);
                setTimeout(loadChat, 1000);
            } else {
                score = Math.max(0, score - 50);
                scoreVal.innerText = score;
                btn.style.borderColor = "#ef4444";
                btn.style.color = "#ef4444";
            }
        };
        replyGrid.appendChild(btn);
    });
}

loadChat();