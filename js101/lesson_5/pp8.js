let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

let allVowels = '';

Object.values(obj).forEach((arr) => {
  arr.forEach((string) => {
    string.split('').forEach((char) => {
      if ('aeiou'.includes(char)) {
        allVowels += char;
      }
    })
  })
});

console.log(allVowels);