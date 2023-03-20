function strings(first, second, third, fourth, fifth) {
  return {
    first,
    last: fifth,
    middle: [ second, third, fourth ].sort()
  }
};


let string = ['a', 'cat', 'is', 'here', 'now'];
let { first, last, middle } = strings(...string);
console.log(first);
console.log(last);
console.log(middle);