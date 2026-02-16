const rounds = [
    { p: "Yo", verb: "querer", correct: "ie", end: "o" },
    { p: "Nosotros", verb: "querer", correct: "e", end: "emos" },
    { p: "Ella", verb: "querer", correct: "ie", end: "e" },
    { p: "Vosotros", verb: "querer", correct: "e", end: "éis" },
    { p: "Ellos", verb: "querer", correct: "ie", end: "en" }
];

let currentRound = 0;
let currentStem = "e";

function toggleStem() {
    currentStem = (currentStem === "e") ? "ie" : "e";
    document.getElementById('change').innerText = currentStem;
}

function checkAnswer() {
    const goal = rounds[currentRound];
    if (currentStem === goal.correct) {
        alert("¡BINGO! Correct stem for " + goal.p);
        currentRound++;
        if (currentRound < rounds.length) {
            updateRound();
        } else {
            alert("JACKPOT! You've mastered the stem-change logic.");
            window.location.href = "../../index.html";
        }
    } else {
        alert("CRASH! That person doesn't get that stem. Try again.");
    }
}

function updateRound() {
    const data = rounds[currentRound];
    document.getElementById('pronoun').innerText = data.p;
    document.getElementById('ending').innerText = data.end;
    document.getElementById('status-bar').innerText = `Round: ${currentRound + 1} / ${rounds.length}`;
    // Reset stem to 'e' for new round
    currentStem = "e";
    document.getElementById('change').innerText = "e";
}

window.onload = updateRound;