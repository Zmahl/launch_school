const readline = require('readline-sync');

process.stdout.write('What is the bill? ');
let bill = Number(readline.question());

process.stdout.write('What is the tip percentage? ');

let tipPercent = Number(readline.question()) / 100;

let tip = Math.round(bill * tipPercent);

console.log(`The tip is ${tip}`);

console.log(`The total is ${tip + bill}`);