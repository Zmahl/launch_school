const readline = require('readline-sync');

function createPlayer(playerType) {
  return {
    playerType: playerType,
    move: null,

    choose() {
      // If player, allow choice of 3
      if (this.isHuman()) {
        let choice;
        
        while (true) {
          console.log('Please choose rock, paper, or scissors');
          choice = readline.question();
          // 3 options given to the player
          if (['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid choice.');
        }

        this.move = choice;
      } 
      // If computer make random choice
      else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },

    isHuman() {
      return this.playerType === 'human';
    }
  };
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
  human: createPlayer('human'),
  computer: createPlayer('computer'),

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

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
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
    }
    else if ((humanMove === 'rock' && computerMove === 'paper') ||
             (humanMove === 'paper' && computerMove === 'scissors') ||
             (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  }
};

RPSGame.play();

