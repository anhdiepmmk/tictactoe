const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const scoreX = document.querySelector("#X");
const scoreY = document.querySelector("#Y");
const namePlayer = document.getElementById("player");
console.log("namePlayer", namePlayer);
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] !== "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinners();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

// function checkPlayerName(namePlayer) {
//   if (namePlayer === "X" || namePlayer === "x") {
//     currentPlayer = "X";
//   } else if (namePlayer === "O" || namePlayer === "o") {
//     currentPlayer = "O";
//   } else {
//     namePlayer.innerText = "Player name must be: X or O";
//     return;
//   }
//   console.log("Player name: " + namePlayer);
// }

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  console.log("changePlayer: " + currentPlayer);
}

function checkWinners() {
  let roundWon = false;
  let count = 0;

  for (let i = 0; i < winConditions.length; i += 1) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      count += 1;
      scoreX.innerText = count;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} win!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}