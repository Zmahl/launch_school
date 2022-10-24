let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let capitalize = word => word[0].toUpperCase() + word.slice(1);

console.log(Object.values(obj).map((fruit) => {
  if (fruit['type'] === 'fruit') {
    return fruit['colors'].map(char => capitalize(char));
  }
  else {
    return fruit['size'].toUpperCase();
  }
  
}));