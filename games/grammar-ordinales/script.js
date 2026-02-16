const elevator = document.getElementById('elevator');
const missionText = document.getElementById('mission-display');
const stopBtn = document.getElementById('stop-btn');
const scoreDisplay = document.getElementById('score-val');

let score = 0;
let elevatorPos = 0; // 0 to 360
let direction = 1; // 1 for up, -1 for down
let currentTarget = null;

const floors = [
    { name: "primer", val: 0 },
    { name: "segundo", val: 40 },
    { name: "tercer", val: 80 },
    { name: "cuarto", val: 120 },
    { name: "quinto", val: 160 },
    { name: "sexto", val: 200 },
    { name: "séptimo", val: 240 },
    { name: "octavo", val: 280 },
    { name: "noveno", val: 320 },
    { name: "décimo", val: 360 }
];

function moveElevator() {
    elevatorPos += (2 * direction);
    if (elevatorPos >= 360 || elevatorPos <= 0) {
        direction *= -1;
    }
    elevator.style.bottom = elevatorPos + "px";
    requestAnimationFrame(moveElevator);
}

function setNewMission() {
    currentTarget = floors[Math.floor(Math.random() * floors.length)];
    missionText.innerText = `Ve al ${currentTarget.name} piso`;
}

stopBtn.onclick = () => {
    // Check if elevatorPos is near currentTarget.val
    const diff = Math.abs(elevatorPos - currentTarget.val);
    
    if (diff < 20) { // Tolerance for "hitting" the floor
        score += 100;
        alert("¡Perfecto!");
    } else {
        score = Math.max(0, score - 50);
        alert("¡Uy! Te pasaste.");
    }
    
    scoreDisplay.innerText = score;
    setNewMission();
};

setNewMission();
moveElevator();