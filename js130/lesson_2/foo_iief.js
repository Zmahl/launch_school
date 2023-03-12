bar = (function(start) {
  let prod = start;
  return function (factor) {
    prod *= factor;
    return prod;
  };
})(2); //we can give the starting value here for for the instant invocation
//After invoking with (2), we now return a function with access to prod(2), and
//a function that takes a single argument for it's factor

let result = bar(3);
result += bar(4);
result += bar(5);
console.log(result);