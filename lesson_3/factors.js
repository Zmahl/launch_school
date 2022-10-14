function factors(number) {
  let divisor = number;
  let factors = [];
  while (divisor < 0 || divisor > 0) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    if (divisor > 0) {
      divisor -= 1;
    }
    else {
      divisor += 1;
    }
  }
  return factors;
}

let num = 40;

console.log(factors(num));