const readline = require('readline-sync');

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const GAMES_TO_WIN = 5;
const FIRST_TURN = {
  'p': "Player",
  'c': "Computer"
};

const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
]
let playerWins = 0;
let computerWins = 0;
let currentPlayer = null;


function prompt(message) {
  console.log(`==> ${message}`)
}

function displayBoard(board) {
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

  for (let line = 0; line < WINNING_LINES.length; line++) {
    //this syntax is 'destucturing' array into these 3 values
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];
  
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
  let square;

  //set condition for handling offense
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = detectThreatSquare(line, board, COMPUTER_MARKER);
    if (square) break;
  }

  if(!square) {
  //set condition for handling defense
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = detectThreatSquare(line, board, HUMAN_MARKER);
    if (square) break;
  }

  }
  //Always pick middle square if available
  if(!square) {
    if (board['5'] === INITIAL_MARKER) {
      square = '5';
    }
  }

  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

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

function detectThreatSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === ' ');
    if (unusedSquare !== undefined) {
      return unusedSquare
    }
  }

  return null;
}

function setUpGame() {
  console.clear();
  playerScore = 0
  computerScore = 0;
  currentPlayer = null;
  prompt("Welcome to Tic-tac-toe!")
}

function chooseFirstPlayer() {
  prompt("Who will go first this game? Player, Computer or Random? (p, c, r)");
  currentPlayer = readline.question();
  if (currentPlayer !== 'p' && currentPlayer !== 'c' && currentPlayer !== 'r') {
    prompt("Invalid choice. Choose 'p' for Player, 'c' for Computer, or 'r' for Random");
    currentPlayer = readline.question();
  }
  
  if (currentPlayer === 'r') {
    let result = Math.floor(Math.random() * 2);
    if (result === 1) {
      currentPlayer = "p";
    }
    else {
      currentPlayer = "c";
    }
  }

  prompt(`${FIRST_TURN[currentPlayer]} will go first! Press any key to continue`)
  readline.keyIn();
}


function alternatePlayer(currentPlayer) {
  if (currentPlayer === 'c') {
    return 'p';
  } else return 'c';
}

function determineScores(board) {
  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won! Press any key to go to next game...`);
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
  readline.keyIn();
}

function chooseSquare(board, currentPlayer) {
  if (currentPlayer === 'c') {
    return computerChoosesSquare(board);
  }

  else {
    return playerChoosesSquare(board);
  }
}

function playGame(board) {
  while (true)  {      
      
    displayBoard(board);
    
    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);

    if (someoneWon(board) || boardFull(board)) break;
  }
}

while (true) {

  setUpGame();
  chooseFirstPlayer();

  while (true) {

    //Create empty board for the start of the game
    let board = initializeBoard();
    playGame(board);

    displayBoard(board);

    determineScores(board);

    if (playerWins === GAMES_TO_WIN || computerWins === GAMES_TO_WIN) break;
    
  }
  
  console.clear();

  if (playerWins > computerWins) {
    prompt("Player wins the match!")
  }

  else {
    prompt("Computer wins the match!");
  }

  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt("Invalid response. Please choose 'y' to continue or 'n' to quit.S");
    answer = readline.question().toLowerCase();
    console.log(answer);
  }

  if (answer === 'n') break;
}

prompt('Thanks for playing Tic Tac Toe');