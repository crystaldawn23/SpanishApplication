const dialogues = [
    { 
        context: "Informal: Classmate", 
        npcName: "Marcos", npcAvatar: "👦",
        scenario: "¡Hola! ¿Cómo estás?", 
        options: ["Bien, ¿y tú?", "Bien, ¿y usted?", "Buenos días"], 
        correct: "Bien, ¿y tú?" 
    },
    { 
        context: "Formal: Teacher", 
        npcName: "Sra. Foster", npcAvatar: "👩‍🏫",
        scenario: "Buenas tardes, ¿cómo está usted?", 
        options: ["Muy bien, gracias. ¿Y tú?", "Muy bien, gracias. ¿Y usted?", "¡Hola!"], 
        correct: "Muy bien, gracias. ¿Y usted?" 
    }
];

let currentIdx = 0;

function loadDialogue() {
    const d = dialogues[currentIdx];
    document.getElementById('npc-name').innerText = d.npcName;
    document.getElementById('npc-avatar').innerText = d.npcAvatar;
    document.getElementById('context-tag').innerText = d.context;
    document.getElementById('scenario-text').innerText = d.scenario;

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    d.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, d.correct);
        grid.appendChild(btn);
    });
}

function checkAnswer(choice, correct) {
    if (choice === correct) {
        currentIdx++;
        if (currentIdx < dialogues.length) {
            loadDialogue();
        } else {
            alert("End of conversation.");
            window.location.href = "../../index.html";
        }
    } else {
        // Subtle hint instead of a big alert if you prefer
        console.log("Incorrect choice");
        const bubble = document.querySelector('.npc-bubble');
        bubble.style.border = "2px solid #e94560";
        setTimeout(() => bubble.style.border = "none", 500);
    }
}

document.addEventListener('DOMContentLoaded', loadDialogue);
