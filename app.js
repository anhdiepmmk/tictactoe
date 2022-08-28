const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const scoreX = document.querySelector("#X");
const scoreY = document.querySelector("#Y");
const player = document.getElementById("player");
const soundClick = new Audio("click.wav");
const soundSuccess = new Audio("success.mp3");
const soundDraw = new Audio("draw.mp3");

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
let currentPlayer = function currentPlayer() {
  return player.value;
  console.log(player);
}
let running = false;
let startGame = document.getElementById("gameContainer");
const popUp = document.getElementById("pop-up");


function closePopup() {
  popUp.classList.add("close-pop-up");
  startGame.classList.add("open-gameContainer");
}

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
  soundClick.play();
}

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
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} win!`;
    count += 1;
    if (currentPlayer === scoreX) {
      scoreX.innerText = count;
    } else scoreY.innerText = count;
    running = false;
    soundSuccess.play();
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
    soundDraw.play();
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
