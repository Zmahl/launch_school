function factors(number) {
  let divisor = number;
  let factors = [];
  while (divisor < 0 || divisor > 0) {
    if (Math.abs(number) % divisor === 0) {
      factors.push(Math.abs(number) / divisor);
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
