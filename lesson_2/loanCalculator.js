const readline = require('readline-sync');

function prompt (message) {
  console.log(`==>  ${message}`);
}

function isInvalidNumber(number) {
  //Number.isNaN() needed for non numeric values
  return number.trim() === '' || Number(number) < 0 || Number.isNaN(Number(number));
}

prompt("Welcome to Mortgage Calculator!");

while (true) {

  prompt('----------------------------');

  prompt("What is the loan amount?");

  let loanAmount = readline.question();

  while (isInvalidNumber(loanAmount)) {
    prompt("Must enter a positive number");
    loanAmount = readline.question();
  }

  prompt("What is the interest rate?");
  prompt("(Example: 5 for 5% or 2.5 for 2.5%)");
  
  let interestRate = readline.question();

  while (isInvalidNumber(interestRate)) {
    prompt('Must enter a positive number');
    interestRate = readline.question();
  }

  prompt("What is the loan duration, in years?");

  let loanTime = readline.question();

  while (isInvalidNumber(loanTime)) {
    prompt('Must enter a positive number');
    loanTime = readline.question();
  }

  let annualInterestRate = Number(interestRate) / 100;

  let monthlyInterest = Number(annualInterestRate) / 12;

  let loanDuration = Number(loanTime) * 12;

  let monthlyPayment = Number(loanAmount) *
                  (monthlyInterest /
                  (1 - Math.pow((1 + monthlyInterest), (-Number(loanDuration)))));

  prompt(`Your monthly payment is :$${monthlyPayment.toFixed(2)}`);

  prompt("Another calculation?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please enter 'y' or 'n'.");
    answer = readline.question().toLowerCase();
  }

  if (answer[0] === 'n') break;
}