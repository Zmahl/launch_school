let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

console.log(arr.map((subarr) => {
  //Needed to add return value, otherwise caused array of undefined values
  if (typeof(subarr[0]) === 'number') {
    return subarr.sort((a, b) => b - a);
  }
  else {
    return subarr.sort().reverse();
  }
  })
);
