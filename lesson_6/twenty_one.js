const readline = require("readline-sync");

const CARDS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['H', 'S', 'D', 'C'];
const INITIAL_HAND_SIZE = 2;
const DEALER_LIMIT = 17;
const BUST_LIMIT = 21;
const FACE_VALUE = 10;
const ACE_VALUE = 11;
const CHANGE_ACE_VALUE = 10;

let deck = [];
let playerHand =  {
  'cards': [],
  'total': 0
};

let dealerHand = {
  'cards': [],
  'total': 0
};

function initializeDeck() {
  CARDS.forEach(c => {
    SUITS.forEach(s => {
      deck.push({'suit': s, 'number': c});
    })
  })
}

function calculateTotal(hand){
  let total = 0;
  let cardValues = hand.cards.map((card) => card.number);

  cardValues.forEach((number) => {
    if (number === 'A') {
      total += ACE_VALUE;
    }
    else if (['J', 'Q', 'K'].includes(number)) {
      total += FACE_VALUE;
    }
    else {
      total += Number(number);
    }
  })

  // Check for bust limit aces
  cardValues
  .filter((number) => number === 'A')
  .forEach((_) => {
    if (total > BUST_LIMIT) {
      total -= CHANGE_ACE_VALUE;
    }
  });

  return hand.total = total;
}

function playerTurn() {

  while (playerHand.total < BUST_LIMIT) {
    prompt("Current Hand: ")
    displayHand(playerHand);
    prompt("Would you like to hit or stay? (h/s)");
    let answer = readline.question().toLowerCase();
    if (answer === 'h') {
      //Draw a card
      let newCard = drawCard(playerHand);
      playerHand.cards.push(newCard);
      calculateTotal(playerHand);
    }

    if (answer.toLowerCase() === 's') {
      break;
    }

    else {
      prompt("Please choose either 'h' to hit or 's' to stay");
    }
  }

  if (playerHand.total === BUST_LIMIT) {
    prompt(`You have ${BUST_LIMIT}!`)
  }

  prompt("Final Hand: ")
  displayHand(playerHand);
  
}

function dealerTurn() {
  prompt("Dealer Current Hand: ");
  displayHand(dealerHand);
  while(dealerHand.total < DEALER_LIMIT) {
    let newCard = drawCard();
    dealerHand.cards.push(newCard);
    calculateTotal(dealerHand);
  }
  prompt("Dealer Final Hand: ")
  displayHand(dealerHand);
}

function displayHand(hand) {
  if (hand === playerHand) {
    console.log(playerHand.cards);
  }
  else {
    console.log(['facedown'].concat(dealerHand.cards.slice(1)));
  }
}

function prompt(message) {
  console.log(`==> ${message}`);
}

function shuffle() {
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]];
  }
}

function prepareHands() {
  for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
    playerHand.cards.push(drawCard());
    dealerHand.cards.push(drawCard());
  }

  calculateTotal(playerHand);
  calculateTotal(dealerHand);
}

function drawCard() {
  return deck.pop();
}

function bust(player) {
  return player.total > BUST_LIMIT;
}

function checkWinner() {
  if (bust(playerHand)) {
    displayWinner('Dealer');
  }

  else if (bust(dealerHand)) {
    displayWinner('Player');
  }

  else {
    if (dealerHand.total > playerHand.total) {
      displayWinner('Dealer');
    }
    else if (playerHand.total > dealerHand.total) {
      displayWinner('Player');
    }

    else {
      prompt("It's a tie!");
    }
  }
  return;

}

function displayWinner(winner) {
  prompt(`${winner} wins!`);
}

while (true) {
  initializeDeck();
  shuffle();
  prepareHands();
  playerTurn();
  dealerTurn();
  checkWinner();
  break;

}

console.log("Thanks for playing 21!");

