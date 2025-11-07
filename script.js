const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("played");

  checkWinner();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      highlightWinner(pattern);
      statusText.textContent = `🎉 Player ${boardState[a]} Wins! 🎉`;
      return;
    }
  }

  if (!boardState.includes("")) {
    gameActive = false;
    statusText.textContent = "😶 It's a Draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function highlightWinner(pattern) {
  pattern.forEach(index => {
    cells[index].style.background = "#00ffcc33";
    cells[index].style.boxShadow = "0 0 25px #00ffcc";
  });
}

function restartGame() {
  boardState.fill("");
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.background = "#111";
    cell.style.boxShadow = "0 0 10px #222";
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
