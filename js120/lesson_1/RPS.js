const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createHuman() {

  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      while (true) {
        console.log('Please choose rock, paper, or scissors');
        choice = readline.question();
        // 3 options given to the player
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
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
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  };

  return Object.assign(playerObject, computerObject);
}

function createMove() {
  return {
    // possible state: type of move (paper, rock scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state
  };
}

//not sure where to put compare, so we define as ordinary function

let compare = function(move1, move2) {
  // not yet implemented
};

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  roundWinner: null,

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  playGame() {
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    this.updatePlayerScore();
  },

  play() {
    const WINNING_ROUNDS = 5;
    this.displayWelcomeMessage();
    while (this.human.score <= WINNING_ROUNDS || this.computer.score <= WINNING_ROUNDS) {
      this.playGame();
      if (this.human.score === WINNING_ROUNDS || this.computer.score === WINNING_ROUNDS){
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

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper;' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'rock')) {
        console.log('You win!');
        this.roundWinner = "player";
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
             (humanMove === 'paper' && computerMove === 'scissors') ||
             (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
      this.roundWinner = "computer";
    } else {
      console.log("It's a tie");
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
  }
};
debugger;
RPSGame.play();

