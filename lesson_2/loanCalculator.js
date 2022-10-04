const readline = require('readline-sync');

let prompt = (message) => {
  console.log(`==>  ${message}`);
}

prompt("What is the loan amount?");

let loanAmount = readline.question();

while (typeof(loanAmount) !== Number) {
  prompt("That is not a valid amount.");
  loanAmount = readline.question();
}

prompt("What is the APR?");

//Explicitly typecast this as a float
let APR = parseFloat(readline.question() / 100);

prompt("What is the loan duration, in years?");

let loanTime = readline.question();

let monthlyInterest = APR / 12;

let loanDuration = loanTime * 12;

let monthlyPayment = loanAmount * (monthlyInterest / 
  (1 - Math.pow((1 + monthlyInterest), (-loanDuration))));

console.log(monthlyPayment);