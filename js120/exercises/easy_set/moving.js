class Mammal {
  walk() {
    return `${this.name} ${this.gait()} forward`
  }
}

class Person extends Mammal {
  constructor(name) {
    super();
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}

class Cat extends Mammal {
  constructor(name) {
    super();
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}

class Cheetah extends Mammal {
  constructor(name) {
    super()
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"