function createPet(animal, name) {
  return {
    animal,
    name,

    sleep() {
      console.log(`I am sleeping`);
    },

    wake() {
      console.log("I am awake");
    },
  }
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep();
pudding.wake();

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep();
neptune.wake();
