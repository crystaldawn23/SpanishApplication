let selectedReason = "";
function setReason(r, btn) {
    selectedReason = r;
    document.querySelectorAll('.toggle').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}
function check(verb) {
    if (verb === 'está' && selectedReason === 'location') {
        alert("¡Correcto! Estar is used for location.");
        window.location.href = "../../index.html";
    } else {
        alert("Incorrect logic. Try again!");
    }
}