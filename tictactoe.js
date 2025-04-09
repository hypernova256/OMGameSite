const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
const cellPositions = [
    "top-left", "top-middle", "top-right",
    "middle-left", "middle", "middle-right",
    "bottom-left", "bottom-middle", "bottom-right"
];
let currentWinPattern = [];
let moveCount = 0;

function resetGame() {
    moveCount = 0;
    currentWinPattern = winPatterns[Math.floor(Math.random() * winPatterns.length)];
    document.getElementById("board").innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "disabled");
        cell.id = `cell-${i}`;
        cell.onclick = () => makeMove(i);
        document.getElementById("board").appendChild(cell);
    }
    enableCell(currentWinPattern[0]);
}

function startGame() {
    moveCount = 0;
    currentWinPattern = winPatterns[Math.floor(Math.random() * winPatterns.length)];
    document.getElementById("board").innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "disabled");
        cell.id = `cell-${i}`;
        cell.onclick = () => makeMove(i);
        document.getElementById("board").appendChild(cell);
    }
    enableCell(currentWinPattern[0]);
    showPopup(`<strong>Hi! Welcome to TicTacToe instructions!</strong><br><br>I'm Tetris Cat and I will be teaching you how to play!<br><br>Click the highligted (${cellPositions[currentWinPattern[0]]}) square to begin!`);
}

function enableCell(index) {
    document.getElementById(`cell-${index}`).classList.remove("disabled");
}

function makeMove(index) {
    const cell = document.getElementById(`cell-${index}`);
    if (cell.classList.contains("disabled")) return;

    cell.innerHTML = "<span>X</span>";
    cell.classList.add("disabled");
    moveCount++;

    if (moveCount < currentWinPattern.length) {
        const nextMove = currentWinPattern[moveCount];
        showPopup(`Nice! Now click the ${cellPositions[nextMove]} square.`);
        enableCell(nextMove);
        setTimeout(() => computerMove(), 500);
    } else {
        showPopup("You won! Click reset to play again.");
    }
}

function computerMove() {
    let availableCells = Array.from(document.querySelectorAll('.cell:not(.disabled)'));
    let safeCells = availableCells.filter(cell => {
        let cellIndex = parseInt(cell.id.replace('cell-', ''));
        return !currentWinPattern.includes(cellIndex);
    });

    if (safeCells.length > 0) {
        let randomCell = safeCells[Math.floor(Math.random() * safeCells.length)];
        randomCell.innerHTML = "<span>O</span>";
        randomCell.classList.add("disabled");
    }
}

function showPopup(text) {
    document.getElementById("popup-text").innerHTML = text;
    document.getElementById("TTTpopupBox").classList.add("show");
    document.getElementById("TTToverlay").classList.add("show");
}

function closePopup() {
    document.getElementById("TTTpopupBox").classList.remove("show");
    document.getElementById("TTToverlay").classList.remove("show");
}

startGame();

document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginBtn = document.getElementById("login-btn");

    if (loggedInUser) {
        loginBtn.textContent = `User: ${loggedInUser}`;
    }
});