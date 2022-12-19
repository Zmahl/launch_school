let statement = 'The Flintstones Rock';

let letterFreq = {};

statement.split('').filter(char => char !== ' ').forEach((letter) => {
  if (letterFreq.hasOwnProperty(letter)) {
    letterFreq[letter] += 1;
  }
  else {
    letterFreq[letter] = 1;
  }
});

console.log(letterFreq);
