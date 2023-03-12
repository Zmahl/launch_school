(function recursiveCounter(number) {
  console.log(number);

  if (number !== 0) {
    recursiveCounter(number - 1);
  }
})(7);