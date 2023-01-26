class Truck {}

class Car {}

let towMixIn = {
  tow() {
    return "I can tow a trailer!";
  }
}

Object.assign(Truck.prototype, towMixIn);

let truck = new Truck();
console.log(truck.tow());