let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

console.log(arr.map((item) => {
  return item.filter(element => element % 3 === 0);
}));
