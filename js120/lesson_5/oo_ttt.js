let readline = require('readline-sync');

class Square {
  //Static properties are just properties that belong to the class
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }
  //Override the toString method within the prototype chain
  toString() {
    return `${this.marker}`;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}
//If static not supported, declare this way
//Square.prototype.UNUSED_SQUARE = " ";
//Square.prototype.HUMAN_MARKER = "X";
//Square.prototype.COMPUTER_MARKER = "O";

class Board {
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}  `);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}  `);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}  `);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }
  //Will be used to print all unused squares within the board
  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }
    
  IsFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  // Displays all relevant winning combinations
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();

    while(true) {
      this.playOneGame();
      if (!this.playAgain()) break;

      console.log("Let's play again!");
    }

    this.displayGoodbyeMessage();
  }


  playOneGame() {
    this.board.reset();
    this.board.display();

    while (true) {

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;
      
      this.board.displayWithClear();
    }

    this.displayResults();
    this.displayGoodbyeMessage();
    
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${this.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  // mark the selected square with the human's marker

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;
    let defenseSquare = this.computerDefendWin();
    let attackSquare = this.computerAttack();

    if (attackSquare !== undefined) {
      choice = attackSquare;
    } 
    
    else if (defenseSquare !== undefined) {
      choice = defenseSquare;
    }

    else {
        do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    //STUB
    // show the results of this game (win, lose, tie)
  }

  firstPlayerMoves() {
    //STUB
    // the first player makes a move
  }

  secondPlayerMoves() {
    //STUB
    // the second player makes a move
  }

  gameOver() {
    return this.board.IsFull() || this.someoneWon();
  }

  someoneWon() {
    //Some will return true if 1+ conditions are true
    return this.isWinner(this.human) || this.isWinner(this.computer); 
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else console.log("A tie game. How boring.");
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  joinOr(array) {
    if (array.length === 1) {
      return String(array[0]);
    }

    let str = "";
    for (let i = 0; i < array.length - 2; i++){
      str += `${array[i]}, `;
    }

    str += `${array[array.length - 2]}` + ' or ' + `${array[array.length - 1]}`;

    return str;
  }

  playAgain() {
    let answer;

    while(true) {
      answer = readline.question("Play again (y/n)? ").toLowerCase();

      if(["y", "n"].includes(answer)) break;
      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    console.clear();
    return answer === 'y';
  }

  computerDefendWin() {
    let pickedSquare;
    let potentialWinningRow;

    let isDefendSquare = TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      potentialWinningRow = row;
      return (this.board.countMarkersFor(this.human, row) == 2) && this.board.countMarkersFor(this.computer, row) === 0;
    });

    if (isDefendSquare) {
      for (let i = 0; i < potentialWinningRow.length; i++) {
        if (this.board.squares[potentialWinningRow[i]].getMarker() === Square.UNUSED_SQUARE) {
          pickedSquare = potentialWinningRow[i]
          break;
        }
      }
    }
    //Use methods to return proper value instead of Square object
    return pickedSquare;
  }

  computerAttack() {
    let pickedSquare;
    let potentialWinningRow;

    let isAttackSquare = TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      potentialWinningRow = row;
      return (this.board.countMarkersFor(this.computer, row) == 2) && this.board.countMarkersFor(this.human, row) === 0;
    });

    if (isAttackSquare) {
      for (let i = 0; i < potentialWinningRow.length; i++) {
        if (this.board.squares[potentialWinningRow[i]].getMarker() === Square.UNUSED_SQUARE) {
          pickedSquare = potentialWinningRow[i]
          break;
        }
      }
    }
    //Use methods to return proper value instead of Square object
    return pickedSquare;
  }

}


let game = new TTTGame();
game.play();