const readline = require("readline-sync");

const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const INITIAL_HAND_SIZE = 2;
const DEALER_LIMIT = 17;
const BUST_LIMIT = 21;
const FACE_VALUE = 10;
const ACE_VALUE = 11;
const CHANGE_ACE_VALUE = 10;
const WIN_MATCH = 3;

//Initialize deck and playerHand + dealerHand as globals
let deck;
let playerHand =  {};
let dealerHand = {};
let playerScore = 0;
let dealerScore = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function shuffle() {
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]];
  }
}

function initializeDeck() {
  //Will reset deck after each call game
  deck = [];
  CARDS.forEach(card => {
    SUITS.forEach(suit => {
      deck.push({suit: suit, number: card});
    });
  });
}

function calculateTotal(hand) {
  let total = 0;
  let cardValues = hand.cards.map((card) => card.number);

  cardValues.forEach((number) => {
    if (number === 'A') {
      total += ACE_VALUE;
    } else if (['J', 'Q', 'K'].includes(number)) {
      total += FACE_VALUE;
    } else {
      total += Number(number);
    }
  });

  cardValues
    .filter((number) => number === 'A')
    .forEach((_) => {
      if (total > BUST_LIMIT) total -= CHANGE_ACE_VALUE;
    });

  hand.total = total;
}

function bust(player) {
  return player.total > BUST_LIMIT;
}

function playerTurn() {

  while (!bust(playerHand)) {
    prompt(`Current Hand: ${displayHand(playerHand)}`);
    prompt("Would you like to hit or stay? (h/s)");
    let answer = readline.question().toLowerCase();
    if (answer[0] === 'h') drawAndCalculate(playerHand);

    if (answer[0] === 's') break;

    else {
      prompt("Please choose either 'h' to hit or 's' to stay");
    }

    if (playerHand.total === BUST_LIMIT) {
      prompt(`You have ${BUST_LIMIT}!`);
      break;
    }
  }
  prompt(`Final Hand: ${displayHand(playerHand)}`);
}

function drawAndCalculate(hand) {
  let newCard = drawCard();
  hand.cards.push(newCard);
  calculateTotal(hand);
}

function dealerTurn() {
  prompt(`Dealer Current Hand: ${displayHand(dealerHand)}`);
  while (dealerHand.total < DEALER_LIMIT) {
    let dealerHandLength = dealerHand.cards.length;
    drawAndCalculate(dealerHand);
    if (dealerHand.cards.length > dealerHandLength) {
      prompt("Dealer Hit!");
      prompt(`Dealer Current Hand: ${displayHand(dealerHand)}`);
      readline.keyIn('Press any button to continue...');
    }
  }
  prompt("Dealer stays!");
  prompt(`Dealer Final Hand: ${displayHand(dealerHand)}`);
  readline.keyIn();
}

function displayHand(hand) {
  return hand.cards.map(card => `${card.number} of ${card.suit}`).join(', ');
}

function prepareHands() {
  for (let index = 0; index < INITIAL_HAND_SIZE; index++) {
    playerHand.cards.push(drawCard());
    dealerHand.cards.push(drawCard());
  }

  calculateTotal(playerHand);
  calculateTotal(dealerHand);
}

function displayInitialHands() {
  let playerCards = displayHand(playerHand);
  let dealerCards = dealerHandInGame();
  prompt(`Initial Player Hand: ${playerCards}`);
  prompt(`Initial Dealer Hand: ${dealerCards}`);
}

function dealerHandInGame() {
  return 'facedown, ' + displayHand((dealerHand));
}

function drawCard() {
  return deck.pop();
}


function playAgain() {
  console.log('-----------');
  prompt('Do you want to play again? (y or n)');
  let answer = readline.question();
  return answer.toLowerCase()[0] === 'y';
}

function checkWinner() {
  if (bust(playerHand)) {
    displayWinner('Dealer');
    dealerScore += 1;
  } else if (bust(dealerHand)) {
    displayWinner('Player');
    playerScore += 1;
  } else if (dealerHand.total > playerHand.total) {
    displayWinner('Dealer');
    dealerScore += 1;
  } else if (playerHand.total > dealerHand.total) {
    displayWinner('Player');
    playerScore += 1;
  } else {
    prompt("It's a push! Dealer wins");
    dealerScore += 1;
  }
}

function displayGreeting() {
  prompt("Welcome to Twenty-One!");
  prompt("Both the player and the dealer will start with 2 cards. The objective is to have a total of 21 points!");
  prompt("When you are ready to play, press any key to continue...");
  readline.keyIn();
}

function displayWinner(winner) {
  prompt(`${winner} wins!`);
}

function resetHands() {
  playerHand.total = 0;
  dealerHand.total = 0;

  playerHand.cards = [];
  dealerHand.cards = [];
}

while (playerScore < WIN_MATCH || dealerScore < WIN_MATCH) {

while (true) {
  
  displayGreeting();
  resetHands();
  initializeDeck();
  shuffle();
  prepareHands();
  displayInitialHands();
  playerTurn();
  if (!bust(playerHand)) {
    dealerTurn();
  }

  // both player and dealer stays - compare cards!
  console.log();
  console.log(`Dealer has ${displayHand(dealerHand)}, for a total of: ${dealerHand.total}`);
  console.log();
  console.log(`Player has ${displayHand(playerHand)}, for a total of: ${playerHand.total}`);
  checkWinner();
  
  if(!playAgain()) break;

  }
}

console.clear();
console.log("Thanks for playing Twenty-One!");