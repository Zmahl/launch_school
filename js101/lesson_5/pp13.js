let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort((a, b) => {
  aSum = 0;
  bSum = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] % 2 === 1) {
      aSum += a[i];
    }
    if (b[i] % 2 === 1) {
      bSum += b[i];
    }
  }

  return aSum - bSum;
})

console.log(arr);