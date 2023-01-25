const readline = require('readline-sync');

class Card {
  static SUITS = ["Hearts", "Diamonds", "Spades", "Clubs"];
  static CARD_TYPES = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
                      "Jack", "Queen", "King", "Ace"];

  constructor(suit, rank) {
    //STUB
    // What sort of state does a card need?
    // Rank? Suit? Points?
    this.suit = suit;
    this.rank = rank;
  }

  getSuit() {
    return this.suit;
  }

  getRank() {
    return this.rank;
  }
}

class Deck {
  constructor() {
    //STUB
    // What sort of state does a deck need?
    // 52 Cards?
    // obviously, we need some data structure to keep track of cards
    // array, object, something else?
    this.cards = [];
    Card.SUITS.forEach(suit => {
      Card.CARD_TYPES.forEach(rank => {
        this.cards.push(new Card(suit, rank));
      })
    })
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
    let index =  Math.floor(Math.random() * this.cards.length);
    //Splice will return item as an array, so [0] is needed to remove it
    let drawnCard = this.cards.splice(index, 1)[0];

    return drawnCard;
  }
}

class Participant {
  constructor() {
    //STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? all the redundant behaviors from Player and Dealer?
    this.reset();
  }

  reset() {
    this.cardTotal = 0;
    this.hand = [];
    this.bust = false;
  }

  hit(deck) {
    let drawnCard = deck.deal();
    this.hand.push(drawnCard);
  }

  stay() {
    console.log(`${typeof(this)} stays. The final hand is ${this.score}`);
  }

  isBusted(bustLimit) {
    //STUB
    if (this.getScore() > bustLimit) {
      this.bust = true;
    }
    return this.bust;
  }

  setScore(cardTotal) {
    this.cardTotal = cardTotal;
  }
  
  getScore() {
    return this.cardTotal;
  }
}

class Player extends Participant {
  constructor() {
    //STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
    super();
  }

  displayHand() {
    let str = "";
    for (let i = 0; i < this.hand.length; i++) {
      if (i === 0) str += `${this.hand[i].getRank()} of ${this.hand[i].getSuit()}`
      else str += `, ${this.hand[i].getRank()} of ${this.hand[i].getSuit()}`
    }
    return str;
  }

}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?
  static DEALER_LIMIT = 17;

  constructor() {
    super();
  }

  hide() {
    //STUB
    return "Facedown"
  }

  reveal() {
    //STUB
  }

  displayHand() {
    let str = this.hide();
    for (let i = 1; i < this.hand.length; i++) {
      str += `, ${this.hand[i].getRank()} of ${this.hand[i].getSuit()}`
    }
    return str;
  }

  displayFinalHand() {
    let str = "";
    for (let i = 0; i < this.hand.length; i++) {
      if (i === 0) str += `${this.hand[i].getRank()} of ${this.hand[i].getSuit()}`
      else str += `, ${this.hand[i].getRank()} of ${this.hand[i].getSuit()}`
    }
    return str;
  }

}

class TwentyOneGame {
  static BUST_LIMIT = 21;
  static STARTING_HAND_SIZE = 2;
  static ACE_VALUE = 11;
  static FACE_VALUE = 10;
  static CHANGE_ACE_VALUE = 10;

  constructor() {
    //STUB
    // What sort of state does the game need?
    // A deck? Two participants?
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();
    this.displayRules();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    if(!this.checkPlayerBust()) {
      this.dealerTurn();
    }
    this.displayFinalHands();
    this.displayResult();
    this.displayGoodbyeMessage();  
  }

  dealCards() {
    //STUB
    for (let i = 0; i < TwentyOneGame.STARTING_HAND_SIZE; i++) {
      this.player.hit(this.deck);
      this.dealer.hit(this.deck);
    }  
  }

  showCards() {
    //STUB
    console.log(`Player Starting Hand: ${this.player.displayHand()}`);
    console.log(`Dealer Starting Hand: ${this.dealer.displayHand()}`);
    console.log();
    readline.question("Press any key to continue...")
    console.clear();
  }

  playerTurn() {
    //STUB
    let answer;
    this.scoreCards(this.player);
    while (!this.player.isBusted(TwentyOneGame.BUST_LIMIT)) {
      console.log(`Current hand: ${this.player.displayHand()}`);
      console.log("Would you like to hit or stay?");
      answer = readline.question();
      if (this.isPlayerHit(answer)) {
        this.player.hit(this.deck);
        this.scoreCards(this.player);
      }

      else break;
    }
    this.displayEndOfTurn(this.player);
    readline.question("Press any key to continue...");
  }

  dealerTurn() {
    //STUB
    this.scoreCards(this.dealer);
    while (this.dealer.getScore() < Dealer.DEALER_LIMIT && !this.dealer.isBusted(TwentyOneGame.BUST_LIMIT)) {
      this.dealer.hit(this.deck);
      this.scoreCards(this.dealer);
    }
  }

  displayWelcomeMessage() {
    //STUB
    console.clear();
    console.log("Welcome to Twenty-One!");
  }

  displayRules() {
    console.log(`Draw cards to get as close as possible to ${TwentyOneGame.BUST_LIMIT}. But make sure not to go over!`);
    console.log("Use 'hit' to draw additional cards, and 'stay' when you are happy with your hand.");
    console.log();
    readline.question("Press any key to play...");
    console.clear();
  }

  displayGoodbyeMessage() {
    //STUB
    console.log("Thanks for playing Twenty-One!");
  }

  displayResult() {
    //STUB
    let winner = this.getWinner();
    console.log(`${winner} wins the hand!`);
  }

  getWinner() {
    console.log(this.dealer.isBusted(TwentyOneGame.BUST_LIMIT))
    if (this.player.isBusted(TwentyOneGame.BUST_LIMIT)) return "Dealer"
    if (this.dealer.isBusted(TwentyOneGame.BUST_LIMIT)) return "Player"
    if (this.player.getScore() > this.dealer.getScore()) return "Player";
    else return "Dealer";
  }

  scoreCards(participant) {
      let total = 0;
      let cardValues = participant.hand.map((card) => card.rank);
    
      cardValues.forEach((rank) => {
        if (rank === 'Ace') {
          total += TwentyOneGame.ACE_VALUE;
        } else if (['Jack', 'Queen', 'King'].includes(rank)) {
          total += TwentyOneGame.FACE_VALUE;
        } else {
          total += Number(rank);
        }
      });
    
      cardValues
        .filter((number) => number === 'A')
        .forEach((_) => {
          if (total > TwentyOneGame.BUST_LIMIT) total -= TwentyOneGame.CHANGE_ACE_VALUE;
        });
    
      participant.setScore(total);
  }

  isPlayerHit(answer) {
    //case for continuing players turn
    while (true) {
      if (answer.toLowerCase()[0] === 'h') return true
      else if (answer.toLowerCase()[0] === 's') return false;
      else {
        console.log("Not a valid response")
        answer = readline.question();
      }
    }
  }

  displayEndOfTurn(participant) {
    console.log(`Final Hand is ${participant.displayHand()} with a score of ${participant.getScore()}`);
    console.log();
  }

  checkPlayerBust() {
    if (this.player.isBusted()) return true;
    return false;
  }

  displayFinalHands() {
    console.log(`Player Final Hand: ${this.player.displayHand()}`);
    console.log(`Dealer Final Hand: ${this.dealer.displayFinalHand()}`);
  }
}

let game = new TwentyOneGame();
game.start();