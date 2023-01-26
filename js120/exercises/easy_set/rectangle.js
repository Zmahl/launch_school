class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getLength() {
    return this.length;
  }

  getWidth() {
    return this.width;
  }

  getArea() {
    return this.length * this.width;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth());
console.log(rect.getLength());
console.log(rect.getArea());
