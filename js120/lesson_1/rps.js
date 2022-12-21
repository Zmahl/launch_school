const readline = require('readline-sync');

function prompt(message) {
  console.log(`==> ${message}`);
}

function createPlayer() {
  return {
    move: null,
    score: 0,
    pastChoices: [],
  };
}

function createHuman(validChoices) {

  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      while (true) {
        prompt('Please choose rock, paper, scissors, lizard or spock');
        choice = readline.question();
        // 3 options given to the player
        if (validChoices.includes(choice)) break;
        prompt('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };
  //Merges 2 objects and returns the result
  return Object.assign(playerObject, humanObject);
}

function createComputer(validChoices) {
  let playerObject = createPlayer();
  let computerObject = {
    //how computer will skew it's index to beat what the player is picking
    weight: {},
    choose() {
      let randomIndex = Math.floor(Math.random() * validChoices.length);
      this.move = validChoices[randomIndex];
    },
    adjustWeight(humanChoices) {

    }
  };

  return Object.assign(playerObject, computerObject);
}

const RPSGame = {
  WINNING_COMBOS : {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors']
  },
  CHOICES : ['rock', 'paper', 'scissors', 'lizard', 'spock'],
  WINNING_ROUNDS: 5,
  human: createHuman(this.CHOICES),
  computer: createComputer(this.CHOICES),
  roundWinner: null,

  displayWelcomeMessage() {
    prompt("Welcome to Rock, Paper, Scissors!");
    prompt(`The Player and the Computer will play a first to ${this.WINNING_ROUNDS} set of Rock, Paper, Scissors!`);
    readline.question("Press any key to play...");
    console.clear();
  },

  displayGoodbyeMessage() {
    prompt("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  playAgain() {
    prompt("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  playGame() {
    this.displayScore();
    this.displayMoveHistory();
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    this.updatePlayerScore();
    this.displayScore();
    this.updateMoveHistory();
    this.adjustComputerChoice();
    readline.question("Press any button to go to continue...");
    this.clearScreen();
  },

  play() {
    this.displayWelcomeMessage();
    while (this.human.score <= this.WINNING_ROUNDS || this.computer.score <= this.WINNING_ROUNDS) {
      this.playGame();
      if (this.human.score === this.WINNING_ROUNDS || this.computer.score === this.WINNING_ROUNDS){
        if (this.playAgain()) {
          resetGame();
        }
      }

    }
    this.displayGoodbyeMessage();  
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    prompt(`You chose: ${humanMove}`);
    prompt(`The computer chose: ${computerMove}`);
    let result = this.compare(humanMove, computerMove);

    if (result === 'Player') {
        prompt('You win!');
        this.roundWinner = "player";
    } else if (result === 'Computer') {
        prompt('Computer wins!');
        this.roundWinner = "computer";
    } else {
        prompt("It's a tie");
        this.roundWinner = "tie";
    }
  },

  updatePlayerScore() {
    if (this.roundWinner === "player") {
      this.human.score += 1;
    } else if (this.roundWinner === "computer") {
      this.computer.score += 1;
    }
  },

  resetGame() {
    this.human.score = 0;
    this.computer.score = 0;
    this.computer.weight = [];
  },

  clearScreen() {
    console.clear();
  },

  displayScore() {
    prompt(`Player Score: ${this.human.score}`);
    prompt(`Computer Score: ${this.computer.score}`);
    console.log();
  },

  compare (humanMove, copmuterMove) {
    if (this.WINNING_COMBOS[humanMove].includes(copmuterMove)) {
      return "Player";
    }
    else if (this.WINNING_COMBOS[copmuterMove].includes(humanMove)) {
      return "Computer";
    }
    else return "Tie";
  },

  adjustComputerChoice() {
    this.computer.weight.push(this.human.move);
    console.log(this.computer.weight);
  },

  updateMoveHistory() {
    this.human.pastChoices.push(this.human.move);
    this.computer.pastChoices.push(this.computer.move);
  },

  displayMoveHistory() {
    if (this.human.pastChoices.length > 0) {
      prompt(`The player has used these moves -> ${this.human.pastChoices.join(' ')}`);
      prompt(`The computer has used these moves -> ${this.computer.pastChoices.join(' ')}`)
      console.log();
    }
  }
  
};
RPSGame.play();

