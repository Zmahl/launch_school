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
}

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
  .filter((number) => value === 'A')
  .forEach((_) => {
    if (total > BUST_LIMIT) {
      sum -= CHANGE_ACE_VALUE;
    }
  });

  return total;
}

function playerTurn() {
  let answer;
  while (true) {
    answer = readline.question();
    prompt("Would you like to hit or stay? (h/s)");
    while (answer.toLowerCase() !== 'h' || answer.toLowerCase() !== 's') {
      prompt("You need to choose either 'h' to hit, or 's' to stay")
      answer = readline.question();
    }

    if (answer.toLowerCase() === 's') {
      break;
    }

    //Draw a card
    let newCard = drawCard(playerHand);
    playerHand.card.push(newCard);
    calculateTotal(playerHand)
    if (bust(playerHand)) {
      break;
    }
  }
  
}

function computerTurn() {
  calculateTotal(computerHand);
  while(computerHand.total < BUST_LIMIT) {
    
  }
}

function prompt(message) {
  console.log(`==>${message}`);
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

while (true) {
  initializeDeck();
  console.log(deck);
  shuffle();
  console.log(deck);
  prepareHands();
  console.log(playerHand);
  console.log(dealerHand);
  playerTurn();
  computerTurn();
  break;
  //TODO Player turn: hit or stay(if player bust, dealer wins)
  //TODO Dealer turn: hit or stay(repeat until total >= 17)
  //If dealer busts, player wins
  //Compare cards and declare winner(compare total)

}

console.log('bye bye');

