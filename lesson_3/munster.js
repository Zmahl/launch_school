let munstersDescription = "The Munsters are creepy and spooky.";
let str = '';
for (let i = 0; i < munstersDescription.length; i++) {
  if (munstersDescription[i] === munstersDescription[i].toUpperCase()) {
    str += munstersDescription[i].toLowerCase();
  }
  else {
    str += munstersDescription[i].toUpperCase();
  }

}

console.log(str);