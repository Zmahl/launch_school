let ages = {
  'Herman': 32,
  'Lily': 30,
  'Grandpa': 5843,
  'Eddie': 10,
  'Marilyn': 22,
  'Spot': 237
};

let minAge = null;

Object.values(ages).forEach((age) => {
  if (minAge === null) {
    minAge = age;
  }
  else if (minAge > age) {
   minAge = age;
  }
});

console.log(minAge);
