function makeCounterLogger(initial) {
  return (end) => {
    let first = initial;
    console.log(first);
    while (first !== end) {
      if (first < end) {
        first += 1;
        console.log(first);
      }
      else {
        first -= 1;
        console.log(first);
      }
    }
  }
}

let countLog = makeCounterLogger(5);

countLog(8);
console.log();
countLog(2);