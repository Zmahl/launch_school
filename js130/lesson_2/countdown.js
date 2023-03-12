let countdown = (function() {
  return function(num) {
    while (num >= 0) {
      console.log(num);
      num -= 1;
    }
  }
})();

countdown(7);