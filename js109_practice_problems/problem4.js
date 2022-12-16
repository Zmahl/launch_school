// Write a function that takes an array of integers and
// returns the two numbers that are closest together in
// value.

function closestNumbers(arr) {
  let result;
  let min;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i === j) {
        continue;
      }
      let sum = Math.abs(arr[i] - arr[j]);

      if (min === undefined || sum < min) {
        result = [arr[i], arr[j]];
        min = sum;
      }
    }
  }
  return result;
}


// Examples:

console.log(closestNumbers([5, 25, 15, 11, 20]));     // [15, 11]
console.log(closestNumbers([19, 25, 32, 4, 27, 16])); // [25, 27]
console.log(closestNumbers([12, 7, 17]));             // [12, 7]