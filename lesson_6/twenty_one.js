const readline = require("readline-sync");

const CARDS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['H', 'S', 'D', 'C'];
const INITIAL_HAND_SIZE = 2;
const DEALER_LIMIT = 17;
const BUST_LIMIT = 21;
const FACE_VALUE = 10;
const ACE_VALUE = 11;

let deck = [];
let playerHand =  {
  'cards': [],
  'total': 0,
  'hasAce': false
};
let dealerHand = {
  'cards': [],
  'total': 0,
  'hasAce': false
}

function initializeDeck() {
  CARDS.forEach(c => {
    SUITS.forEach(s => {
      deck.push({'suit': s, 'number': c});
    })
  })
}

function checkAce(hand, cardValue) {
  if (cardValue === 11) {
    hand.hasAce = true;
  }
}

function calculateTotal(hand){
  let total = 0;
  hand.cards.forEach(c => {
    cardValue = calculateCardValue();
    checkAce(hand, cardValue);
    total += cardValue;
  })

  if (total > BUST_LIMIT && hand.hasAce === true) {
    
  }

  hand.total = total;

}

function adjustAce(hand) {
  
}

function calculateCardValue(card) {
  if (isNan(Number(card))) {
    if (card.includes('K', 'Q', 'J')) {
      return FACE_VALUE;
    }

    else {
      return ACE_VALUE;
    }
  }

  return Number(card);
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
  break;
  //TODO Player turn: hit or stay(if player bust, dealer wins)
  //TODO Dealer turn: hit or stay(repeat until total >= 17)
  //If dealer busts, player wins
  //Compare cards and declare winner(compare total)

}

console.log('bye bye');

