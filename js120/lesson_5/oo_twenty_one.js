class Card {
  static SUITS = ["Hearts", "Diamonds", "Spades", "Clubs"];
  static CARD_TYPES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                      "Jack", "Queen", "King", "Ace"];

  constructor(suit, rank) {
    //STUB
    // What sort of state does a card need?
    // Rank? Suit? Points?
    this.suit = suit;
    this.rank = rank;
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

  shuffleDeck() {
    
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class Participant {
  constructor() {
    //STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? all the redundant behaviors from Player and Dealer?
    this.cardTotal = 0;
    this.hand = {};
    this.bust = false;
  }

  hit(player) {
    Deck.addCard(player.hand);
  }

  stay(player) {
    console.log(`${typeof(player)} stays. The final hand is ${player.score}`);
  }

  isBusted() {
    //STUB
    if (this.cardTotal > 21) {
      this.bust = true;
    }

    return this.bust;
  }

  score() {
    //STUB
  }
}

class Player extends Participant {
  constructor() {
    //STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
    super();
  }



}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
    super();
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    //STUB
    // What sort of state does the game need?
    // A deck? Two participants?
  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    //STUB
    
  }

  showCards() {
    //STUB
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    //STUB
  }

  displayGoodbyeMessage() {
    //STUB
  }

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();