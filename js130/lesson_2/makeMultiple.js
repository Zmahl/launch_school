function makeMultipleLister(number) {
  let max = 100;
  let multiple = number;
  return function() {
    while (number < max) {
      console.log(number);
      number += multiple;
    }
  }
}

let lister = makeMultipleLister(17);
lister();