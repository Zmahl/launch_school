const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function prompt(message) {
  console.log(`=> ${message}`);
}

prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
let choice = readline.question();

while (!VALID_CHOICES.includes(choice)) {
  prompt("That's not a valid choice");
  choice = readline.question();
}

let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
let computerChoice = VALID_CHOICES[randomIndex];

prompt(`You chose ${choice}, computer chose ${computerChoice}`);