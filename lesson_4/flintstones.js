let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];
let flintstonesAsObject = {}


flintstones.forEach((person, index) => {
  flintstonesAsObject[person] = index;
})

flintstonesAsObject;