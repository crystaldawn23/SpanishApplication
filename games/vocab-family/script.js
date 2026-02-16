const familyMembers = [
    { eng: "THE GRANDMOTHER", span: "la abuela", emoji: "👵" },
    { eng: "THE BROTHER", span: "el hermano", emoji: "👦" },
    { eng: "THE AUNT", span: "la tía", emoji: "👩‍🦱" },
    { eng: "THE COUSIN (MALE)", span: "el primo", emoji: "🧒" },
    { eng: "THE GRANDFATHER", span: "el abuelo", emoji: "👴" },
    { eng: "THE SISTER", span: "la hermana", emoji: "👧" }
];

let current = 0;

function loadMember() {
    const member = familyMembers[current];
    document.getElementById('family-emoji').innerText = member.emoji;
    document.getElementById('relation-label').innerText = member.eng;
    
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';

    // Create a pool of options including the correct one
    const options = [member.span, "el tío", "la madre", "el padre"];
    // Shuffle the options
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        grid.appendChild(btn);
    });

    document.getElementById('progress-bar').innerText = `Member: ${current + 1} / ${familyMembers.length}`;
}

function checkAnswer(choice) {
    if (choice === familyMembers[current].span) {
        current++;
        if (current < familyMembers.length) {
            loadMember();
        } else {
            alert("¡Felicidades! You know the family!");
            window.location.href = "../../index.html";
        }
    } else {
        alert("¡No! Try again.");
    }
}

window.onload = loadMember;