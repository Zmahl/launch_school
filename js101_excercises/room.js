const readline = require('readline-sync');

const SQUARE_FEET = 10.739;

console.log('Enter the length of the room');
let length = readline.question();

console.log('Enter the width of the room in meters');
let width = readline.question();

let area = length * width;

console.log(`The area of the room is ${area} (${area * SQUARE_FEET} square feet)`);

