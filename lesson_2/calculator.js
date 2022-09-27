//The require is is used as a library import, points to library in
//node_modules folder
const readline = require('readline-sync');

console.log('Welcome to Calculator!');

console.log("What's the first number?"); 
let number1 = readline.question();

console.log("What's the second number?");
let number2 = readline.question();

console.log("What operation would you like to perform?");
let operation = readline.question();


let output;

if (operation === '1') {
  output = Number(number1) + Number(number2);
}
else if (operation === '2') {
  output = Number(number1) - Number(number2);
}
else if (operation === '3') {
  output = Number(number1) * Number(number2);
}
else if (operation === '4') {
  output = Number(number1) / Number(number2);
}



console.log(`The result is ${output}`);




