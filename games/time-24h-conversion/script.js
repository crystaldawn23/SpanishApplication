const times = [
    { h12: "1:00 PM", h24: "13:00" },
    { h12: "4:30 PM", h24: "16:30" },
    { h12: "9:15 PM", h24: "21:15" },
    { h12: "11:00 PM", h24: "23:00" },
    { h12: "8:45 AM", h24: "08:45" },
    { h12: "12:30 PM", h24: "12:30" }, // The tricky one
    { h12: "12:15 AM", h24: "00:15" }  // The other tricky one
];

let currentLevel = 0;

function loadFlight() {
    const current = times[currentLevel];
    document.getElementById('target-time').innerText = current.h12;

    // Generate 4 options
    let options = [current.h24];
    while(options.length < 4) {
        let randomTime = times[Math.floor(Math.random() * times.length)].h24;
        if(!options.includes(randomTime)) options.push(randomTime);
    }
    options.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'flight-btn';
        btn.innerText = opt;
        btn.onclick = () => checkTime(opt, current.h24);
        grid.appendChild(btn);
    });
}

function checkTime(selected, correct) {
    if(selected === correct) {
        currentLevel++;
        if(currentLevel < times.length) {
            loadFlight();
        } else {
            alert("ALL FLIGHTS DEPARTED! 24H Mastery Achieved.");
            window.location.href = "../../index.html";
        }
    } else {
        const board = document.getElementById('terminal');
        board.style.borderColor = "red";
        setTimeout(() => board.style.borderColor = "#444", 300);
    }
}

document.addEventListener('DOMContentLoaded', loadFlight);