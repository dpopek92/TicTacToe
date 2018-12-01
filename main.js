let box = null;
let player = null;
let gameResult = null;
let buttonResult = null;

let firstPlayer = 'X';
let secondPlayer = 'O';
let currentPlayer = firstPlayer;
let square = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

let turn = 0;

function addSign() {
  if (!this.textContent) {
    this.textContent = currentPlayer;
    square[this.id] = this.textContent;
    this.classList.remove('square-hover');
    isWin();
    playerChange();
    player.textContent = currentPlayer;
    turn++;
  } else {
    return
  }
}

function playerChange() {
  if (currentPlayer == firstPlayer) {
    currentPlayer = secondPlayer
  } else {
    currentPlayer = firstPlayer
  }
}

function isWin() {
  if (square[0] === square[1] && square[1] === square[2] ||
    square[3] === square[4] && square[4] === square[5] ||
    square[6] === square[7] && square[7] === square[8] ||
    square[0] === square[3] && square[3] === square[6] ||
    square[1] === square[4] && square[4] === square[7] ||
    square[2] === square[5] && square[5] === square[8] ||
    square[0] === square[4] && square[4] === square[8] ||
    square[2] === square[4] && square[4] === square[6]) {
    gameResult.querySelector('span').textContent = currentPlayer;
    gameResult.style.display = 'block';
  } else if (turn >= 8) {
    gameResult.querySelector('span').textContent = "Remis";
    gameResult.style.display = 'block';
  }
}

function newGame() {
  gameResult.style.display = 'none';
  clearBoard()
  turn = 0;
  square = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  box.forEach((el) => {
    el.classList.add('square-hover')
  });
}

function clearBoard() {
  box.forEach((el) => {
    el.textContent = ''
  })
}

window.addEventListener('DOMContentLoaded', function () {
  box = [...document.querySelectorAll('.square')];
  player = document.querySelector('#player');
  player.textContent = currentPlayer;
  gameResult = document.querySelector('.game-result');
  buttonResult = document.querySelector('.game-result-button');

  box.forEach((el) => {
    el.addEventListener('click', addSign);
  })

  buttonResult.addEventListener('click', newGame);

})
