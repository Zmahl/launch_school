class Shelter {
  constructor() {
    this.owners = {};

  }

  adopt(owner, pet) {
    if (this.owners.hasOwnProperty(owner.getName())) {
      this.owners[owner.getName()].push(pet);
    }
    else {
      this.owners[owner.getName()] = [pet];
    }

    owner.adoptPet();
  }

  printAdoptions() {
    for (const o in this.owners) {
      console.log(`${o} has adopted the following pets:`)
      let pets = this.owners[o];
      pets.map(p => console.log(`a ${p.getSpecies()} named ${p.getName()}`));
      console.log();
    }
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.petNum = 0;
  }

  getName() {
    return this.name;
  }

  adoptPet() {
    this.petNum += 1;
  }

  numberOfPets() {
    return this.petNum;
  }
}

class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
    }

  getName() {
    return this.name;
  }

  getSpecies() {
    return this.species;
  }
}


let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);