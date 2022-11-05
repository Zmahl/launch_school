const readline = require('readline-sync');

const SUIT = ["H", "C", "S", "D"];
const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const STARTING_HAND_SIZE = 2;
const DEALER_LIMIT = 17;

let deck = [];
let playerHand = {
  "cards": [],
  "hasAce": false,
  "has21": false,
  "over21": false
};
let computerHand = {
  "cards": [],
  "hasAce": false,
  "has21": false,
  "over21": false
};

function prompt(message) {
  console.log(`==> ${message}`)
}

function calculateTotal(somePlayer) {
  let total = 0;

  for (c in somePlayer.cards) {
    total += c.weight;
  }

  return total;

}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
}

function initializeDeck() {
  for (let i = 0; i < CARDS.length; i++) {
    for (let j = 0; j < SUIT.length; j++) {
      let card = {
        "value": CARDS[i],
        "suit": SUIT[j],
        "weight": parseInt(CARDS[i])
      }
      if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
        card.weight = 10;
      }

      else if (card.value === "A") {
        card.weight = 11;
      }

      deck.push(card);

    }
  }

  return deck;
}

function drawCard(somePlayer) {
  randomCardIndex = Math.floor(Math.random() * deck.length);
  randomCard = deck.splice(randomCardIndex, 1);
  return randomCard.pop();
}

function dealCards() {
  for (let i = 0; i < STARTING_HAND_SIZE; i++) {
    playerHand.cards.push(drawCard());
    computerHand.cards.push(drawCard());
  }
}

function greetPlayer() {
  prompt("Welcome to 21! The objective of the game is to get as close to 21 as possible.");
  prompt("Are you ready to play?");
  readline.keyIn("Press any key to begin...\n")
}

function dealerDraw() {

  let total = calculateTotal

  if (total < DEALER_LIMIT) {
    drawCard(computerHand);
  }
}

function isBust(somePlayer) {

  let total = calculateTotal(somePlayer);

  return total > 21;
}

function playerTurn() {
  
}

function computerTurn() {
  
}


while (true) {

  let winner = null;
  greetPlayer();
  initializeDeck();

  while (true) {

  
    dealCards();

    playerTurn();

    if (isBust(playerHand)) {
      winner = 'Computer';
    }

    computerTurn();

    if (isBust(computerHand)) {
      winner = 'Player';
    }

    if (!winner) {
      winner = findWinner();
    }

    prompt(`${winner} won the round!`);
    
    break;
    
  }
  
  prompt("Would you like to play again? (y/n)");

    let answer = readline.question().toLowerCase();

    while (answer !== 'y' && answer !== 'n') {
      prompt("Invalid response. Please choose 'y' to continue or 'n' to quit.");
      answer = readline.question().toLowerCase();
    }

    if (answer !== 'y') {
      break;
    }
}


prompt("Thank you for playing 21!");