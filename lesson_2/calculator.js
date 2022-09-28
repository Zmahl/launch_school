//The require is is used as a library import, points to library in
//node_modules folder
const readline = require('readline-sync');
const calc_message = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt(calc_message.message.intro);

while (true) {


  prompt(calc_message.message.firstNum);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt("Hmm that doesn't look like a valid number.");
    number1 = readline.question();
  }

  prompt(calc_message.message.secondNum);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(calc_message.message.invalidNum);
    number2 = readline.question();
  }

  prompt(calc_message.message.operation);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(calc_message.message.invalidOp);
    operation = readline.question();
  }

  let output;

  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;

    case '2':
      output = Number(number1) - Number(number2);
      break;

    case '3':
      output = Number(number1) * Number(number2);
      break;

    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  console.log(`The result is ${output}`);

  prompt(calc_message.message.newOp);
  let answer = readline.question();

  if (answer[0].toLowerCase() !== 'y') break;
}