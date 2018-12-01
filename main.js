let gameBoard;
let displayCurrentPlayer;
let displayGameNumber;
let displayXWins;
let displayOWins;
let displayDraws
//buttons
let pvpButton;
let pvcButton;
let buttonResult;

let gameBegin;
let gameResult;

let firstPlayer = '';
let secondPlayer = '';
let currentPlayer;
let square = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let winner = '';

let turn = 0;
let gameNr = 0;
let oWins = 0;
let xWins = 0;
let draws = 0;

//new Player vs Player game
function newPvPGame() {
  gameBoard.forEach((el) => {
    el.addEventListener('click', PVPaddSign);
    el.classList.add('square-hover');
  });
  firstPlayer = 'X';
  secondPlayer = 'O';
  gameNr++;
  //new game will be begined by loser
  if (winner === 'X') {
    currentPlayer = secondPlayer;
  } else {
    currentPlayer = firstPlayer;
  }
  gameBegin.style.display = 'none';
  displayCurrentPlayer.textContent = currentPlayer;
  displayGameNumber.textContent = gameNr;
}

//add sign by Player
function PVPaddSign() {
  if (!this.textContent) {
    this.textContent = currentPlayer;
    square[this.id] = this.textContent;
    this.classList.remove('square-hover');

    if (isWin() || turn >= 8) {
      endGame();
    } else {
      playerChange();
      displayCurrentPlayer.textContent = currentPlayer;
      turn++;
    }
  } else {
    return
  }
}

//change displayCurrentPlayer
function playerChange() {
  currentPlayer === firstPlayer ? currentPlayer = secondPlayer : currentPlayer = firstPlayer
}

//check is win
function isWin() {
  let won = false;
  winConditions.forEach(condition => {
    if (square[condition[0]] !== '' &&
      square[condition[0]] === square[condition[1]] && square[condition[1]] === square[condition[2]] && square[condition[0]] === square[condition[2]]) {
      won = true;
    }
  });
  return won;
}

//game result
function endGame() {
  gameBoard.forEach((el) => {
    el.classList.remove('square-hover');
  })
  if (isWin()) {
    winner = currentPlayer;
    gameResult.querySelector('span').textContent = `Player ${winner}`;
  } else {
    gameResult.querySelector('span').textContent = "Remis";
  }
  if (winner === "X")
    xWins++
  else if (winner === 'O')
    oWins++
  else
    draws++;
  gameResult.style.display = 'block';
  display();
}

//game restart
function newGame() {
  gameResult.style.display = '';
  gameBegin.style.display = '';
  clearBoard();
}

//cleaning a board
function clearBoard() {
  gameBoard.forEach((el) => {
    el.textContent = '';
  });
  square = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  turn = 0;
}

//display results
function display() {
  displayXWins.textContent = xWins;
  displayOWins.textContent = oWins;
  displayDraws.textContent = draws;
}

window.addEventListener('DOMContentLoaded', function () {
  //game elements
  gameBoard = [...document.querySelectorAll('.square')];
  //game display
  displayCurrentPlayer = document.querySelector('#player');
  gameResult = document.querySelector('.game-result');
  gameBegin = document.querySelector('#gameBegin');
  displayGameNumber = document.querySelector('#gameNumber');
  displayXWins = document.querySelector('#playerXWins');
  displayOWins = document.querySelector('#playerOWins');
  displayDraws = document.querySelector('#draw');
  //game buttons
  buttonResult = document.querySelector('#game-result-button');
  pvpButton = document.querySelector('#playerVsPlayer');
  pvcButton = document.querySelector('playerVsComputer');

  //start game 
  pvpButton.addEventListener('click', newPvPGame);
  // pvcButton.addEventListener('click', newPvCGame);

  buttonResult.addEventListener('click', newGame);
})
