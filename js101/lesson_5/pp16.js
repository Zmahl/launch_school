let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

let obj = {};
arr.forEach(subarray => {
  let key = subarray[0];
  let value = subarray[1];

  obj[key] = value;
});

console.log(obj);