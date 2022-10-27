const readline = require('readline-sync');

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const GAMES_TO_WIN = 5;

function prompt(message) {
  console.log(`==> ${message}`)
}

function displayBoard(board, playerWins, computerWins) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  console.log(`Player score: ${playerWins} Computer score: ${computerWins}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  //!! transforms truthy / falsy values to true / false
  return !!detectWinner(board);
}

function detectWinner(board) {
  let winningLines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
    [1, 5, 9], [3, 5, 7]             // diagonals
  ]

  for (let line = 0; line < winningLines.length; line++) {
    //this syntax is 'destucturing' array into these 3 values
    let [ sq1, sq2, sq3 ] = winningLines[line];
  
    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    }
    else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}

function initializeBoard() {
  let board = {};
  //Create each entry within the board object
  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim(); //removes spaces from input

    if (emptySquares(board).includes(square)) break; // one line condition --> else prompt

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {

  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);

  let square = emptySquares(board)[randomIndex];
  board[square] = COMPUTER_MARKER;
}

function joinOr(arr, delimeter=', ', join='or') {
  let str = "";

  if (arr.length < 3) {
    if (arr.length === 1) {
      return String(arr[0]);
    }
    else if (arr.length === 2) {
      return String(arr[0]) + ' ' + join + ' ' + String(arr[1]);
    }

  }

  function detectThreat(borad) {
    
  }
  
  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length - 1) {
      str = str.concat(join, ' ', String(arr[i]));
    }

    else {
      str = str.concat(String(arr[i]), delimeter);
    }

  }

  return str;
}
while (true) {

  let computerWins = 0;
  let playerWins = 0;

  while (computerWins < 5 && playerWins < 5) {

    //Create empty board for the start of the game
    let board = initializeBoard();

    while (true)  {

      displayBoard(board, playerWins, computerWins);

      playerChoosesSquare(board);
      //Use this if call to prevent "double winner" condition
      if (someoneWon(board) || boardFull(board)) break;
      computerChoosesSquare(board);

      if (someoneWon(board) || boardFull(board)) break;
    }

    displayBoard(board);

    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won!`);
      if (detectWinner(board) === "Computer") {
        computerWins += 1;
      }
      else if (detectWinner(board) === "Player") {
        playerWins += 1;
      }
    }

    else {
      prompt("It's a tie!");
    }

    
  }
  
  console.clear();

  if (playerWins > computerWins) {
    prompt("Player wins the match!")
  }

  else {
    prompt("Computer wins the match!");
  }

  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}

prompt('Thanks for playing Tic Tac Toe');