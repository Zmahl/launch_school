function createProduct(id, name, stock, price) {
  return {
    id: id,
    name: name, 
    stock: stock,
    price: price,

    setPrice(newPrice) {
      if (isNaN(newPrice || newPrice <= 0)) {
        console.log("That is an invalid price")
      }
      else {
        this.price = newPrice;
      }
    },

    describe() {
      let self = this;
      //Will display all new values that are not functions within the item
      Object.keys(self).forEach((prop) => {
        if (typeof(self[prop]) !== 'function') {
          console.log(`=> ${prop}: ${self[prop]}`);
        }
      });
    }
  }
}

let scissors = createProduct(0, 'Scissors', 10, 8);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let saw = createProduct(2, 'Circular Saw', 12, 95);
let hammer = createProduct(3, 'Sledge Hammer', 78, 45);
let boxCutter = createProduct(4, 'Box Cutter', 41, 15);
