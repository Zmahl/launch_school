const readline = require('readline-sync');

const SUIT = ["H", "C", "S", "D"];
const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const ACE_VALUES = [1, 11];
const STARTING_HAND_SIZE = 2;

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
        card.weight = ACE_VALUES;
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
initializeDeck();
dealCards();
console.log(deck);
console.log(playerHand.cards, computerHand.cards);

function greetPlayer() {
  prompt("Welcome to 21! The objective of the game is to get as close to 21 as possible.");
  prompt("Are you ready to play?");
  readline.keyIn("Press any key to begin...\n")
}

function dealerDraw() {
  let total = 0;
  for (c in computerHand) {
    total += c.weight;
  }

  if (total < 17) {
    drawCard(computerHand);
  }
}


while (true) {
  greetPlayer();
  initializeDeck();
  dealCards();

  break;



}