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

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose(validChoices) {
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

function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    //how computer will skew it's index to beat what the player is picking
    weights: {},
    STARTING_WEIGHT: 10,
    ADJUST_WEIGHT_AMOUNT: 1,

    resetWeights(humanChoices) {
      const choices = Object.values(humanChoices);

      choices.forEach(choice => {
        this.weights[choice] = this.STARTING_WEIGHT;
      });
    },

    adjustWeights(winner) {
      if (winner === 'human') {
        this.weights[this.move] -= this.ADJUST_WEIGHT_AMOUNT;
      }
    },

    choose() {
      const totalWeight = Object.values(this.weights)
        .reduce((acc, sum) => acc + sum, 0);

      let weightThreshold = Math.floor(Math.random() * totalWeight);

      let total = 0;
      const entries = Object.entries(this.weights);

      for (let i = 0; i < entries.length; i++) {
        const [ choice, weight ] = entries[i];
        total += weight;

        if (weightThreshold <= total) {
          this.move = choice;
          return;
        }
      }
    },
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
  CHOICES: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
  WINNING_ROUNDS: 5,
  human: createHuman(),
  computer: createComputer(),
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
    //For some reason this syntax will pass the right values to the choose function
    this.human.choose(this.CHOICES);
    this.computer.choose();
    this.displayWinner();
    this.updatePlayerScore();
    this.displayScore();
    this.updateMoveHistory();
    this.computer.adjustWeights(this.roundWinner);
    readline.question("Press any button to go to continue...");
    this.clearScreen();
  },

  play() {
    this.displayWelcomeMessage();
    while (this.human.score <= this.WINNING_ROUNDS || this.computer.score <= this.WINNING_ROUNDS) {
      this.computer.resetWeights(this.CHOICES);
      this.playGame();
      if (this.human.score === this.WINNING_ROUNDS || this.computer.score === this.WINNING_ROUNDS){
        if (this.playAgain()) {
          resetGame();
        }
        else break;
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
    this.computer.weights = [];
  },

  clearScreen() {
    console.clear();
  },

  displayScore() {
    prompt(`Player Score: ${this.human.score}`);
    prompt(`Computer Score: ${this.computer.score}`);
    console.log();
  },

  compare (humanMove, computerMove) {
    if (this.WINNING_COMBOS[humanMove].includes(computerMove)) {
      return "Player";
    }
    else if (this.WINNING_COMBOS[computerMove].includes(humanMove)) {
      return "Computer";
    }
    else return "Tie";
  },

  adjustComputerChoice() {
    this.computer.weights.push(this.human.move);
    console.log(this.computer.weights);
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

