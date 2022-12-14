// Write a function that takes one argument, an array of
// integers. The function should return minimum sum of 5
// consecutive numbers in the array. If the array contains
// less than 5 elements, the function should return null.

function minimumSum(arr) {
  if (arr.length < 5) {
    return null;
  }
  let min;
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = i; j < 5; j++) {
      if (i + j > arr.length) {
        break;
      }
      sum += arr[j];
      count += 1;
    }

    if ((min === undefined || sum < min) && count === 5) {
      min = sum;
    }
  }
  console.log(min);
  return min;
}

// Examples:

console.log(minimumSum([1, 2, 3, 4]) === null);
console.log(minimumSum([1, 2, 3, 4, 5, -5]) === 9);
console.log(minimumSum([1, 2, 3, 4, 5, 6]) === 15);
console.log(minimumSum([55, 2, 6, 5, 1, 2, 9, 3, 5, 100]) === 16);
console.log(minimumSum([-1, -5, -3, 0, -1, 2, -4]) === -10);

// The tests above should each log "true".