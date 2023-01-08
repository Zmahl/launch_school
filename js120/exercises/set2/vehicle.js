class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {
    super(year);
    this.startEngine();
  }
  startEngine() {
    console.log('Ready to go!')
  }
}

class Car extends Vehicle {

}

let truck = new Truck(2003);
let car = new Car(2015);

console.log(truck.year);