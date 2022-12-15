// Write a function named toWeirdCase that accepts a string,
// and returns the same sequence of characters with every
// 4th character in every second word converted to
// uppercase. Other characters should remain the same.

function toWeirdCase(str) {
  let flag = false;
  return str.split(' ').map((element, index) => {
    if (element.length < 4) {
      return element;
    }

    else {
      if (index % 2 === 1 ) {
        let newElement = "";
        for (let i = 0; i < element.length; i++) {
          if (i > 0 && (i + 1) % 4 === 0) {
            newElement += element[i].toUpperCase();
          }
          else {
            newElement += element[i];
          }
        }
        return newElement;
      }
      return element;
    }
  }).join(' ');
}

// Examples:
console.log(
  toWeirdCase('Lorem Ipsum is simply dummy text of the printing world') ===
              'Lorem IpsUm is simPly dummy texT of the printing worLd');
console.log(
  toWeirdCase('It is a long established fact that a reader will be distracted') ===
              'It is a lonG established facT that a reader wilL be disTracTed');
console.log(toWeirdCase('aaA bB c') === 'aaA bB c');
console.log(
  toWeirdCase('Miss Mary Poppins word is supercalifragilisticexpialidocious') ===
              'Miss MarY Poppins worD is supErcaLifrAgilIstiCexpIaliDociOus');

// The tests above should print "true".