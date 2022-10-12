readline = require('readline-sync');

let num1 = readline.question("Enter a number greater than 0: ");

while (num1 < 0) {
  console.log("Number must be greater than 0");
  num1 = readline.question();
}

let operation = readline.question("Enter 's' to compute the sum, or 'p' to compute the product. ");

if (operation === 's') {
  let sum = 0;
  for (let i = 1; i <= num1; i++) {
    sum += i;
  }
  console.log(sum);
}

if (operation === 'p') {
  let product = 1;
  for (let i = 1; i <= num1; i++) {
    product *= i;
  }

  console.log(product);
}


  
