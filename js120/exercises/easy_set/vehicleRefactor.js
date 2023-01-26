class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  info() {
    return `${this.make} ${this.model}` 
  }

  getWheels() {
    return this.wheels;
  }

}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
    this.make = make;
    this.model = model;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
    this.make = make;
    this.model = model;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model,6);
    this.make = make;
    this.model = model;
    this.payload = payload;
  }
}

let car = new Car("Toyota", "Corolla");
let truck = new Truck("Dodge", "Charger");
let motorcycle = new Motorcycle ("Moto", "Wheelie");