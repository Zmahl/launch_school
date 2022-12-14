// Given an array of numbers, for each number, find out how
// many numbers in the array are smaller than it. When
// counting numbers, only count unique values. That is, if a
// given number occurs multiple times in the array, it
// should only be counted once.

function smallerNumbersThanCurrent(arr) {
  let returnedArr = [];
  for (let i = 0; i < arr.length; i++) {
    let smallerNumArr = [];
    for (let j = 0; j < arr.length; j++) {
      if (j === i || smallerNumArr.includes(arr[j])) {
        continue;
      }
      if (arr[i] > arr[j]) {
        smallerNumArr.push(arr[j]);
      }

    }
    returnedArr.push(smallerNumArr.length);
  }
  return returnedArr;
}


// Examples:

console.log(smallerNumbersThanCurrent([8, 1, 2, 2, 3])); // [3, 0, 1, 1, 2]
console.log(smallerNumbersThanCurrent(
  [1, 4, 6, 8, 13, 2, 4, 5, 4])); // [0, 2, 4, 5, 6, 1, 2, 3, 2]
console.log(smallerNumbersThanCurrent([7, 7, 7, 7])); // [0,0,0,0]
console.log(smallerNumbersThanCurrent([6, 5, 4, 8])); // [2, 1, 0, 3]
console.log(smallerNumbersThanCurrent([1])); // [0]